<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanyUser;
use App\Models\UserEvaluation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use App\Models\AcademicPeriod;
use Exception;

class UserEvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Validar la entrada de datos
            $validatedData = $request->validate([
                'evaluatee_company_user_id' => 'required|exists:company_user,id',
                'score' => 'required|integer|min:0|max:100',
            ]);

            // Obtener el CompanyUser del evaluador (autenticado)
            $evaluatorCompanyUser = CompanyUser::where('user_id', $user->id)->first();
            $evaluateeCompanyUser = CompanyUser::find($validatedData['evaluatee_company_user_id']);

            // Verificar que ambos usuarios pertenecen a la misma empresa
            if (!$evaluatorCompanyUser || !$evaluateeCompanyUser || $evaluatorCompanyUser->company_id !== $evaluateeCompanyUser->company_id) {
                return response()->json([
                    'message' => 'Ambos usuarios deben pertenecer a la misma empresa para realizar la evaluación.'
                ], 403);
            }

            // Verificar que no se haya evaluado previamente al mismo integrante
            $existingEvaluation = UserEvaluation::where('evaluator_company_user_id', $evaluatorCompanyUser->id)
                ->where('evaluatee_company_user_id', $evaluateeCompanyUser->id)
                ->first();

            if ($existingEvaluation) {
                return response()->json([
                    'message' => 'Ya has evaluado a este integrante previamente.'
                ], 403);
            }

            // Obtener el periodo académico activo para la empresa
            $academicPeriod = AcademicPeriod::where('id', $evaluatorCompanyUser->company->academic_period_id)->first();
            $currentDate = now();

            // Verificar si la fecha actual está dentro del periodo de evaluaciones
            if ($currentDate->lt($academicPeriod->start_date) || $currentDate->gt($academicPeriod->end_date)) {
                return response()->json([
                    'message' => 'No se puede realizar la evaluación fuera del periodo de evaluaciones.'
                ], 403);
            }

            // Crear la evaluación
            $evaluation = UserEvaluation::create([
                'evaluator_company_user_id' => $evaluatorCompanyUser->id,
                'evaluatee_company_user_id' => $evaluateeCompanyUser->id,
                'score' => $validatedData['score'],
            ]);

            return response()->json([
                'message' => 'Evaluación registrada correctamente.',
                'evaluation' => $evaluation
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }



    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
