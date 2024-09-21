<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deliverable;
class DeliverableController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    // Listar todos los entregables
    public function index()
    {
        $deliverables = Deliverable::all(); 
        return response()->json($deliverables);
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
    // Guardar un nuevo entregable
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'responsible' => 'required|string|max:255',
            'objective' => 'required|string',
            'milestone_id' => 'required|exists:milestones,id',
        ]);

        $deliverable = Deliverable::create($validatedData);

        return response()->json($deliverable, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Mostrar un entregable específico
    public function show($id)
    {
        $deliverable = Deliverable::findOrFail($id);
        return response()->json($deliverable);
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
    // Actualizar un entregable
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'responsible' => 'sometimes|required|string|max:255',
            'objective' => 'sometimes|required|string',
            'milestone_id' => 'sometimes|required|exists:milestones,id',
        ]);

        $deliverable = Deliverable::findOrFail($id);
        $deliverable->update($validatedData);

        return response()->json($deliverable, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    // Eliminar un entregable
    public function destroy($id)
    {
        $deliverable = Deliverable::findOrFail($id);
        $deliverable->delete();

        return response()->json(['message' => 'Deliverable eliminado correctamente'], 200);
    }
}
