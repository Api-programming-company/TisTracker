<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Milestone;

class MilestoneController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // Listar todos los hitos
    public function index()
    {
        $milestones = Milestone::all(); 
        return response()->json($milestones);
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
    // Guardar un nuevo hito
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'billing_percentage' => 'required|numeric',
            'planning_id' => 'required|exists:plannings,id',
        ]);

        $milestone = Milestone::create($validatedData);

        return response()->json($milestone, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Mostrar un hito específico
    public function show($id)
    {
        $milestone = Milestone::findOrFail($id);
        return response()->json($milestone);
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
    // Actualizar un hito
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'start_date' => 'sometimes|required|date',
            'end_date' => 'sometimes|required|date',
            'billing_percentage' => 'sometimes|required|numeric',
            'planning_id' => 'sometimes|required|exists:plannings,id',
        ]);

        $milestone = Milestone::findOrFail($id);
        $milestone->update($validatedData);

        return response()->json($milestone, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Eliminar un hito
    public function destroy($id)
    {
        $milestone = Milestone::findOrFail($id);
        $milestone->delete();

        return response()->json(['message' => 'Milestone eliminado correctamente'], 200);
    }
}
