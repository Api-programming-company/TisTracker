<?php

namespace App\Http\Controllers;


use App\Models\AcademicPeriod;
use App\Models\Milestone;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\AcademicPeriod\IndexRequest;
use App\Http\Requests\AcademicPeriod\StoreRequest;
use App\Http\Requests\AcademicPeriod\UpdateRequest;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class AcademicPeriodController extends Controller
{
    public function index(IndexRequest $request)
    {
        $user = Auth::user();
        $academicPeriods = AcademicPeriod::where('user_id', $user->id)->get();
        return response()->json($academicPeriods, Response::HTTP_OK);
    }

    public function store(StoreRequest $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'company_creation_start_date' => 'required|date|after_or_equal:start_date|before:company_creation_end_date',
            'company_creation_end_date' => 'required|date|after:company_creation_start_date|before_or_equal:end_date',
            'planning_start_date' => 'required|date|after_or_equal:company_creation_end_date|before:planning_end_date',
            'planning_end_date' => 'required|date|after:planning_start_date|before_or_equal:end_date',
            'description' => 'nullable|string',
        ]);

        // Convierte las fechas de entrada a UTC
        $startDateUtc = Carbon::parse($request->start_date)->timezone('UTC');
        $endDateUtc = Carbon::parse($request->end_date)->timezone('UTC');

        // Crear el periodo académico
        $academicPeriod = AcademicPeriod::create([
            'name' => $request->name,
            'start_date' => $startDateUtc,
            'end_date' => $endDateUtc,
            'company_creation_start_date' => Carbon::parse($validated['company_creation_start_date'])->timezone('UTC'),
            'company_creation_end_date' => Carbon::parse($validated['company_creation_end_date'])->timezone('UTC'),
            'planning_start_date' => Carbon::parse($request->planning_start_date)->timezone('UTC'),
            'planning_end_date' => Carbon::parse($request->planning_end_date)->timezone('UTC'),
            'description' => $request->description,
            'user_id' => $user->id,
        ]);

        // Devolver respuesta de éxito
        return response()->json($academicPeriod, Response::HTTP_CREATED);
    }

    public function getAllGroupedByTeacher()
    {
        $currentDate = now();
        $academicPeriods = AcademicPeriod::with('creator')
            ->where('start_date', '<=', $currentDate)
            ->where('end_date', '>=', $currentDate)
            ->get();

        // Agrupar los periodos por docente (user_id)
        $groupedByTeacher = $academicPeriods->groupBy('user_id')->map(function ($periods, $userId) {
            // Obtener información del docente
            $teacher = User::find($userId);

            return [
                'teacher_name' => $teacher->getFullNameAttribute(),
                'teacher_email' => $teacher->getAttribute('email'),
                'academic_periods' => $periods->toArray()
            ];
        })->values();

        return response()->json($groupedByTeacher);
    }

    public function enroll(Request $request)
    {
        $user = Auth::user();

        // Solo los estudiantes pueden inscribirse
        if ($user->user_type !== 'E') {
            return response()->json(['message' => 'Solo estudiantes pueden inscribirse.'], Response::HTTP_FORBIDDEN);
        }

        // Verifica que el estudiante no esté ya inscrito en un periodo académico
        if ($user->academic_period_id) {
            return response()->json(['message' => 'Ya está inscrito en un periodo académico'], Response::HTTP_BAD_REQUEST);
        }

        $academicPeriodId = $request->input('academic_period_id');
        $academicPeriod = AcademicPeriod::findOrFail($academicPeriodId);
        $currentDate = now();

        // Verificar si la fecha actual está entre start_date y end_date del periodo académico
        if ($currentDate->lt($academicPeriod->start_date) || $currentDate->gt($academicPeriod->end_date)) {
            return response()->json(['message' => 'No se puede inscribir, el periodo académico no está en curso.'], Response::HTTP_FORBIDDEN);
        }

        // Inscribe al estudiante en el periodo académico
        $user->academic_period_id = $academicPeriod->id;
        $user->save();

        return response()->json([
            'message' => 'Se inscribió correctamente en el periodo académico',
            'user' => $user
        ]);
    }

    public function update(UpdateRequest $request, $id)
    {
        $user = Auth::user();

        // Buscar el periodo académico
        $academicPeriod = AcademicPeriod::findOrFail($id);

        // Verificar si el usuario es el creador del periodo académico
        if ($academicPeriod->user_id !== $user->id) {
            return response()->json(['message' => 'No tienes permiso para actualizar este periodo académico'], Response::HTTP_FORBIDDEN);
        }

        $validated = $request->validate([
            'start_date' => 'sometimes|date|before:end_date',
            'end_date' => 'sometimes|date|after:start_date',
            'company_creation_start_date' => 'sometimes|date|after_or_equal:start_date|before:company_creation_end_date',
            'company_creation_end_date' => 'sometimes|date|after:company_creation_start_date|before:planning_start_date',
            'planning_start_date' => 'sometimes|date|after_or_equal:company_creation_end_date|before:planning_end_date',
            'planning_end_date' => 'sometimes|date|after:planning_start_date|before_or_equal:end_date',
        ]);

        $companies = $academicPeriod->companies()->pluck('id');

        $activeMilestones = Milestone::whereHas('planning', function ($query) use ($companies) {
            $query->whereIn('company_id', $companies);
        })
            ->whereDate('start_date', '<=', now())
            ->whereDate('end_date', '>=', now())
            ->exists();

        if ($activeMilestones) {
            return response()->json(['message' => 'No puedes actualizar las fechas porque ya existen hitos activos.'], Response::HTTP_BAD_REQUEST);
        }

        $academicPeriod->update([
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'company_creation_start_date' => $request->company_creation_start_date,
            'company_creation_end_date' => $request->company_creation_end_date,
            'planning_start_date' => $request->planning_start_date,
            'planning_end_date' => $request->planning_end_date,
        ]);

        return response()->json([
            'message' => 'Periodo académico actualizado con éxito',
            'academic_period' => $academicPeriod
        ], Response::HTTP_OK);
    }


    public function show($id)
    {
        $academicPeriod = AcademicPeriod::with('creator')->findOrFail($id);

        return response()->json([
            'message' => 'Periodo académico obtenido con éxito',
            'academic_period' => $academicPeriod
        ], Response::HTTP_OK);
    }
}
