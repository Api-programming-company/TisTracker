<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Auth;
use App\Models\AcademicPeriod;
use App\Models\Planning;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use App\Models\CompanyUser;

/**
 * @OA\Schema(
 *     schema="Company",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="long_name", type="string", example="Nombre Largo de la Compañía"),
 *     @OA\Property(property="short_name", type="string", example="Cia"),
 *     @OA\Property(property="email", type="string", format="email", example="empresa@ejemplo.com"),
 *     @OA\Property(property="address", type="string", example="Dirección de la Compañía"),
 *     @OA\Property(property="phone", type="integer", example="12345678"),
 *     @OA\Property(property="academic_period_id", type="integer", example=1),
 *     @OA\Property(property="status", type="string", example="C"),
 * )
 */

class CompanyController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/companies",
     *     tags={"Companies"},
     *     summary="Crear una nueva compañía",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"long_name", "short_name", "email", "address", "phone", "academic_period_id"},
     *             @OA\Property(property="long_name", type="string", example="Nombre Largo de la Compañía"),
     *             @OA\Property(property="short_name", type="string", example="Cia"),
     *             @OA\Property(property="email", type="string", format="email", example="empresa@ejemplo.com"),
     *             @OA\Property(property="address", type="string", example="Dirección de la Compañía"),
     *             @OA\Property(property="phone", type="integer", example="12345678"),
     *             @OA\Property(property="academic_period_id", type="integer", example="1"),
     *         ),
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Compañía creada exitosamente",
     *         @OA\JsonContent(
     *             @OA\Property(property="message", type="string", example="Compañía creada y usuario registrado como miembro con permisos de escritura."),
     *             @OA\Property(property="company", ref="#/components/schemas/Company"),
     *         ),
     *     ),
     *     @OA\Response(response=403, description="Prohibido"),
     *     @OA\Response(response=422, description="Error de validación"),
     *     @OA\Response(response=500, description="Error interno del servidor"),
     * )
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            if ($user->companies()->wherePivot('permission', 'W')->exists()) {
                return response()->json([
                    'message' => 'Ya eres el encargado de una empresa, no puedes crear otra'
                ], Response::HTTP_FORBIDDEN);
            }

            if ($user->companies()->wherePivot('status', 'A')->exists()) {
                return response()->json([
                    'message' => 'Ya perteneces a una empresa'
                ], Response::HTTP_FORBIDDEN);
            }

            $validatedData = $request->validate([
                'long_name' => 'required|string|max:32|unique:companies,long_name',
                'short_name' => 'required|string|max:8|unique:companies,short_name',
                'email' => 'required|email|unique:companies,email',
                'address' => 'required|string|max:255',
                'phone' => 'required|int|max:99999999|min:10000000|unique:companies,phone',
                'academic_period_id' => 'required|exists:academic_periods,id',
            ]);

            $academicPeriod = AcademicPeriod::findOrFail($validatedData['academic_period_id']);
            $currentDate = now();

            if ($currentDate->lt($academicPeriod->start_date) || $currentDate->gt($academicPeriod->end_date)) {
                return response()->json([
                    'message' => 'No esta en dentro de las fechas de registro de empresas.',
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $company = Company::create([
                'long_name' => $validatedData['long_name'],
                'short_name' => $validatedData['short_name'],
                'email' => $validatedData['email'],
                'address' => $validatedData['address'],
                'phone' => $validatedData['phone'],
                'academic_period_id' => $academicPeriod->id,
                'status' => 'C',
            ]);

            $company->members()->create([
                'user_id' => $user->id,
                'status' => 'A',
                'permission' => 'W'
            ]);

            return response()->json([
                'message' => 'Compañía creada exitosamente.',
                'company' => $company,
                'user' => $user
            ], Response::HTTP_CREATED);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Se ha producido un error inesperado al crear la compañía.',
                'error' => $e->getMessage(),
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getCompaniesByAcademicPeriod(Request $request)
    {
        try {
            // Validar el ID del periodo académico
            $request->validate([
                'id' => 'required|integer|exists:academic_periods,id',
            ]);

            // Obtener el usuario autenticado
            $user = auth()->user();

            // Buscar el periodo académico
            $academicPeriod = AcademicPeriod::find($request->id);

            // Verificar si el usuario tiene permiso
            if ($academicPeriod->creator->id !== $user->id && $user->academic_period_id !== $academicPeriod->id) {
                return response()->json(['message' => 'No tienes permiso para ver las compañías de este periodo académico.'], Response::HTTP_FORBIDDEN);
            }

            // Obtener las compañías activas asociadas al periodo académico
            $companies = Company::withCount('members')
                ->where('academic_period_id', $request->id)
                ->where('status', 'A')
                ->get();

            return response()->json([
                'message' => 'Compañías obtenidas correctamente.',
                'companies' => $companies
            ], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors(),
                "request" => $request
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show($id)
    {
        try {
            $validator = Validator::make(['id' => $id], [
                'id' => 'required|integer|exists:companies,id',
            ]);

            // Si la validación falla, retornar un error 400 con los mensajes de validación
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación.',
                    'errors' => $validator->errors(),
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Buscar la compañía por ID, incluyendo relaciones necesarias
            $company = Company::with([
                'planning.milestones.deliverables',
                'academicPeriod.creator',
                'members.user'
            ])->find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], Response::HTTP_NOT_FOUND);
            }

            return response()->json([
                'message' => 'Compañía obtenida correctamente.',
                'company' => $company,
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getPendingCompanies(Request $request)
    {
        try {
            // Validar el ID del periodo académico
            $request->validate([
                'academic_period_id' => 'required|exists:academic_periods,id',
            ]);

            // Obtener el usuario autenticado
            $user = auth()->user();

            // Verificar si el usuario es el creador del periodo académico
            $academicPeriod = AcademicPeriod::find($request->academic_period_id);
            if ($academicPeriod->creator->id !== $user->id) {
                return response()->json(['message' => 'No tienes permiso para acceder a estas compañías.'], Response::HTTP_FORBIDDEN);
            }

            // Obtener las compañías pendientes
            $companies = Company::where('academic_period_id', $request->academic_period_id)
                ->where('status', 'P')
                ->withCount([
                    'members' => function ($query) {
                        $query->where('status', 'A');
                    }
                ])
                ->get();

            return response()->json([
                'message' => 'Compañías pendientes obtenidas correctamente.',
                'companies' => $companies
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías pendientes.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function acceptCompanyById($id)
    {
        try {
            // Buscar la compañía
            $company = Company::find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], Response::HTTP_NOT_FOUND);
            }

            // Obtener el periodo académico asociado
            $academicPeriod = $company->academicPeriod;

            // Verificar si el usuario tiene permiso
            $user = auth()->user();
            if ($academicPeriod->creator->id !== $user->id) {
                return response()->json(['message' => 'No tienes permiso para aceptar esta compañía.'], Response::HTTP_FORBIDDEN);
            }

            // Cambiar el estado de la compañía a 'Aceptada'
            $company->status = 'A';
            $company->save();

            return response()->json([
                'message' => 'Compañía aceptada correctamente.',
                'company' => $company
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al aceptar la compañía.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function index(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');
        $academicPeriodId = $request->input('academic_period_id');
        $status = $request->input('status');

        $query = Company::query();

        // Filtrar por academic_period_id y status
        $query->when($academicPeriodId, function ($q) use ($academicPeriodId) {
            return $q->where('academic_period_id', $academicPeriodId);
        });

        $query->when($status, function ($q) use ($status) {
            return $q->where('status', $status);
        });

        // Filtrar por el rango de fechas de los milestones
        if ($startDate && $endDate) {
            $query->whereHas('planning.milestones', function ($milestoneQuery) use ($startDate, $endDate) {
                $milestoneQuery->whereBetween('end_date', [$startDate, $endDate]);
            });
        }

        // Obtener las compañías filtradas junto con la planificación, hitos y entregables
        $companies = $query->with([
            'planning.milestones' => function ($milestoneQuery) use ($startDate, $endDate) {
                if ($startDate && $endDate) {
                    $milestoneQuery->whereBetween('end_date', [$startDate, $endDate]);
                }
                $milestoneQuery->with('deliverables');
            }
        ])->get();

        return response()->json($companies->transform(function ($company) {
            $milestone = $company->planning ? $company->planning->milestones->first() : null;
            $company->delivery_day = $milestone ? $milestone->end_date : null;
            return $company;
        }));
    }

    public function update(Request $request, $id)
    {
        try {
            // Buscar la compañía por ID
            $company = Company::find($id);

            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], Response::HTTP_NOT_FOUND);
            }

            // Obtener el usuario autenticado
            $user = Auth::user();

            // Verificar si el usuario es el creador del período académico
            $isAcademicPeriodCreator = $company->academicPeriod->creator->id === $user->id;

            // Verificar si el usuario tiene permiso de escritura ('W') en la compañía
            $companyUser = CompanyUser::where('user_id', $user->id)
                ->where('company_id', $company->id)
                ->where('permission', 'W')
                ->first();

            if (!$isAcademicPeriodCreator && !$companyUser) {
                return response()->json([
                    'message' => 'No tienes permisos para actualizar esta compañía.'
                ], Response::HTTP_FORBIDDEN);
            }

            // Validar los datos entrantes
            $request->validate([
                'long_name' => 'sometimes|required|string|max:32',
                'short_name' => 'sometimes|required|string|max:8',
                'email' => "sometimes|required|email|unique:companies,email,{$id}",
                'address' => 'sometimes|required|string|max:255',
                'phone' => 'sometimes|required|int|max:99999999|min:10000000|unique:companies,phone',
                'status' => 'sometimes|required|in:A,R,P',
                'members' => 'sometimes|required|array',
                'members.*' => 'exists:users,id'
            ]);

            // Si el estado de la compañía va a cambiar a "A", verificar las condiciones
            if ($request->status === 'A') {
                // Contar los miembros de la compañía con estado 'A'
                $acceptedMembersCount = $company->members()->where('status', 'A')->count();

                // Verificar que al menos 3 miembros tienen estado 'A'
                if ($acceptedMembersCount < 3) {
                    return response()->json([
                        'message' => 'Debe haber al menos 3 miembros con estado "A" para aceptar la compañía.'
                    ], Response::HTTP_BAD_REQUEST);
                }

                // Eliminar miembros que no tienen estado 'A'
                $company->members()->where('status', '!=', 'A')->delete();
            }

            // Si el request tiene miembros
            if ($request->has('members')) {
                // Registrar los nuevos miembros con permiso 'R'
                foreach ($request->members as $memberId) {
                    // Asignar permiso 'R' a los nuevos miembros o mantener permiso 'W' si ya lo tienen
                    $existingMember = $company->members()->where('user_id', $memberId)->first();
                    if (!$existingMember) {
                        // Si el miembro no existe, añadirlo con permiso 'R' y estado 'P' (pendiente)
                        $company->members()->create([
                            'user_id' => $memberId,
                            'permission' => 'R',
                            'status' => 'P'
                        ]);
                    }
                }
            }

            // Actualizar la compañía con los datos validados
            $company->update($request->except('members'));

            // Obtener la lista actualizada de miembros con sus permisos y estado
            // Obtener la lista actualizada de miembros con sus permisos y estado
            $updatedMembers = $company->members()->get(['user_id', 'company_users.permission', 'company_users.status']);


            return response()->json([
                'message' => 'Compañía actualizada correctamente.',
                'company' => $company,
                'members' => $updatedMembers
            ], Response::HTTP_OK);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], Response::HTTP_UNPROCESSABLE_ENTITY);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al actualizar la compañía.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function destroy($id)
    {
        try {
            // Buscar la compañía por su ID
            $company = Company::find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json([
                    'message' => 'No se encontró la compañía especificada.'
                ], Response::HTTP_NOT_FOUND);
            }

            // Eliminar la compañía
            $company->delete();

            // Devolver una respuesta de éxito
            return response()->json([
                'message' => 'Compañía eliminada correctamente.'
            ], Response::HTTP_OK);

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al eliminar la compañía.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getPendingCompaniesForUser()
    {
        // TODO optimizar
        try {
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Obtener las compañías donde el usuario está como miembro con estado 'P' (Pendiente)
            $companies = Company::whereHas('members', function ($query) use ($user) {
                $query->where('user_id', $user->id)
                    ->where('status', 'P');
            })
                ->with([
                    'members' => function ($query) use ($user) {
                        // Incluir solo la información del usuario autenticado
                        $query->where('user_id', $user->id)
                            ->withPivot('created_at')
                            ->select('users.id as user_id', 'email');
                    }
                ])
                ->withCount('members')
                ->get();
            $data = $companies->map(function ($company) use ($user) {
                $member = $company->members->first();
                return [
                    'company' => $company,
                    'invitation_date' => $member->pivot->created_at,
                ];
            });
            return response()->json([
                'message' => 'Compañías pendientes obtenidas correctamente.',
                'companies' => $data
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías pendientes.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function getEvaluationByCompanyId($id, $evaluation_type)
    {
        try {
            $validator = Validator::make(['id' => $id, 'evaluation_type' => $evaluation_type], [
                'id' => 'required|integer|exists:companies,id',
                'evaluation_type' => 'required|string|in:A,C,U'
            ]);

            // Si la validación falla, retornar un error 400 con los mensajes de validación
            if ($validator->fails()) {
                return response()->json([
                    'message' => 'Error de validación.',
                    'errors' => $validator->errors(),
                    'id' => $id,
                    'evaluation_type' => $evaluation_type
                ], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            // Obtener el usuario autenticado
            $user = Auth::user();

            // Buscar la compañía por ID, incluyendo relaciones necesarias
            $company = Company::with([
                'academicPeriod.creator',
            ])->find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], Response::HTTP_NOT_FOUND);
            }

            // Obtener la evaluación del periodo académico si existe
            $academic_period_evaluation = $company->academicPeriod->evaluations()
                ->where('evaluation_type', $evaluation_type)
                ->with(['evaluation.questions.answerOptions'])
                ->first();

            if (!$academic_period_evaluation) {
                return response()->json(['message' => 'El periodo academico no cuenta con la evaluacion.'], Response::HTTP_NOT_FOUND);
            }

            // Validar que la fecha actual esté dentro del rango de fechas de la evaluación
            $currentDate = now();
            if ($currentDate->lt($academic_period_evaluation->start_date) || $currentDate->gt($academic_period_evaluation->end_date)) {
                return response()->json(['message' => 'El periodo academico no esta dentro de la fecha de evaluacion.'], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            return response()->json([
                'message' => 'Compañía y evaluación obtenidas correctamente.',
                'company' => $company,
                'evaluation' => $academic_period_evaluation->evaluation,
                'academic_period' => $company->academicPeriod
            ], Response::HTTP_OK);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía y la evaluación.',
                'error' => $e->getMessage()
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
