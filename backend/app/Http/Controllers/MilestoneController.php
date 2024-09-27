<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Milestone;
use Exception;
use Illuminate\Support\Facades\Log;

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
        try {
            $milestones = Milestone::all(); 
            return response()->json($milestones);
        } catch (Exception $e) {
            Log::error('Error al listar los hitos: ' . $e->getMessage());
            return response()->json(['error' => 'Ocurrió un error al listar los hitos'], 500);
        }
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
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'billing_percentage' => 'required|numeric',
                'planning_id' => 'required|exists:plannings,id',
            ]);

            $milestone = Milestone::create($validatedData);

            return response()->json($milestone, 201);
        } catch (Exception $e) {
            Log::error('Error al crear un nuevo hito: ' . $e->getMessage());
            return response()->json(['error' => 'Ocurrió un error al crear el hito'], 500);
        }
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
        try {
            $milestone = Milestone::findOrFail($id);
            return response()->json($milestone);
        } catch (Exception $e) {
            Log::error('Error al mostrar el hito: ' . $e->getMessage());
            return response()->json(['error' => 'Ocurrió un error al mostrar el hito'], 500);
        }
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
        try {
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
        } catch (Exception $e) {
            Log::error('Error al actualizar el hito: ' . $e->getMessage());
            return response()->json(['error' => 'Ocurrió un error al actualizar el hito'], 500);
        }
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
        try {
            $milestone = Milestone::findOrFail($id);
            $milestone->delete();

            return response()->json(['message' => 'Milestone eliminado correctamente'], 200);
        } catch (Exception $e) {
            Log::error('Error al eliminar el hito: ' . $e->getMessage());
            return response()->json(['error' => 'Ocurrió un error al eliminar el hito'], 500);
        }
    }
}
