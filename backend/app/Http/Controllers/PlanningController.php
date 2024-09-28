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
            // Validar si ya existe una planificación para la empresa dada
            $exists = Planning::where('company_id', $request->company_id)->exists();

            if ($exists) {
                return response()->json([
                    'message' => 'La empresa ya tiene una planificación',
                    'errors' => ['company_id' => 'Ya existe una planificación para esta empresa.']
                ], 422);
            }

            // Validar los datos
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'company_id' => 'required|exists:companies,id',
                'milestones' => 'required|array',
                'milestones.*.name' => 'required|string',
                'milestones.*.start_date' => 'required|date',
                'milestones.*.end_date' => 'required|date|after:milestones.*.start_date',
                'milestones.*.billing_percentage' => 'required|integer|min:0',
                'milestones.*.deliverables' => 'required|array|min:1',
            ]);

            // Crear planificación
            $planning = Planning::create([
                'name' => $validated['name'],
                'company_id' => $validated['company_id'],
            ]);

            // Crear hitos y entregables
            foreach ($validated['milestones'] as $milestoneData) {
                $milestone = $planning->milestones()->create($milestoneData);
                $milestone->deliverables()->createMany($milestoneData['deliverables']);
            }

            return response()->json($planning->load('milestones.deliverables'), 201);
        } catch (ValidationException $e) {
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al crear la planificación', 'error' => $e->getMessage()], 500);
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
                'milestones.*.start_date' => 'required_with:milestones|date|before:milestones.*.end_date',
                'milestones.*.end_date' => 'required_with:milestones|date|after:milestones.*.start_date',
                'milestones.*.billing_percentage' => 'required_with:milestones|integer|min:0',
                'milestones.*.deliverables' => 'required_with:milestones|array|min:1',
                'milestones.*.deliverables.*.name' => 'required|string|max:255',
                'milestones.*.deliverables.*.responsible' => 'required|string|max:255',
                'milestones.*.deliverables.*.objective' => 'required|string',
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
            return response()->json(['message' => 'Error al actualizar la planificación', 'error' => $e->getMessage()], 500);
        }
    }

    // Eliminar una planificación
    public function destroy($id)
    {
        try {
            $planning = Planning::findOrFail($id);
            // Eliminar hitos y entregables relacionados
            foreach ($planning->milestones as $milestone) {
                $milestone->deliverables()->delete();
                $milestone->delete();
            }
            // Eliminar la planificación
            $planning->delete();

            return response()->json(['message' => 'Planning, Milestones y Deliverables eliminados correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la planificación', 'error' => $e->getMessage()], 500);
        }
    }
}
