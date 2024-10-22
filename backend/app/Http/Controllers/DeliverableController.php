<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Deliverable;
use Illuminate\Validation\ValidationException;
use Exception;

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
        try {
            $deliverables = Deliverable::all();
            return response()->json($deliverables);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al listar los entregables',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
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
    // Guardar un nuevo entregable
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'responsible' => 'required|string|max:255',
                'objective' => 'required|string',
                'milestone_id' => 'required|exists:milestones,id',
            ]);

            $deliverable = Deliverable::create($validatedData);

            return response()->json($deliverable, 201); // 201 Created
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422); // 422 Unprocessable Entity
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Se ha producido un error al crear el entregable',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
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
        try {
            $deliverable = Deliverable::findOrFail($id);
            return response()->json($deliverable);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el entregable',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
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
    // Actualizar un entregable
    public function update(Request $request, $id)
    {
        try {
            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'responsible' => 'sometimes|required|string|max:255',
                'objective' => 'sometimes|required|string',
                'milestone_id' => 'sometimes|required|exists:milestones,id',
                'expected_result' => 'sometimes|nullable|integer|min:0',
                'actual_result' => 'sometimes|nullable|integer|min:0',
                'observations' => 'sometimes|nullable|string|max:255',
                'status' => 'sometimes|required|in:A,C',
            ]);

            $deliverable = Deliverable::findOrFail($id);

            // Asignar valores por defecto si no se proporcionan
            $validatedData['observations'] = $validatedData['observations'] ?? 'Sin observaciones';
            $validatedData['status'] = $validatedData['status'] ?? 'A';
            
            if ($request->status === 'C' && is_null($request->actual_result)) {
                return response()->json(['error' => 'No se puede marcar como completado sin un resultado real.'], 422);
            }
            

            $deliverable->update($validatedData);

            return response()->json([
                'message' => 'Deliverable actualizado correctamente',
                'data' => $deliverable
            ], 200); // 200 OK
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el entregable',
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
    // Eliminar un entregable
    public function destroy($id)
    {
        try {
            $deliverable = Deliverable::findOrFail($id);
            $deliverable->delete();

            return response()->json(['message' => 'Deliverable eliminado correctamente'], 200); // 200 OK
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el entregable',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }
}
