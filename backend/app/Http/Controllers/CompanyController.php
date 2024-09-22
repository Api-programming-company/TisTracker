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
                'long_name' => 'required|string|max:32|unique:companies,long_name',
                'short_name' => 'required|string|max:8',
                'email' => 'required|email|unique:companies,email',
                'address' => 'required|string|max:255',
                'phone' => 'required|string|regex:/^\d{1,8}$/',
                'members' => 'required|array', // Validar que se envíe un array de members
                'members.*' => 'exists:users,id' // Cada ID debe existir en la tabla users
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

            // Asociar los miembros a la compañía
            foreach ($request->members as $memberId) {
                $company->members()->attach($memberId, ['status' => 'P', 'permission' => 'R']);
            }

            // Devolver una respuesta JSON
            return response()->json([
                'message' => 'Empresa registrado correctamente.',
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

    public function getCompaniesByAcademicPeriod($id)
    {
        try {
            // Obtener el usuario autenticado
            $user = auth()->user();

            // Obtener las compañías asociadas al periodo académico del usuario
            $companies = Company::where('academic_period_id', $id)
                ->where('status', 'A')
                ->withCount('members')
                ->get();

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

    public function show($id)
    {
        try {
            // Buscar la compañía por su ID
            $company = Company::with('members')->find($id);

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

            // Preparar la información de los miembros
            $members = $company->members->map(function ($member) {
                return [
                    'id' => $member->id,
                    'email' => $member->email,
                    'full_name' => $member->getFullNameAttribute(),
                    'permission' => $member->pivot->permission,
                ];
            });

            // Devolver la información de la compañía junto con el creador, el periodo académico y los miembros
            return response()->json([
                'message' => 'Compañía obtenida correctamente.',
                'company' => $company,
                'academic_period' => [
                    'name' => $academicPeriod ? $academicPeriod->name : null,
                    'creator_name' => $creatorName,
                ],
                'members' => $members, // Incluir los miembros
            ], 200); // 200 OK

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    public function getPendingCompanies(Request $request)
    {
        try {

            // Validar la solicitud
            $request->validate([
                'academic_period_id' => 'required|exists:academic_periods,id',
            ]);

            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar si el usuario es el creador del periodo académico
            $academicPeriod = AcademicPeriod::find($request->academic_period_id);
            if ($academicPeriod->creator->id !== $user->id) {
                return response()->json([
                    'message' => 'No tienes permiso para acceder a estas compañías.'
                ], 403); // 403 Forbidden
            }

            // Obtener las compañías pendientes para el periodo académico especificado
            $companies = Company::where('academic_period_id', $request->academic_period_id)
                ->where('status', 'P') // Pending
                ->withCount('members')
                ->get();

            // Verificar si existen compañías pendientes
            if ($companies->isEmpty()) {
                return response()->json([
                    'message' => 'No se encontraron compañías pendientes para el periodo académico especificado.'
                ], 404); // 404 Not Found
            }

            // Devolver la lista de compañías pendientes
            return response()->json([
                'message' => 'Compañías pendientes obtenidas correctamente.',
                'companies' => $companies
            ], 200); // 200 OK
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías pendientes.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    public function acceptCompanyById($id)
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

            // Verificar si el periodo académico existe
            if (!$academicPeriod) {
                return response()->json([
                    'message' => 'No se encontró el periodo académico asociado.'
                ], 404); // 404 Not Found
            }

            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar si el usuario es el creador del periodo académico
            if ($academicPeriod->creator->id !== $user->id) {
                return response()->json([
                    'message' => 'No tienes permiso para aceptar esta compañía.'
                ], 403); // 403 Forbidden
            }

            // Actualizar el estado de la compañía a 'Aceptada' (o el estado que corresponda)
            $company->status = 'A'; // Asumiendo que 'A' es el código para aceptada
            $company->save();

            // Devolver una respuesta de éxito
            return response()->json([
                'message' => 'Compañía aceptada correctamente.',
                'company' => $company
            ], 200); // 200 OK

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al aceptar la compañía.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    public function index()
    {
        try {
            // Obtener todas las compañías
            $companies = Company::all();

            // Devolver una respuesta con la lista de compañías
            return response()->json([
                'message' => 'Lista de compañías obtenida correctamente.',
                'companies' => $companies
            ], 200); // 200 OK
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener la lista de compañías.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }
    public function update(Request $request, $id)
    {
        try {
            // Validar la solicitud
            $request->validate([
                'long_name' => 'sometimes|required|string|max:255',
                'short_name' => 'sometimes|required|string|max:100',
                'email' => "sometimes|required|email|unique:companies,email,{$id}",
                'address' => 'sometimes|required|string|max:255',
                'phone' => 'sometimes|required|string|max:20',
            ]);

            // Buscar la compañía por su ID
            $company = Company::find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json([
                    'message' => 'No se encontró la compañía especificada.'
                ], 404); // 404 Not Found
            }

            // Actualizar la compañía
            $company->update($request->all());

            // Devolver una respuesta de éxito
            return response()->json([
                'message' => 'Compañía actualizada correctamente.',
                'company' => $company
            ], 200); // 200 OK

        } catch (ValidationException $e) {
            // Manejar errores de validación
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->validator->errors()
            ], 422); // 422 Unprocessable Entity

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al actualizar la compañía.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    public function destroy($id)
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

            // Eliminar la compañía
            $company->delete();

            // Devolver una respuesta de éxito
            return response()->json([
                'message' => 'Compañía eliminada correctamente.'
            ], 200); // 200 OK

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al eliminar la compañía.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }
}
