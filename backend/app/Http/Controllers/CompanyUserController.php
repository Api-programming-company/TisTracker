<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use App\Models\CompanyUser;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

use Exception;

class CompanyUserController extends Controller
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

            // Obtener las compañías asociadas al usuario con status 'P'
            $companies = $user->companies()
                ->where('company_user.status', 'P') // Filtra por status 'P' en la tabla pivote
                ->withPivot('status', 'permission') // Incluye los campos adicionales del pivote
                ->withCount(['members as members_count' => function ($query) {
                    $query->where('status', 'A'); // Filtra solo los miembros activos
                }])
                ->get();

            return response()->json([
                'message' => 'Invitaciones obtenidas correctamente.',
                'companies' => $companies,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Se ha producido un error inesperado al obtener las compañías.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
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
            // Validar los datos de entrada
            $request->validate([
                'company_id' => 'required|exists:companies,id',
                'user_ids' => 'required|array',  // Aceptar un array de IDs de usuarios
                'user_ids.*' => 'exists:users,id',  // Validar que cada ID de usuario existe
                'status' => 'required|in:A,P', // Aceptado o Pendiente
                'permission' => 'required|in:R,W' // Read o Write
            ]);

            // Obtener el usuario autenticado que envía la solicitud
            $user = Auth::user();

            // Verificar que el usuario que envía la solicitud tiene un periodo académico
            if (!$user->academic_period_id) {
                return response()->json([
                    'message' => 'El usuario que envía la solicitud no tiene un periodo académico asignado.'
                ], 400);
            }

            // Verificar que todos los miembros del grupo pertenezcan al mismo periodo académico que el usuario que envía la solicitud
            $members = User::whereIn('id', $request->user_ids)->get();

            foreach ($members as $member) {
                if ($member->academic_period_id !== $user->academic_period_id) {
                    return response()->json([
                        'message' => "El usuario {$member->first_name} {$member->last_name} no pertenece al mismo periodo académico."
                    ], 400);  // 400 Bad Request
                }
            }

            // Obtener la compañía (grupo)
            $company = Company::find($request->company_id);

            // Verificar el número de miembros con estado 'A' o 'P' ya existentes
            $activeOrPendingCount = $company->members()
                ->whereIn('status', ['A', 'P']) // Filtrar los miembros activos o pendientes
                ->count();

            // Verificar si al agregar los nuevos miembros se excede el límite de 7
            $newMembersCount = count($request->user_ids);
            if (($activeOrPendingCount + $newMembersCount) > 7) {
                return response()->json([
                    'message' => 'No se pueden enviar más de 7 invitaciones. Las invitaciones rechazadas no cuentan.'
                ], 400);  // 400 Bad Request
            }

            // Asignar los usuarios a la compañía
            foreach ($request->user_ids as $userId) {
                $company->members()->attach($userId, [
                    'status' => $request->status,
                    'permission' => $request->permission
                ]);
            }

            return response()->json([
                'message' => 'Miembros agregados correctamente a la compañía.'
            ], 201);  // 201 Created

        } catch (ValidationException $e) {
            // Manejo de errores de validación
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);  // 422 Unprocessable Entity
        } catch (Exception $e) {
            // Manejo de errores generales
            return response()->json([
                'message' => 'Se ha producido un error inesperado',
                'error' => $e->getMessage()
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
            $validator = Validator::make(['id' => $id], [
                'id' => 'required|integer|exists:companies,id',
            ]);

            // Si la validación falla, retornar un error 400 con los mensajes de validación
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación.',
                    'errors' => $validator->errors(),
                ], 422);
            }
            
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Buscar la compañía por ID, incluyendo relaciones necesarias
            $company = Company::with([
                'members' => function ($query) use ($user) {
                    // Obtener sólo el miembro que coincide con el usuario autenticado
                    $query->where('user_id', $user->id)
                        ->select('users.id', 'email') // Incluir el email o cualquier otro campo que necesites
                        ->withPivot('permission'); // Obtener el permiso desde la tabla pivote
                },
                'planning.milestones.deliverables',
                'academicPeriod.creator'
            ])->find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], 404);
            }

            // Verificar si el usuario es miembro de la compañía
            $member = $company->members->first();
            if (!$member) {
                return response()->json(['message' => 'No tienes permisos para acceder a esta compañía.'], 403);
            }

            // Devolver la respuesta con la compañía y el permiso del usuario autenticado
            return response()->json([
                'message' => 'Compañía obtenida correctamente.',
                'company' => $company,
                'user_permission' => $member->pivot->permission, // Agregar el permiso del usuario
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía.',
                'error' => $e->getMessage()
            ], 500);
        }
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
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
        try {
            // Validar la solicitud
            $request->validate([
                'status' => 'required|in:A,R', // Aceptado, Rechazado
            ]);

            // Obtener el usuario autenticado
            $user = Auth::user();
            $userId = $user->id;

            // Verificar si el usuario ya pertenece a una compañía en estado "A"
            $existingCompany = Company::whereHas('members', function ($query) use ($userId) {
                $query->where('user_id', $userId)->where('status', 'A');
            })->first();

            if ($existingCompany) {
                return response()->json([
                    'message' => 'Ya eres miembro de una empresa'
                ], 403); // 403 Forbidden
            }

            // Buscar la compañía y el usuario en esa compañía
            $companyUser = CompanyUser::where('company_id', $id)->where('user_id', $userId)->first();

            // Verificar si la compañía está en estado "P"
            if (!$companyUser || $companyUser->status !== 'P') {
                return response()->json([
                    'message' => 'No se puede actualizar el estado porque la compañía no está pendiente.'
                ], 403); // 403 Forbidden
            }

            // Actualizar el estado del usuario en la compañía
            $companyUser->update(['status' => $request->status]);

            // Determinar el mensaje basado en el nuevo estado
            $message = $request->status === 'A'
                ? 'Solicitud aceptada correctamente.'
                : 'Solicitud rechazada correctamente.';

            return response()->json([
                'message' => $message,
                'company_user' => $companyUser
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error.',
                'errors' => $e->validator->errors()
            ], 422); // 422 Unprocessable Entity

        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al actualizar el estado del usuario.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }



    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, $id)
    {
        try {
            // Validar el ID del usuario a eliminar
            $request->validate([
                'user_id' => 'required|exists:users,id',
            ]);

            // Buscar la compañía
            $company = Company::findOrFail($id); // Usa $id para buscar la compañía

            // Desvincular al usuario de la compañía
            $company->members()->detach($request->user_id);

            return response()->json(['message' => 'Miembro eliminado correctamente de la compañía.'], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Se ha producido un error inesperado al eliminar al miembro.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getStudentCompanyByAcademicPeriod($academicPeriodId)
    {
        try {
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Verificar si el usuario es un estudiante
            if ($user->user_type !== 'E') {  // 'E' para estudiante
                return response()->json([
                    'message' => 'El usuario no es un estudiante.'
                ], 403);  // 403 Forbidden
            }

            // Buscar la compañía a la que el estudiante está inscrito en el periodo académico especificado
            $company = Company::where('academic_period_id', $academicPeriodId)
                ->whereHas('members', function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                })->first();

            // Verificar si se encontró una compañía (grupo)
            if (!$company) {
                return response()->json([
                    'message' => 'No se encontró un grupo para el estudiante en este periodo académico.'
                ], 404);
            }

            // Retornar la compañía del estudiante
            return response()->json([
                'message' => 'Grupo encontrado correctamente.',
                'data' => $company
            ], 200);
        } catch (Exception $e) {

            return response()->json([
                'message' => 'Se ha producido un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
