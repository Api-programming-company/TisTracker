<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planning;
use App\Models\Milestone;
use App\Models\Deliverable;
use App\Models\Company;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Auth;
use Response;

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

            // Obtener la compañía para la cual se está creando la planificación
            $company = Company::findOrFail($validated['company_id']);

            // Obtener el periodo académico asociado a la compañía
            $academicPeriod = $company->academicPeriod;

            // Validar que el periodo académico exista para la compañía
            if (!$academicPeriod) {
                return response()->json([
                    'message' => 'No se encontró un periodo académico asociado a la compañía.'
                ], 422);
            }

            // Validar que las fechas de los hitos estén dentro del rango de planificación del periodo académico
            foreach ($validated['milestones'] as $milestone) {
                if ($milestone['start_date'] < $academicPeriod->planning_start_date || 
                    $milestone['end_date'] > $academicPeriod->planning_end_date) {
                    return response()->json([
                        'message' => 'Las fechas de los hitos deben estar dentro del rango de planificación del periodo académico.',
                        'errors' => [
                            'milestones' => 'El hito ' . $milestone['name'] . ' tiene fechas fuera del rango permitido.'
                        ]
                    ], 422);
                }
            }

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
        if (!is_numeric($id)) {
            abort(404);
        }
        // Buscar la planificación con hitos y entregables
        $planning = Planning::with('milestones.deliverables', 'company')->findOrFail($id);

        // Obtener el usuario autenticado
        $user = auth()->user();

        // Verificar si el usuario es miembro de la compañía relacionada con la planificación
        $company = $planning->company;
        $member = $company->members()->where('user_id', $user->id)->first();

        if (!$member && $user->user_type !== 'D') {
            return response()->json([
                'message' => 'No tienes permisos para acceder a esta planificación.',
            ], 403);
        }

        // Obtener el permiso del usuario autenticado desde la tabla pivote
        $userPermission = $member ? $member->permission : null;

        // Devolver la planificación con los permisos del usuario autenticado
        return response()->json([
            'message' => 'Planificación obtenida correctamente.',
            'planning' => $planning->load('milestones.deliverables'),
            'user_permission' => $userPermission
        ], 200);
    }

    // Actualizar una planificación
    public function update(Request $request, $id)
    {

        try {
            // Validar los datos de actualización
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'company_id' => 'sometimes|exists:companies,id',
                'milestones' => 'sometimes|array',
                'milestones.*.id' => 'nullable|exists:milestones,id',
                'milestones.*.name' => 'sometimes|string|max:255',
                'milestones.*.start_date' => 'sometimes|date|before:milestones.*.end_date',
                'milestones.*.end_date' => 'sometimes|date|after:milestones.*.start_date',
                // 'milestones.*.billing_percentage' => 'sometimes|required|integer|min:0',
                'milestones.*.status' => 'sometimes|in:A,P',
                'milestones.*.deliverables' => 'sometimes|array|min:1',
                'milestones.*.deliverables.*.name' => 'sometimes|string|max:255',
                //'milestones.*.deliverables.*.responsible' => 'sometimes|string|max:255',
                //'milestones.*.deliverables.*.objective' => 'sometimes|string',
                'milestones.*.deliverables.*.expected_result' => 'sometimes|nullable|integer|min:0',
                'milestones.*.deliverables.*.actual_result' => 'sometimes|nullable|integer|min:0',
                'milestones.*.deliverables.*.observations' => 'sometimes|nullable|string|max:255',
                'milestones.*.deliverables.*.status' => 'sometimes|in:A,C',
            ]);

            $user = Auth::user();

            if ($user->user_type !== 'D') {
                // Revisar si hay cambios en los campos restringidos
                foreach ($validatedData['milestones'] as $milestoneData) {
                    if (
                        isset($milestoneData['status']) ||
                        isset($milestoneData['deliverables']) && (
                            isset($milestoneData['deliverables']['expected_result']) ||
                            isset($milestoneData['deliverables']['actual_result']) ||
                            isset($milestoneData['deliverables']['observations'])
                        )
                    ) {
                        return response()->json([
                            'message' => 'No tienes permisos para modificar los campos de estado, resultado esperado, resultado actual u observaciones.',
                        ], 403);
                    }
                }
            }

            // Buscar la planificación
            $planning = Planning::findOrFail($id);
            $planning->update($validatedData);

            // Validar que la suma de porcentajes no exceda 100%
            if (isset($validatedData['milestones'])) {
                $totalBilling = array_sum(array_column($validatedData['milestones'], 'billing_percentage'));

                if ($totalBilling > 100) {
                    return response()->json([
                        'message' => 'La suma de los billing_percentage no puede ser mayor a 100%.',
                        'errors' => ['billing_percentage' => 'El total es ' . $totalBilling . '%.']
                    ], 422);
                }

                // Actualizar o crear hitos y sus entregables
                foreach ($validatedData['milestones'] as $milestoneData) {
                    $milestone = Milestone::updateOrCreate(
                        ['id' => $milestoneData['id'] ?? null],
                        array_merge(
                            $milestoneData,
                            ['planning_id' => $planning->id, 'status' => $milestoneData['status'] ?? 'P']
                        )
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
