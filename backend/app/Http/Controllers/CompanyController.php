<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Validation\ValidationException;
use Exception;

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
                'academic_period_id' => 'required|exists:academic_periods,id',
            ]);

            // Crear la compañía
            $company = Company::create($request->all());

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
}
