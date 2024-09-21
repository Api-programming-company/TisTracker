<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planning;
class PlanningController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // Listar todas las planificaciones
    public function index()
    {
        $plannings = Planning::all(); 
        return response()->json($plannings);
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
    // Guardar una nueva planificación
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'company_id' => 'required|exists:companies,id',
        ]);

        $planning = Planning::create($validatedData);

        return response()->json($planning, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Mostrar una planificación específica
    public function show($id)
    {
        $planning = Planning::findOrFail($id);
        return response()->json($planning);
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
    // Actualizar una planificación
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'company_id' => 'sometimes|required|exists:companies,id',
        ]);

        $planning = Planning::findOrFail($id);
        $planning->update($validatedData);

        return response()->json($planning, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Eliminar una planificación
    public function destroy($id)
    {
        $planning = Planning::findOrFail($id);
        $planning->delete();

        return response()->json(['message' => 'Planning eliminado correctamente'], 200);
    }
}
