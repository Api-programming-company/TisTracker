<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\AcademicPeriod;
use App\Models\Planning;

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Validar la solicitud
            $request->validate([
                'long_name' => 'required|string|max:32|unique:companies,long_name',
                'short_name' => 'required|string|max:8|unique:companies,short_name',
                'email' => 'required|email|regex:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/|unique:companies,email',
                'address' => 'required|string|max:255',
                'phone' => 'required|string|regex:/^\d{1,8}$/|unique:companies,phone',
                'members' => 'required|array', // Validar que se envíe un array de members
                'members.*.id' => 'required|exists:users,id', // Cada ID debe existir en la tabla users
                'members.*.permission' => 'required|in:R,W', // Validar que permission sea "R" o "W"
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
            foreach ($request->members as $member) {
                $company->members()->attach($member['id'], ['status' => 'P', 'permission' => $member['permission']]);
            }

            // Crear un planning vacío con el long_name de la compañía
            Planning::create([
                'name' => $request->long_name,
                'company_id' => $company->id,
            ]);

            $company = $company->load('members', 'plannings');

            // Devolver una respuesta JSON
            return response()->json([
                'message' => 'Empresa registrada correctamente.',
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


    public function getCompaniesByAcademicPeriod(Request $request)
    {
        try {
            $request->validate([
                'id' => 'required|integer|exists:academic_periods,id',
            ]);
            $user = auth()->user();
            $academicPeriod = AcademicPeriod::find($request->id);

            // Verificar si el usuario es el creador del periodo académico
            if ($academicPeriod->creator->id !== $user->id && $user->academic_period_id !== $academicPeriod->id) {
                return response()->json(['message' => 'No tienes permiso para ver las compañías de este periodo académico.'], 403);
            }

            // Obtener las compañías asociadas al periodo académico 
            $companies = Company::withCount('members')
                ->where('academic_period_id', $request->id)
                ->where('status', 'A')
                ->get();

            // Devolver la lista de compañías
            return response()->json([
                'message' => 'Compañías obtenidas correctamente.',
                'companies' => $companies
            ], 200); // 200 OK
        } catch (ValidationException $e) {
            // Manejar errores de validación
            return response()->json([
                'message' => 'Validation Error.',
                'errors' => $e->validator->errors()
            ], 422); // 422 Unprocessable Entity

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
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Buscar la compañía por su ID, incluyendo miembros, planificaciones, hitos y entregables, y periodo académico
            $company = Company::with([
                'members' => function($query) use ($user) {
                    // Incluir el permiso del usuario autenticado
                    $query->where('user_id', $user->id);
                },
                'plannings.milestones.deliverables',
                'academicPeriod.creator'
            ])->find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json([
                    'message' => 'No se encontró la compañía especificada.'
                ], 404); 
            }

            // Obtener el primer planning y sus hitos
            $planning = $company->plannings->first();
            $milestones = $planning ? $planning->milestones : [];

            // Obtener el permiso del usuario autenticado (si es miembro)
            $member = $company->members->first();
            $userPermission = $member ? $member->pivot->permission : null;

            // Preparar la información de la compañía, miembros, planificaciones y permisos
            return response()->json([
                'message' => 'Compañía obtenida correctamente.',
                'company' => $company,
                'planning_id' => $planning ? $planning->id : null,
                'milestones' => $milestones,
                'user_permission' => $userPermission, // Devolver el permiso del usuario autenticado
            ], 200); 

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía.',
                'error' => $e->getMessage()
            ], 500); 
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
                'status' => 'sometimes|required|in:A,R,P', // Aceptado, Rechazado, Pendiente
            ]);

            // Buscar la compañía por su ID
            $company = Company::find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json([
                    'message' => 'No se encontró la compañía especificada.'
                ], 404); // 404 Not Found
            }

            // Verificar si el estado actual de la compañía es "P"
            if ($company->status !== 'P') {
                return response()->json([
                    'message' => 'Solo se puede actualizar el estado de una compañía pendiente.'
                ], 403); // 403 Forbidden
            }

            // Verificar si el usuario pertenece a otra compañía aceptada
            $user = auth()->user();
            $existingCompany = Company::whereHas('members', function ($query) use ($user) {
                $query->where('user_id', $user->id)->where('status', 'A');
            })->first();

            if ($existingCompany) {
                return response()->json([
                    'message' => 'Ya perteneces a otra compañía aceptada.'
                ], 403); // 403 Forbidden
            }

            // Actualizar la compañía
            $company->update($request->all());

            return response()->json([
                'message' => 'Compañía actualizada correctamente.',
                'company' => $company
            ], 200); // 200 OK

        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error.',
                'errors' => $e->validator->errors()
            ], 422); // 422 Unprocessable Entity

        } catch (Exception $e) {
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

    public function getPendingCompaniesForUser()
    {
        // TODO optimizar
        try {
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Obtener las compañías donde el usuario está como miembro con estado 'P' (Pendiente)
            $companies = Company::whereHas('members', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->where('status', 'P'); // Estado pendiente
            })
                ->with(['members' => function ($query) use ($user) {
                    // Incluir solo la información del usuario autenticado
                    $query->where('user_id', $user->id)
                        ->withPivot('created_at') // Obtener la fecha de la invitación (asumiendo 'created_at')
                        ->select('users.id as user_id', 'email');  // Renombrar 'id' para evitar ambigüedad
                }])
                ->withCount('members')
                ->get();
            $data = $companies->map(function ($company) use ($user) {
                $member = $company->members->first(); // El miembro es el usuario autenticado
                return [
                    'company' => $company,
                    'invitation_date' => $member->pivot->created_at, // Fecha de invitación
                ];
            });
            return response()->json([
                'message' => 'Compañías pendientes obtenidas correctamente.',
                'companies' => $data
            ], 200); // 200 OK
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías pendientes.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }
}
