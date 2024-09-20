<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\AcademicPeriod;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validar la solicitud
            $request->validate([
                'long_name' => 'required|string|max:255',
                'short_name' => 'required|string|max:100',
                'email' => 'required|email|unique:companies,email',
                'address' => 'required|string|max:255',
                'phone' => 'required|string|max:20',
            ]);

            // Obtener el usuario autenticado
            $user = Auth::user();

            // Obtener el periodo académico del usuario autenticado
            $academicPeriodId = $user->academic_period_id;

            // Validar que el periodo académico existe
            if (!$academicPeriodId || !AcademicPeriod::find($academicPeriodId)) {
                return response()->json([
                    'message' => 'El periodo académico asociado no existe.'
                ], 404); // 404 Not Found
            }

            // Crear la compañía
            $company = Company::create(array_merge($request->all(), ['academic_period_id' => $academicPeriodId]));

            // Devolver una respuesta JSON
            return response()->json([
                'message' => 'Grupo empresa registrado correctamente.',
                'company' => $company
            ], 201); // 201 Created

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

    public function getCompaniesByAcademicPeriod()
    {
        try {
            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar si el usuario tiene un periodo académico asociado
            if (!$user->academic_period_id) {
                return response()->json([
                    'message' => 'No esta inscrito en un periodo academico'
                ], 400); // 400 Bad Request
            }

            // Obtener las compañías asociadas al periodo académico del usuario
            $companies = Company::where('academic_period_id', $user->academic_period_id)->get();

            // Verificar si existen compañías para ese periodo
            if ($companies->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron compañías para el periodo académico especificado.'
                ], 404); // 404 Not Found
            }

            // Devolver la lista de compañías
            return response()->json([
                'message' => 'Compañías obtenidas correctamente.',
                'companies' => $companies
            ], 200); // 200 OK
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    public function getCompanyById($id)
    {
        try {
            // Buscar la compañía por su ID
            $company = Company::find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json([
                    'message' => 'No se encontró la compañía especificada.'
                ], 404); // 404 Not Found
            }

            // Obtener el periodo académico asociado
            $academicPeriod = $company->academicPeriod;

            // Verificar si el periodo académico existe y obtener el creador
            if ($academicPeriod) {
                $creator = $academicPeriod->creator;
                $creatorName = $creator ? "{$creator->first_name} {$creator->last_name}" : 'Creador no disponible';
            } else {
                $creatorName = 'Periodo académico no disponible';
            }

            // Devolver la información de la compañía junto con el creador y el periodo académico
            return response()->json([
                'message' => 'Compañía obtenida correctamente.',
                'company' => $company,
                'academic_period' => [
                    'name' => $academicPeriod ? $academicPeriod->name : null,
                    'creator_name' => $creatorName,
                ],
            ], 200); // 200 OK

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }
}
