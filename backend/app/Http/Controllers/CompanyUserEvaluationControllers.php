<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanyUserEvaluation;
use App\Models\Company;
use App\Models\CompanyUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
class CompanyUserEvaluationControllers extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = Auth::user();
            $evaluations = CompanyUserEvaluation::whereHas('companyUser', function ($query) use ($user) {
                $query->where('user_id', $user->id);
            })->get();

            return response()->json([
                'message' => 'Evaluaciones obtenidas correctamente.',
                'data' => $evaluations
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener las evaluaciones.',
                'error' => $e->getMessage(),
            ], 500);
        }
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
            // Validar la solicitud
            $request->validate([
                'company_id' => 'required|exists:companies,id',
                'score' => 'required|integer|min:1|max:100',
            ]);

            $user = Auth::user();

            // Obtener el registro del usuario en la compañía con estado 'A'
            $companyUser = CompanyUser::where('user_id', $user->id)
                ->where('status', 'A')
                ->first();

            // Verificar si el usuario pertenece a la compañía
            if (!$companyUser) {
                return response()->json(['message' => 'No perteneces a ninguna compañía o tu estado no es activo.'], 403);
            }

            // Si la evaluación es a la propia compañía (autoevaluación)
            if ($request->company_id == $companyUser->company_id) {
                // Verificar si el usuario ya realizó la autoevaluación
                $existingEvaluation = CompanyUserEvaluation::where('company_user_id', $companyUser->id)
                    ->where('company_id', $companyUser->company_id)
                    ->first();

                if ($existingEvaluation) {
                    return response()->json(['message' => 'Ya realizaste la autoevaluación.'], 403);
                }

                // Guardar la autoevaluación
                CompanyUserEvaluation::create([
                    'company_user_id' => $companyUser->id,
                    'company_id' => $companyUser->company_id,
                    'score' => $request->score,
                ]);

                return response()->json(['message' => 'Autoevaluación registrada correctamente.'], 201);
            }

            // Si es una evaluación a otra empresa, solo el líder puede hacerlo
            if ($companyUser->permission !== 'W') {
                return response()->json(['message' => 'Solo el representante puede evaluar a otras empresas.'], 403);
            }

            // Verificar si ya realizó la evaluación a la otra empresa
            $existingEvaluation = CompanyUserEvaluation::where('company_user_id', $companyUser->id)
                ->where('company_id', $request->company_id)
                ->first();

            if ($existingEvaluation) {
                return response()->json(['message' => 'Ya realizaste la evaluación para esta grupo empresa.'], 403);
            }

            // Guardar la evaluación a la otra empresa
            CompanyUserEvaluation::create([
                'company_user_id' => $companyUser->id,
                'company_id' => $request->company_id,
                'score' => $request->score,
            ]);

            return response()->json(['message' => 'Evaluación registrada correctamente.'], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al registrar la evaluación.',
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
        try {
            $evaluation = CompanyUserEvaluation::findOrFail($id);
            return response()->json([
                'message' => 'Evaluación obtenida correctamente.',
                'data' => $evaluation,
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener la evaluación.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $evaluation = CompanyUserEvaluation::findOrFail($id);
            $evaluation->delete();

            return response()->json([
                'message' => 'Evaluación eliminada correctamente.',
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar la evaluación.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
