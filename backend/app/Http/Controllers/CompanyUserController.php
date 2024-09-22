<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
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
        $request->validate([
            'status' => 'required|in:A,P',
            'permission' => 'required|in:R,W'
        ]);

        $company = Company::find($id);
        $user = Auth::user(); // Obtener el usuario actual para realizar las verificaciones necesarias

        if ($company->members()->where('user_id', $user->id)->exists()) {
            $company->members()->updateExistingPivot($user->id, [
                'status' => $request->status,
                'permission' => $request->permission
            ]);

            return response()->json([
                'message' => 'Relación actualizada correctamente.'
            ], 200);
        }

        return response()->json([
            'message' => 'El usuario no pertenece a la compañía.'
        ], 404);
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
