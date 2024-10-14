<?php

namespace App\Http\Controllers;

use App\Models\AcademicPeriodEvaluation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AcademicPeriodEvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Obtener las evaluaciones del periodo académico actual del usuario autenticado
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
        // Validar los datos del request
        $validatedData = $request->validate([
            'evaluation_id' => 'required|exists:evaluations,id',
            'academic_period_id' => 'required|exists:academic_periods,id',
            'evaluation_type' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        // Crear una nueva evaluación de periodo académico
        $academicPeriodEvaluation = AcademicPeriodEvaluation::create($validatedData);

        return response()->json([
            'message' => 'Evaluación del periodo académico creada exitosamente.',
            'academicPeriodEvaluation' => $academicPeriodEvaluation
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\AcademicPeriodEvaluation  $academicPeriodEvaluation
     * @return \Illuminate\Http\Response
     */
    public function show(AcademicPeriodEvaluation $academicPeriodEvaluation)
    {
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
        // Validar los datos del request
        $validatedData = $request->validate([
            'evaluation_id' => 'sometimes|exists:evaluations,id',
            'academic_period_id' => 'sometimes|exists:academic_periods,id',
            'evaluation_type' => 'sometimes|string',
            'start_date' => 'sometimes|date',
            'end_date' => 'sometimes|date|after_or_equal:start_date',
        ]);

        // Actualizar la evaluación del periodo académico con los datos validados
        $academicPeriodEvaluation->update($validatedData);

        return response()->json([
            'message' => 'Evaluación del periodo académico actualizada exitosamente.',
            'academicPeriodEvaluation' => $academicPeriodEvaluation
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\AcademicPeriodEvaluation  $academicPeriodEvaluation
     * @return \Illuminate\Http\Response
     */
    public function destroy(AcademicPeriodEvaluation $academicPeriodEvaluation)
    {
        // Eliminar la evaluación del periodo académico
        $academicPeriodEvaluation->delete();

        return response()->json([
            'message' => 'Evaluación del periodo académico eliminada exitosamente.'
        ]);
    }
}
