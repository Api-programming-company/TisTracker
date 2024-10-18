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
                ->withPivot(['id', '*']) // Incluye los campos adicionales del pivote
                ->withCount([
                    'members as members_count' => function ($query) {
                        $query->where('status', 'A'); // Filtra solo los miembros activos
                    }
                ])
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
            $request->validate([
                'company_id' => 'required|exists:companies,id',
                'user_id' => 'required|exists:users,id',
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

            // Verificar que el usuario no está intentando invitarse a sí mismo
            if ($user->id === $request->user_id) {
                return response()->json([
                    'message' => 'No puedes invitarte a ti mismo a la compañía.'
                ], 400);  // 400 Bad Request
            }

            // Obtener el usuario a agregar
            $member = User::find($request->user_id);
            
            // Verificar si el miembro ya está activo en otra grupo empresa
            $isActiveInAnotherCompany = CompanyUser::where('user_id', $request->user_id)
                ->where('status', 'A')  // Estado 'A' para activo
                ->where('company_id', '!=', $request->company_id)  // Verificar si está en otra empresa
                ->exists();

            if ($isActiveInAnotherCompany) {
                return response()->json([
                    'message' => "El usuario {$member->first_name} {$member->last_name} ya está activo en otra grupo empresa."
                ], 400);  // 400 Bad Request
            }

            // Verificar que el miembro pertenezca al mismo periodo académico que el usuario que envía la solicitud
            if ($member->academic_period_id !== $user->academic_period_id) {
                return response()->json([
                    'message' => "El usuario {$member->first_name} {$member->last_name} no pertenece al mismo periodo académico."
                ], 400);  // 400 Bad Request
            }

            // Obtener la empresa
            $company = Company::find($request->company_id);

            // Verificar si el miembro ya está invitado o activo en la compañía
            $existingMember = $company->members()->where('user_id', $request->user_id)->first();
            if ($existingMember) {
                return response()->json([
                    'message' => "El usuario {$member->first_name} {$member->last_name} ya ha sido invitado o es miembro activo de la compañía."
                ], 400);  // 400 Bad Request
            }

            // Verificar el número de miembros con estado 'A' o 'P' ya existentes
            $activeOrPendingCount = $company->members()
                ->whereIn('status', ['A', 'P']) // Filtrar los miembros activos o pendientes
                ->count();

            // Verificar si al agregar el nuevo miembro se excede el límite de 7
            if (($activeOrPendingCount + 1) > 7) {
                return response()->json([
                    'message' => 'No se pueden enviar más de 7 invitaciones. Las invitaciones rechazadas no cuentan.'
                ], 400);  // 400 Bad Request
            }

            // Asignar el usuario a la compañía
            $companyUser = new CompanyUser([
                'user_id' => $request->user_id,
                'company_id' => $request->company_id,
                'status' => $request->status,
                'permission' => $request->permission
            ]);
            $companyUser->save();

            // Recargar la compañía con los miembros y sus pivotes
            $company->load('members');

            return response()->json([
                'message' => 'Miembro agregado correctamente a la compañía.',
                'company' => $company
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
            // Validar que el ID exista en la tabla company_user
            $validator = Validator::make(['id' => $id], [
                'id' => 'required|integer|exists:company_users,id',
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

            // Buscar el registro en la tabla pivote por su ID
            $companyUser = CompanyUser::with('company')
                ->where('id', $id)
                ->first();

            // Verificar si el registro en la tabla pivote existe
            if (!$companyUser) {
                return response()->json(['message' => 'No se encontró el registro especificado en company_user.'], 404);
            }

            // Devolver la respuesta con la información de la compañía y el permiso del usuario autenticado
            return response()->json([
                'message' => 'Compañía obtenida correctamente.',
                'company' => $companyUser->company,
                'request_date' => $companyUser->updated_at,
                'user' => $companyUser->user,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información.',
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

            $companyUser = CompanyUser::find($id);
            // Obtener el usuario autenticado
            $user = $companyUser->user;
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

    public function getEvaluationByCompanyUserId($id)
    {
        try {
            $validator = Validator::make(['id' => $id], [
                'id' => 'required|integer|exists:company_users,id',
            ]);

            // Si la validación falla, retornar un error 400 con los mensajes de validación
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación.',
                    'errors' => $validator->errors(),
                    'id' => $id,
                ], 422);
            }

            // Obtener el usuario autenticado
            $user = Auth::user();

            // Buscar el registro en la tabla pivote por su ID
            $companyUser = CompanyUser::with('company.academicPeriod.creator')
                ->where('id', $id)
                ->first();

            // Verificar si el registro en la tabla pivote existe
            if (!$companyUser) {
                return response()->json(['message' => 'No se encontró el registro especificado en company_user.'], 404);
            }

            // Obtener la compañía del companyUser
            $company = $companyUser->company;

            // Obtener la evaluación del periodo académico si existe
            $academic_period_evaluation = $company->academicPeriod->evaluations()
                ->where('evaluation_type', 'U')
                ->with(['evaluation.questions.answerOptions'])
                ->first();

            if (!$academic_period_evaluation) {
                return response()->json(['message' => 'El periodo academico no cuenta con la evaluacion.'], 404);
            }

            // Validar que la fecha actual esté dentro del rango de fechas de la evaluación
            $currentDate = now();
            if ($currentDate->lt($academic_period_evaluation->start_date) || $currentDate->gt($academic_period_evaluation->end_date)) {
                return response()->json(['message' => 'El periodo academico no esta dentro de la fecha de evaluacion.'], 422);
            }

            return response()->json([
                'message' => 'Evaluado y evaluación obtenidas correctamente.',
                'evaluation' => $academic_period_evaluation->evaluation,
                'evaluatee' => $companyUser->user,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía y la evaluación.',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
