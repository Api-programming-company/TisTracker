<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
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
        // Obtener todos los miembros de una compañía específica
        $companyUsers = Company::with('members')->get();
        return response()->json([
            'message' => 'Lista de miembros de las compañías obtenida correctamente.',
            'data' => $companyUsers
        ], 200);
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
        $company = Company::with('members')->find($id);

        if (!$company) {
            return response()->json([
                'message' => 'Compañía no encontrada.'
            ], 404);
        }

        return response()->json([
            'message' => 'Miembros de la compañía obtenidos correctamente.',
            'data' => $company->members
        ], 200);
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
            // Validación de los campos, si están presentes
            $request->validate([
                'status' => 'sometimes|in:A,P,R',
                'permission' => 'sometimes|in:R,W' 
            ]);
    
            // Obtener la compañía
            $company = Company::find($id);  // Usar find en lugar de findOrFail
            if (!$company) {
                return response()->json([
                    'message' => 'Compañía no encontrada.'
                ], 404);
            }
    
            $user = Auth::user();  // Obtener el usuario actual
    
            // Verificar si el usuario es miembro de la compañía
            if ($company->members()->where('user_id', $user->id)->exists()) {
                $data = [];
    
                // Verificar si los campos están presentes y asignarlos
                if ($request->has('status')) {
                    $data['status'] = $request->status;
                }
                if ($request->has('permission')) {
                    $data['permission'] = $request->permission;
                }
    
                // Actualizar la relación solo si hay datos para actualizar
                if (!empty($data)) {
                    $company->members()->updateExistingPivot($user->id, $data);
    
                    return response()->json([
                        'message' => 'Relación actualizada correctamente.'
                    ], 200);
                }
    
                return response()->json([
                    'message' => 'No se proporcionaron datos para actualizar.'
                ], 400);
            }
    
            return response()->json([
                'message' => 'El usuario no pertenece a la compañía.'
            ], 404);
    
        } catch (ValidationException $e) {
            // Manejo específico de la excepción de validación
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
    
        } catch (Exception $e) {
            // Manejar cualquier otra excepción inesperada
            return response()->json([
                'message' => 'Ocurrió un error inesperado.',
                'error' => $e->getMessage()
            ], 500);
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
        // Validar el ID del usuario a eliminar
        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        // Buscar la compañía
        $company = Company::findOrFail($id); // Usa $id para buscar la compañía

        // Desvincular al usuario de la compañía
        $company->members()->detach($request->user_id);

        return response()->json(['message' => 'Miembro eliminado correctamente de la compañía.'], 200);
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
