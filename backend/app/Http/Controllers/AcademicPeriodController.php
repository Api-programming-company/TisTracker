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

        // Obtener los datos validados desde el FormRequest
        $validated = $request->validated();

        // Convertir las fechas a UTC
        $startDateUtc = Carbon::parse($validated['start_date'])->timezone('UTC');
        $endDateUtc = Carbon::parse($validated['end_date'])->timezone('UTC');
        $companyCreationStartUtc = Carbon::parse($validated['company_creation_start_date'])->timezone('UTC');
        $companyCreationEndUtc = Carbon::parse($validated['company_creation_end_date'])->timezone('UTC');
        $planningStartUtc = Carbon::parse($validated['planning_start_date'])->timezone('UTC');
        $planningEndUtc = Carbon::parse($validated['planning_end_date'])->timezone('UTC');
        $evaluationStartUtc = Carbon::parse($validated['evaluation_start_date'])->timezone('UTC');
        $evaluationEndUtc = Carbon::parse($validated['evaluation_end_date'])->timezone('UTC');

        // Crear el periodo académico
        $academicPeriod = AcademicPeriod::create([
            'name' => $validated['name'],
            'start_date' => $startDateUtc,
            'end_date' => $endDateUtc,
            'company_creation_start_date' => $companyCreationStartUtc,
            'company_creation_end_date' => $companyCreationEndUtc,
            'planning_start_date' => $planningStartUtc,
            'planning_end_date' => $planningEndUtc,
            'evaluation_start_date' => $evaluationStartUtc,
            'evaluation_end_date' => $evaluationEndUtc,
            'description' => $validated['description'],
            'user_id' => $user->id,
        ]);

        return response()->json([
            'message' => 'Periodo académico creado con éxito.',
            'academic_period' => $academicPeriod,
        ], Response::HTTP_CREATED);
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

        // Verificar si hay hitos activos asociados al periodo académico
        $activeMilestones = Milestone::whereHas('planning', function ($query) use ($academicPeriod) {
            $query->whereIn('company_id', $academicPeriod->companies()->pluck('id'));
        })
        ->whereDate('start_date', '<=', now())
        ->whereDate('end_date', '>=', now())
        ->exists();

        if ($activeMilestones) {
            return response()->json(['message' => 'No puedes actualizar las fechas porque ya existen hitos activos.'], Response::HTTP_BAD_REQUEST);
        }

        // Obtener los datos validados desde el FormRequest
        $validated = $request->validated();

        // Actualizar los campos dinámicamente usando la función `only` para evitar código repetitivo
        $academicPeriod->update(array_filter([
            'start_date' => isset($validated['start_date']) ? Carbon::parse($validated['start_date'])->timezone('UTC') : null,
            'end_date' => isset($validated['end_date']) ? Carbon::parse($validated['end_date'])->timezone('UTC') : null,
            'company_creation_start_date' => isset($validated['company_creation_start_date']) ? Carbon::parse($validated['company_creation_start_date'])->timezone('UTC') : null,
            'company_creation_end_date' => isset($validated['company_creation_end_date']) ? Carbon::parse($validated['company_creation_end_date'])->timezone('UTC') : null,
            'planning_start_date' => isset($validated['planning_start_date']) ? Carbon::parse($validated['planning_start_date'])->timezone('UTC') : null,
            'planning_end_date' => isset($validated['planning_end_date']) ? Carbon::parse($validated['planning_end_date'])->timezone('UTC') : null,
            'description' => $validated['description'] ?? null,
        ]));

        return response()->json([
            'message' => 'Periodo académico actualizado con éxito.',
            'academic_period' => $academicPeriod->refresh(),
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
