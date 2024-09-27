<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planning;
use App\Models\Milestone;
use App\Models\Deliverable;
use Illuminate\Validation\ValidationException;
use Exception;

class PlanningController extends Controller
{
    // Listar todas las planificaciones
    public function index()
    {
        try {
            // Obtener todas las planificaciones con hitos y entregables
            $plannings = Planning::with('milestones.deliverables')->get();
            return response()->json($plannings);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al obtener las planificaciones', 'error' => $e->getMessage()], 500);
        }
    }

    // Guardar una nueva planificación
    public function store(Request $request)
    {
        try {
            // Validar los datos de la planificación
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'company_id' => 'required|exists:companies,id',
                'milestones' => 'sometimes|array', // Validación para hitos
                'milestones.*.name' => 'required_with:milestones|string|max:255',
                'milestones.*.start_date' => 'required_with:milestones|date',
                'milestones.*.end_date' => 'required_with:milestones|date',
                'milestones.*.billing_percentage' => 'required_with:milestones|numeric',
                'milestones.*.deliverables' => 'sometimes|array', // Validación para entregables
                'milestones.*.deliverables.*.name' => 'required_with:milestones.deliverables|string|max:255',
                'milestones.*.deliverables.*.responsible' => 'required_with:milestones.deliverables|string|max:255',
                'milestones.*.deliverables.*.objective' => 'required_with:milestones.deliverables|string',
            ]);

            // Crear la planificación
            $planning = Planning::create([
                'name' => $validatedData['name'],
                'company_id' => $validatedData['company_id']
            ]);

            // Crear los hitos (si existen)
            if (isset($validatedData['milestones'])) {
                foreach ($validatedData['milestones'] as $milestoneData) {
                    $milestone = new Milestone($milestoneData);
                    $planning->milestones()->save($milestone);

                    // Crear los entregables (si existen)
                    if (isset($milestoneData['deliverables'])) {
                        foreach ($milestoneData['deliverables'] as $deliverableData) {
                            $deliverable = new Deliverable($deliverableData);
                            $milestone->deliverables()->save($deliverable);
                        }
                    }
                }
            }

            return response()->json($planning->load('milestones.deliverables'), 201);
        } catch (ValidationException $e) {
            // Manejar errores de validación
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors(),
            ], 422);
        } catch (Exception $e) {
            // Manejar otros errores generales
            return response()->json([
                'message' => 'Ocurrió un error al crear la planificación',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    // Mostrar una planificación específica
    public function show($id)
    {
        try {
            $planning = Planning::with('milestones.deliverables')->findOrFail($id);
            return response()->json($planning);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al obtener la planificación', 'error' => $e->getMessage()], 500);
        }
    }

    // Actualizar una planificación
    public function update(Request $request, $id)
    {
        try {
            // Validar los datos de actualización
            $validatedData = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'company_id' => 'sometimes|required|exists:companies,id',
                'milestones' => 'sometimes|array',
                'milestones.*.id' => 'nullable|exists:milestones,id',
                'milestones.*.name' => 'required_with:milestones|string|max:255',
                'milestones.*.start_date' => 'required_with:milestones|date',
                'milestones.*.end_date' => 'required_with:milestones|date',
                'milestones.*.billing_percentage' => 'required_with:milestones|numeric',
                'milestones.*.deliverables' => 'nullable|array',
                'milestones.*.deliverables.*.id' => 'sometimes|exists:deliverables,id',
                'milestones.*.deliverables.*.name' => 'required_with:milestones.deliverables|string|max:255',
                'milestones.*.deliverables.*.responsible' => 'required_with:milestones.deliverables|string|max:255',
                'milestones.*.deliverables.*.objective' => 'required_with:milestones.deliverables|string',
            ]);

            // Buscar la planificación
            $planning = Planning::findOrFail($id);
            $planning->update($validatedData);

            // Actualizar hitos y entregables
            if (isset($validatedData['milestones'])) {
                foreach ($validatedData['milestones'] as $milestoneData) {
                    $milestone = Milestone::updateOrCreate(
                        ['id' => $milestoneData['id'] ?? null],
                        array_merge($milestoneData, ['planning_id' => $planning->id])
                    );

                    // Crear o actualizar entregables
                    if (isset($milestoneData['deliverables'])) {
                        foreach ($milestoneData['deliverables'] as $deliverableData) {
                            Deliverable::updateOrCreate(
                                ['id' => $deliverableData['id'] ?? null],
                                array_merge($deliverableData, ['milestone_id' => $milestone->id])
                            );
                        }
                    }
                }
            }

            return response()->json($planning->load('milestones.deliverables'), 200);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al actualizar la planificación', 'error' => $e->getMessage()], 500);
        }
    }

    // Eliminar una planificación
    public function destroy($id)
    {
        try {
            $planning = Planning::findOrFail($id);
            $planning->milestones()->each(function ($milestone) {
                $milestone->deliverables()->delete();
                $milestone->delete();
            });
            $planning->delete();

            return response()->json(['message' => 'Planning, Milestones y Deliverables eliminados correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al eliminar la planificación', 'error' => $e->getMessage()], 500);
        }
    }
}
