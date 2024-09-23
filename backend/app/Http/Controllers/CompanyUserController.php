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
        $request->validate([
            'company_id' => 'required|exists:companies,id',
            'user_id' => 'required|exists:users,id',
            'status' => 'required|in:A,P', // Aceptado o Pendiente
            'permission' => 'required|in:R,W' // Read o Write
        ]);

        $company = Company::find($request->company_id);
        $company->members()->attach($request->user_id, [
            'status' => $request->status,
            'permission' => $request->permission
        ]);

        return response()->json([
            'message' => 'Miembro agregado correctamente a la compañía.'
        ], 201);
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
}
