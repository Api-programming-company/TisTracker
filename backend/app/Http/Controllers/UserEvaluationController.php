<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanyUser;
use App\Models\UserEvaluation;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
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
                'evaluatee_company_user_id' => 'required|exists:company_user,user_id',
                'score' => 'required|integer|min:1|max:5',
            ]);

            // Verificar que el evaluador y el evaluado pertenecen a la misma empresa
            $evaluatorCompanyUser = CompanyUser::where('user_id', $user->id)->first();
            $evaluateeCompanyUser = CompanyUser::where('user_id', $validatedData['evaluatee_company_user_id'])->first();

            if (!$evaluatorCompanyUser || !$evaluateeCompanyUser || $evaluatorCompanyUser->company_id !== $evaluateeCompanyUser->company_id) {
                return response()->json([
                    'message' => 'Ambos usuarios deben pertenecer a la misma empresa para realizar la evaluación.'
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
