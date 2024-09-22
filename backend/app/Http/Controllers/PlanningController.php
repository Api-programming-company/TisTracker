<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Planning;
use App\Models\Milestone;
use App\Models\Deliverable;
use App\Models\CompanyUser;
use App\Models\Company;
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
        // Obtener todas las planificaciones con hitos y entregables
        $plannings = Planning::with('milestones.deliverables')->get(); 
        return response()->json($plannings);
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
        /// Validar los datos de la planificación
        $validatedData = $request->validate([
            'nombre_largo' => 'required|string|max:255',
            'nombre_corto' => 'required|string|max:255',
            'correo' => 'required|email',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'consultor_tis' => 'required|string|max:255',
            'gestion' => 'required|string|max:255',
            'planificacion' => 'required|array',
            'planificacion.*.nombre_hito' => 'required_with:planificacion|string|max:255',
            'planificacion.*.fecha_ini' => 'required_with:planificacion|date',
            'planificacion.*.fecha_entrega' => 'required_with:planificacion|date',
            'planificacion.*.cobro' => 'required_with:planificacion|numeric',
            'planificacion.*.hu' => 'sometimes|array',
            'planificacion.*.hu.*.nombre_hu' => 'required_with:planificacion.hu|string|max:255',
            'planificacion.*.hu.*.responsable' => 'required_with:planificacion.hu|string|max:255',
            'planificacion.*.hu.*.objetivo' => 'required_with:planificacion.hu|string',
            'integrantes' => 'sometimes|array',
            'integrantes.*.id' => 'required|exists:users,id',
        ]);

        // Crear la compañía
        $company = Company::create([
            'nombre_largo' => $validatedData['nombre_largo'],
            'nombre_corto' => $validatedData['nombre_corto'],
            'correo' => $validatedData['correo'],
            'direccion' => $validatedData['direccion'],
            'telefono' => $validatedData['telefono'],
            'consultor_tis' => $validatedData['consultor_tis'],
            'gestion' => $validatedData['gestion'],
        ]);

        // Crear la planificación
        $planning = Planning::create([
            'name' => $validatedData['gestion'], // Asumiendo que 'gestion' es el nombre de la planificación
            'company_id' => $company->id
        ]);

        // Asignar integrantes a la compañía
        if (isset($validatedData['integrantes'])) {
            foreach ($validatedData['integrantes'] as $integrante) {
                CompanyUser::create([
                    'company_id' => $company->id,
                    'user_id' => $integrante['id'],
                ]);
            }
        }

        // Crear los hitos
        foreach ($validatedData['planificacion'] as $milestoneData) {
            $milestone = new Milestone([
                'name' => $milestoneData['nombre_hito'],
                'start_date' => $milestoneData['fecha_ini'],
                'end_date' => $milestoneData['fecha_entrega'],
                'billing_percentage' => $milestoneData['cobro']
            ]);
            $planning->milestones()->save($milestone);

            // Crear los entregables
            if (isset($milestoneData['hu'])) {
                foreach ($milestoneData['hu'] as $deliverableData) {
                    $deliverable = new Deliverable($deliverableData);
                    $milestone->deliverables()->save($deliverable);
                }
            }
        }

        return response()->json($planning->load('milestones.deliverables'), 201);
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
        // Mostrar una planificación específica con hitos y entregables
        $planning = Planning::with('milestones.deliverables')->findOrFail($id);
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
            'nombre_largo' => 'sometimes|required|string|max:255',
            'nombre_corto' => 'sometimes|required|string|max:255',
            'correo' => 'sometimes|required|email',
            'direccion' => 'sometimes|required|string|max:255',
            'telefono' => 'sometimes|required|string|max:20',
            'consultor_tis' => 'sometimes|required|string|max:255',
            'gestion' => 'sometimes|required|string|max:255',
            'planificacion' => 'sometimes|array',
            'planificacion.*.id' => 'sometimes|exists:milestones,id',
            'planificacion.*.nombre_hito' => 'required_with:planificacion|string|max:255',
            'planificacion.*.fecha_ini' => 'required_with:planificacion|date',
            'planificacion.*.fecha_entrega' => 'required_with:planificacion|date',
            'planificacion.*.cobro' => 'required_with:planificacion|numeric',
            'planificacion.*.hu' => 'sometimes|array',
            'planificacion.*.hu.*.id' => 'sometimes|exists:deliverables,id',
            'planificacion.*.hu.*.nombre_hu' => 'required_with:planificacion.hu|string|max:255',
            'planificacion.*.hu.*.responsable' => 'required_with:planificacion.hu|string|max:255',
            'planificacion.*.hu.*.objetivo' => 'required_with:planificacion.hu|string',
        ]);

        $planning = Planning::findOrFail($id);
        $planning->update($validatedData);

        // Actualizar hitos y entregables
        if (isset($validatedData['planificacion'])) {
            foreach ($validatedData['planificacion'] as $milestoneData) {
                $milestone = Milestone::updateOrCreate(
                    ['id' => $milestoneData['id'] ?? null],
                    [
                        'name' => $milestoneData['nombre_hito'],
                        'start_date' => $milestoneData['fecha_ini'],
                        'end_date' => $milestoneData['fecha_entrega'],
                        'billing_percentage' => $milestoneData['cobro'],
                        'planning_id' => $planning->id,
                    ]
                );

                if (isset($milestoneData['hu'])) {
                    foreach ($milestoneData['hu'] as $deliverableData) {
                        Deliverable::updateOrCreate(
                            ['id' => $deliverableData['id'] ?? null],
                            array_merge($deliverableData, ['milestone_id' => $milestone->id])
                        );
                    }
                }
            }
        }

        return response()->json($planning->load('milestones.deliverables'), 200);
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
        $planning->milestones()->each(function ($milestone) {
            $milestone->deliverables()->delete();
            $milestone->delete();
        });
        $planning->delete();

        return response()->json(['message' => 'Planning, Milestones y Deliverables eliminados correctamente'], 200);
    }
}
