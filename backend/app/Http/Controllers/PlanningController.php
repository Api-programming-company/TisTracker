<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planning;
use App\Models\Milestone;
use App\Models\Deliverable;
use App\Models\Company;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Exception;
use Illuminate\Support\Facades\Auth;
use Response;
use Carbon\Carbon;

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



    public function store(Request $request)
    {
        try {
            $timezone = $request->header('Timezone', 'UTC');
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

            // Obtener la fecha actual
            $currentDate = Carbon::now();

            // Obtener las fechas de inicio y fin del periodo académico
            $academicPeriodStartDate = Carbon::parse($academicPeriod->start_date, $timezone)->startOfDay();
            $academicPeriodEndDate = Carbon::parse($academicPeriod->end_date, $timezone)->endOfDay();

            // Obtener la fecha de inicio de la planificación
            $planningStartDate = Carbon::parse($academicPeriod->planning_start_date, $timezone)->startOfDay();
            $planningEndDate = Carbon::parse($academicPeriod->planning_end_date, $timezone)->endOfDay();

            // Obtener la fecha de inicio de las evaluaciones
            $evaluationsStartDate = Carbon::parse($academicPeriod->evaluation_start_date, $timezone)->startOfDay();

            // Verificar si la fecha actual está dentro del rango de planificación del periodo académico
            if ($currentDate < $planningStartDate || $currentDate > $planningEndDate) {
                return response()->json([
                    'message' => 'El periodo de planificación no está habilitado.',
                    'errors' => ['planning_period' => 'El periodo de planificación no está habilitado.']
                ], 422);
            }

            // Validar que las fechas de los hitos estén dentro del rango del periodo académico
            foreach ($validated['milestones'] as $milestone) {
                // Verificar que el inicio y fin del hito estén dentro del rango del periodo académico
                $milestoneStartDate = Carbon::parse($milestone['start_date'])->setTimezone($timezone)->startOfDay();
                $milestoneEndDate = Carbon::parse($milestone['end_date'])->setTimezone($timezone)->endOfDay();

                if (
                    $milestoneStartDate < $academicPeriodStartDate ||
                    $milestoneEndDate > $academicPeriodEndDate
                ) {
                    return response()->json([
                        'message' => 'Las fechas de los hitos deben estar dentro del rango del periodo académico.',
                        'errors' => [
                            'milestones' => 'El hito ' . $milestone['name'] . ' tiene fechas fuera del rango permitido.'
                        ]
                    ], 422);
                }

                // Verificar que el hito termine antes de que inicien las evaluaciones
                if ($milestoneEndDate >= $evaluationsStartDate) {
                    return response()->json([
                        'message' => 'El hito ' . $milestone['name'] . ' debe terminar antes de que inicien las evaluaciones del periodo académico.',
                        'errors' => [
                            'milestones' => 'La fecha de finalización del hito ' . $milestone['name'] . ' debe ser antes del inicio de las evaluaciones.'
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
        DB::beginTransaction(); // Iniciar transacción
        try {
            // Log de entrada
            Log::info('Datos recibidos:', $request->all());

            // Validar los datos de entrada
            $validatedData = $request->validate([
                'name' => 'sometimes|string|max:255',
                'company_id' => 'sometimes|exists:companies,id',
                'milestones' => 'sometimes|array',
                'milestones.*.id' => 'nullable|exists:milestones,id',
                'milestones.*.name' => 'sometimes|string|max:255',
                'milestones.*.start_date' => 'sometimes|date|before:milestones.*.end_date',
                'milestones.*.end_date' => 'sometimes|date|after:milestones.*.start_date',
                'milestones.*.billing_percentage' => 'sometimes|required|numeric|min:0|max:100',
                'milestones.*.status' => 'sometimes|in:A,P',
                'milestones.*.deliverables' => 'sometimes|array|min:1',
                'milestones.*.deliverables.*.id' => 'nullable|exists:deliverables,id',
                'milestones.*.deliverables.*.name' => 'sometimes|string|max:255',
                'milestones.*.deliverables.*.expected_result' => 'sometimes|nullable|integer|min:0',
                'milestones.*.deliverables.*.actual_result' => 'sometimes|nullable|integer|min:0',
                'milestones.*.deliverables.*.observations' => 'sometimes|nullable|string|max:255',
                'milestones.*.deliverables.*.status' => 'sometimes|in:A,C',
                'milestones.*.deliverables.*.created_by' => 'sometimes|in:D,E',
            ]);

            // Buscar la planificación
            $planning = Planning::findOrFail($id);
            $planning_milestones = $planning->milestones()->get();

            $validated_milestones_ids = array_column($validatedData['milestones'], 'id');

            // Eliminar hitos y entregables relacionados
            foreach ($planning_milestones as $planning_milestone) {
                if (!in_array($planning_milestone->id, $validated_milestones_ids)) {
                    $planning_milestone->delete();
                } else {
                    $deliverables = $planning_milestone->deliverables()->get();
                    $validated_milestone = array_filter($validatedData['milestones'], function ($milestone) use ($planning_milestone) {
                        return $milestone['id'] == $planning_milestone->id;
                    });
                    if (!empty($validated_milestone)) {
                        $validated_milestone = array_values($validated_milestone);
                        $validated_deliverables_ids = array_column($validated_milestone[0]['deliverables'], 'id');
                        // ELiminar nulls

                        foreach ($deliverables as $deliverable) {
                            if (!in_array($deliverable->id, $validated_deliverables_ids)) {
                                $deliverable->delete();
                            }
                        }
                    }

                }
            }


            // Actualizar la planificación principal
            $planning->update([
                'name' => $validatedData['name'] ?? $planning->name,
                'company_id' => $validatedData['company_id'] ?? $planning->company_id,
            ]);


            // Log de planificación actualizada
            Log::info('Planning actualizado:', $planning->toArray());

            // Procesar hitos si están presentes
            if (!empty($validatedData['milestones'])) {
                $totalBilling = array_sum(array_column($validatedData['milestones'], 'billing_percentage'));

                if ($totalBilling > 100) {
                    return response()->json([
                        'message' => 'La suma de los porcentajes de facturación no puede exceder el 100%.',
                    ], 422);
                }

                foreach ($validatedData['milestones'] as $milestoneData) {
                    Log::info('Milestone por crear:', $milestoneData);

                    // Crear o actualizar el hito
                    $milestone = Milestone::updateOrCreate(
                        ['id' => $milestoneData['id'] ?? null],
                        [
                            'name' => $milestoneData['name'] ?? '',
                            'start_date' => $milestoneData['start_date'] ?? null,
                            'end_date' => $milestoneData['end_date'] ?? null,
                            'billing_percentage' => $milestoneData['billing_percentage'] ?? 0,
                            'status' => $milestoneData['status'] ?? 'P',
                            'planning_id' => $planning->id,
                        ]
                    );

                    // Procesar entregables si están presentes (dentro del foreach de milestones)
                    if (!empty($milestoneData['deliverables'])) {
                        foreach ($milestoneData['deliverables'] as $deliverableData) {
                            Log::info('Deliverable por crear:', $deliverableData);
                            $deliverable = Deliverable::updateOrCreate(
                                ['id' => $deliverableData['id'] ?? null],
                                [
                                    'name' => $deliverableData['name'] ?? '',
                                    'expected_result' => $deliverableData['expected_result'] ?? null,
                                    'actual_result' => $deliverableData['actual_result'] ?? null,
                                    'observations' => $deliverableData['observations'] ?? "",
                                    'status' => $deliverableData['status'] ?? 'A',
                                    'milestone_id' => $milestone->id,
                                    'created_by' => $deliverableData['created_by'] ?? 'E',
                                ]
                            );
                        }
                    }
                }

            }

            DB::commit(); // Confirmar transacción

            // Retornar la planificación con relaciones actualizadas
            return response()->json($planning->load('milestones.deliverables'), 200);
        } catch (ValidationException $e) {
            DB::rollBack(); // Revertir cambios
            Log::error('Error de validación:', $e->errors());
            return response()->json(['message' => 'Error de validación', 'errors' => $e->errors()], 422);
        } catch (Exception $e) {
            DB::rollBack(); // Revertir cambios
            Log::error('Error inesperado:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error inesperado', 'error' => $e->getMessage()], 500);
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

    // Obtener una planificación por compañía
    public function getPlanningByCompany($company_id)
    {
        $planning = Planning::with('milestones.deliverables')->where('company_id', $company_id)->first();

        if ($planning) {
            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar si el usuario pertenece a la compañía
            $company = $planning->company;
            $member = $company->members()->where('user_id', $user->id)->first();

            if (!$member && $user->user_type !== 'D') {
                return response()->json([
                    'message' => 'No tienes permisos para acceder a esta planificación.',
                ], 403);
            }

            return response()->json($planning, 200);
        } else {
            return response()->json([], 200);
        }
    }

    //   Eliminar un hito
    public function destroyMilestone($milestone_id)
    {
        try {
            $milestone = Milestone::findOrFail($milestone_id);
            $milestone->deliverables()->delete();
            $milestone->delete();

            return response()->json(['message' => 'Hito eliminado correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar el hito', 'error' => $e->getMessage()], 500);
        }
    }

    public function destroyDeliverable($deliverable_id)
    {
        try {
            $deliverable = Deliverable::findOrFail($deliverable_id);
            $deliverable->delete();

            return response()->json(['message' => 'Entregable eliminado correctamente'], 200);
        } catch (Exception $e) {
            return response()->json(['message' => 'Error al eliminar la entrega', 'error' => $e->getMessage()], 500);
        }
    }
}
