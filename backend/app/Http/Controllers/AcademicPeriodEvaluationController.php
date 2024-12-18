<?php

namespace App\Http\Controllers;

use App\Models\AcademicPeriod;
use App\Models\AcademicPeriodEvaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Validation\ValidationException;
use Carbon\Carbon;
use App\Notifications\EvaluationAssigned;
use Illuminate\Support\Facades\Notification;
use App\Jobs\SendEvaluationNotification;

class AcademicPeriodEvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        // Verificar si el usuario tiene asignado un periodo académico
        if (!$user->academic_period_id) {
            return response()->json(['message' => 'No está inscrito en ningún periodo académico.'], 403);
        }

        $evaluations = AcademicPeriodEvaluation::where('academic_period_id', $user->academic_period_id)->get();

        return response()->json($evaluations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            // Validar los datos del request
            $validatedData = $request->validate([
                'evaluation_id' => 'required|exists:evaluations,id',
                'academic_period_id' => 'required|exists:academic_periods,id',
                'evaluation_type' => 'required|string|in:A,C,U',
                'start_date' => 'required|date_format:Y-m-d\TH:i:sP',
                'end_date' => 'required|date_format:Y-m-d\TH:i:sP|after:start_date',
            ]);

            // Obtener el periodo académico
            $academicPeriod = AcademicPeriod::findOrFail($validatedData['academic_period_id']);

            // Convertir las fechas a Date
            $startDate = Carbon::parse($validatedData['start_date']);
            $endDate = Carbon::parse($validatedData['end_date']);

            // Obtener la zona horaria del cliente
            $clientTimeZone = $startDate->getTimezone();

            // Convertir las fechas a la zona horaria del cliente
            $academicPeriodStartDate = Carbon::parse($academicPeriod->start_date)->setTimezone($clientTimeZone)->startOfDay();
            $academicPeriodEndDate = Carbon::parse($academicPeriod->end_date)->setTimezone($clientTimeZone)->endOfDay();

            // Validar que las fechas estén dentro del periodo académico
            if ($startDate < $academicPeriodStartDate || $endDate > $academicPeriodEndDate) {
                return response()->json([
                    'message' => 'Las fechas de la evaluación deben estar dentro del rango del periodo académico.'
                ], 422);
            }

            // Validar que las fechas estén dentro del periodo de evaluación
            $evaluationStart = Carbon::parse($academicPeriod->evaluation_start_date, $clientTimeZone);
            $evaluationEnd = Carbon::parse($academicPeriod->evaluation_end_date)->endOfDay()->setTimezone($clientTimeZone)->endOfDay();

            if ($startDate < $evaluationStart || $endDate > $evaluationEnd) {
                return response()->json(['message' => 'Las fechas de la evaluación deben estar dentro del rango del periodo de evaluación.'], 422);
            }

            // Verificar si ya existe una evaluación del mismo tipo en el mismo periodo académico
            $existingEvaluation = AcademicPeriodEvaluation::where('academic_period_id', $validatedData['academic_period_id'])
                ->where('evaluation_type', $validatedData['evaluation_type'])
                ->first();

            if ($existingEvaluation) {
                return response()->json(['message' => 'El periodo académico ya tiene una evaluación de este tipo.'], 422);
            }

            // Crear una nueva evaluación de periodo académico
            $academicPeriodEvaluation = AcademicPeriodEvaluation::create(array_merge($validatedData, [
                'start_date' => $startDate,
                'end_date' => $endDate
            ]));

            // Mapear el tipo de evaluación a un nombre legible
            $evaluationTypes = [
                'A' => 'Autoevaluación',
                'C' => 'Evaluación Cruzada',
                'U' => 'Evaluación de Pares',
            ];
            $evaluationTypeReadable = $evaluationTypes[$validatedData['evaluation_type']];

            // Obtener los estudiantes asociados al periodo académico y con compañía en estado "A"
            $students = $academicPeriod->users()
                ->where('user_type', 'E')
                ->whereHas('companies', function ($query) {
                    $query->where('companies.status', 'A');
                })
                ->orderBy('id', 'desc')
                ->get();

            // Obtener el nombre del docente
            $teacherName = $academicPeriod->creator ? $academicPeriod->creator->full_name : 'Docente';

            // Despachar el trabajo en la cola con el tipo de evaluación legible
            SendEvaluationNotification::dispatchNow(
                $students,
                $academicPeriodEvaluation->evaluation->name,
                $evaluationTypeReadable,
                $startDate,
                $endDate,
                $teacherName
            );

            return response()->json([
                'message' => 'Evaluación del periodo académico creada exitosamente.',
                'academicPeriodEvaluation' => $academicPeriodEvaluation
            ], 201);

        } catch (ValidationException $e) {
            return response()->json(['message' => 'Error de validación.', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al crear la evaluación del periodo académico.', 'error' => $e->getMessage()], 500);
        }
    }




    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AcademicPeriodEvaluation  $academicPeriodEvaluation
     * @return \Illuminate\Http\Response
     */
    public function show(AcademicPeriodEvaluation $academicPeriodEvaluation)
    {
        $user = Auth::user();

        // Mostrar los detalles de una evaluación específica del periodo académico
        return response()->json($academicPeriodEvaluation);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\AcademicPeriodEvaluation  $academicPeriodEvaluation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AcademicPeriodEvaluation $academicPeriodEvaluation)
    {
        try {
            $user = Auth::user();

            // Validar los datos del request
            $validatedData = $request->validate([
                'evaluation_id' => 'sometimes|exists:evaluations,id',
                'academic_period_id' => 'sometimes|exists:academic_periods,id',
                'evaluation_type' => 'sometimes|string|in:A,C,U',
                'start_date' => 'sometimes|date',
                'end_date' => 'sometimes|date|after_or_equal:start_date',
            ]);

            // Verificar si se está actualizando el tipo de evaluación o las fechas
            if (isset($validatedData['academic_period_id'])) {
                $academicPeriod = AcademicPeriod::findOrFail($validatedData['academic_period_id']);
            } else {
                $academicPeriod = $academicPeriodEvaluation->academicPeriod;
            }

            // Validar que las fechas estén dentro del periodo académico
            if (isset($validatedData['start_date']) && ($validatedData['start_date'] < $academicPeriod->start_date || $validatedData['end_date'] > $academicPeriod->end_date)) {
                return response()->json(['message' => 'Las fechas de la evaluación deben estar dentro del periodo académico.'], 422);
            }

            // Verificar si ya existe una evaluación del mismo tipo en el mismo periodo académico (solo si se actualiza el tipo)
            if (isset($validatedData['evaluation_type']) && $validatedData['evaluation_type'] !== $academicPeriodEvaluation->evaluation_type) {
                $existingEvaluation = AcademicPeriodEvaluation::where('academic_period_id', $academicPeriod->id)
                    ->where('evaluation_type', $validatedData['evaluation_type'])
                    ->first();

                if ($existingEvaluation) {
                    return response()->json(['message' => 'El periodo académico ya tiene una evaluación de este tipo.'], 422);
                }
            }

            // Actualizar la evaluación del periodo académico con los datos validados
            $academicPeriodEvaluation->update($validatedData);

            return response()->json([
                'message' => 'Evaluación del periodo académico actualizada exitosamente.',
                'academicPeriodEvaluation' => $academicPeriodEvaluation
            ]);

        } catch (Exception $e) {
            return response()->json(['message' => 'Error al actualizar la evaluación del periodo académico.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AcademicPeriodEvaluation  $academicPeriodEvaluation
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademicPeriodEvaluation $academicPeriodEvaluation)
    {
        try {
            $user = Auth::user();

            // Eliminar la evaluación del periodo académico
            $academicPeriodEvaluation->delete();

            return response()->json([
                'message' => 'Evaluación del periodo académico eliminada exitosamente.'
            ]);

        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la evaluación del periodo académico.', 'error' => $e->getMessage()], 500);
        }
    }
}
