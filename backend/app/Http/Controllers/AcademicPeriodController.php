<?php

namespace App\Http\Controllers;

use App\Models\AcademicPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Exception;
use Illuminate\Validation\ValidationException;

class AcademicPeriodController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        $user = Auth::user();

        if ($user->user_type !== 'D') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $academicPeriods = AcademicPeriod::where('user_id', $user->id)->get();
        return response()->json($academicPeriods);
    }

    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            // Verificar el tipo de usuario
            if ($user->user_type !== 'D') {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            // Validar la solicitud
            $request->validate([
                'name' => 'required|string|max:255|unique:academic_periods',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
                'description' => 'nullable|string',
            ]);

            // Crear el periodo académico
            $academicPeriod = AcademicPeriod::create([
                'name' => $request->name,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'description' => $request->description,
                'user_id' => $user->id,
            ]);

            // Devolver respuesta de éxito
            return response()->json($academicPeriod, 201);
        } catch (ValidationException $e) {
            // Manejar errores de validación
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->validator->errors()
            ], 422); // 422 Unprocessable Entity

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'An error occurred',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    public function getAllGroupedByTeacher()
    {
        $academicPeriods = AcademicPeriod::with('creator')->get();

        // Agrupar los periodos por docente (user_id)
        $groupedByTeacher = $academicPeriods->groupBy('user_id')->map(function ($periods, $userId) {
            // Obtener información del docente
            $teacher = User::find($userId);

            return [
                'teacher_name' => $teacher->getFullNameAttribute(),
                'teacher_email' => $teacher->getAttribute('email'),
                'academic_periods' => $periods->toArray()
            ];
        })->values(); // Convertir el resultado en una lista

        return response()->json($groupedByTeacher);
    }
    public function enroll(Request $request)
    {
        /** @var \App\Models\User $user **/
        $user = Auth::user();

        if ($user->user_type !== 'E') {
            return response()->json(['message' => 'Solo estudiantes pueden inscribirse.'], 403);
        }

        // Verifica que el estudiante no esté ya inscrito en un periodo académico
        if ($user->academic_period_id) {
            return response()->json(['message' => 'Ya está inscrito en un periodo académico'], 400);
        }

        $academicPeriodId = $request->input('academic_period_id'); // Obtén el ID desde el cuerpo de la solicitud

        $academicPeriod = AcademicPeriod::findOrFail($academicPeriodId);

        // Inscribe al estudiante en el periodo académico
        $user->academic_period_id = $academicPeriod->id;
        $user->save();

        return response()->json(['message' => 'Se inscribió correctamente en el periodo académico']);
    }
}
