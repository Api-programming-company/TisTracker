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

class CompanyController extends Controller
{
    public function store(Request $request)
    {
        try {
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Verificar si el usuario ya tiene permisos de escritura en alguna compañía
            $hasWritePermission = $user->companies()
                ->wherePivot('permission', 'W')
                ->exists();

            if ($hasWritePermission) {
                return response()->json([
                    'message' => 'No puedes crear más empresas, ya eres miembro con permiso de escritura en otra compañía.'
                ], 403); // 403 Forbidden
            }

            // Validar los datos de entrada
            $validatedData = $request->validate([
                'long_name' => 'required|string|max:32|unique:companies,long_name',
                'short_name' => 'required|string|max:8|unique:companies,short_name',
                'email' => 'required|email|unique:companies,email',
                'address' => 'required|string|max:255',
                'phone' => 'required|int|max:99999999|min:10000000|unique:companies,phone',
                'academic_period_id' => 'required|exists:academic_periods,id',
            ]);

            // Obtener el periodo académico
            $academicPeriod = AcademicPeriod::findOrFail($validatedData['academic_period_id']);

            // Crear la compañía con estado inicial 'C' y sin planificación
            $company = Company::create([
                'long_name' => $validatedData['long_name'],
                'short_name' => $validatedData['short_name'],
                'email' => $validatedData['email'],
                'address' => $validatedData['address'],
                'phone' => $validatedData['phone'],
                'academic_period_id' => $academicPeriod->id,
                'status' => 'C', // Establece el estado de la compañía como 'C'
            ]);

            // Registrar al usuario autenticado como miembro de la compañía con permiso 'W' (escritura)
            $company->members()->attach($user->id, [
                'status' => 'A',  // Estado 'A' para aceptado
                'permission' => 'W'  // Permiso 'W' para escritura
            ]);

            return response()->json([
                'message' => 'Compañía creada y usuario registrado como miembro con permisos de escritura.',
                'company' => $company,
            ], 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Se ha producido un error inesperado al crear la compañía.',
                'error' => $e->getMessage(),
            ], 500);
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
                return response()->json(['message' => 'No tienes permiso para ver las compañías de este periodo académico.'], 403);
            }

            // Obtener las compañías activas asociadas al periodo académico
            $companies = Company::withCount('members')
                ->where('academic_period_id', $request->id)
                ->where('status', 'A') // Solo compañías activas
                ->get();

            return response()->json([
                'message' => 'Compañías obtenidas correctamente.',
                'companies' => $companies
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías.',
                'error' => $e->getMessage()
            ], 500);
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
                ], 422);
            }
            // Obtener el usuario autenticado
            $user = Auth::user();

            // Buscar la compañía por ID, incluyendo relaciones necesarias
            $company = Company::with([
                'planning.milestones.deliverables',
                'academicPeriod.creator',
                'members'
            ])->find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], 404);
            }

            return response()->json([
                'message' => 'Compañía obtenida correctamente.',
                'company' => $company,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener la información de la compañía.',
                'error' => $e->getMessage()
            ], 500);
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
                return response()->json(['message' => 'No tienes permiso para acceder a estas compañías.'], 403);
            }

            // Obtener las compañías pendientes
            $companies = Company::where('academic_period_id', $request->academic_period_id)
                ->where('status', 'P') // Estado Pendiente
                ->withCount('members')
                ->get();

            return response()->json([
                'message' => 'Compañías pendientes obtenidas correctamente.',
                'companies' => $companies
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías pendientes.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function acceptCompanyById($id)
    {
        try {
            // Buscar la compañía
            $company = Company::find($id);

            // Verificar si la compañía existe
            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], 404);
            }

            // Obtener el periodo académico asociado
            $academicPeriod = $company->academicPeriod;

            // Verificar si el usuario tiene permiso
            $user = auth()->user();
            if ($academicPeriod->creator->id !== $user->id) {
                return response()->json(['message' => 'No tienes permiso para aceptar esta compañía.'], 403);
            }

            // Cambiar el estado de la compañía a 'Aceptada'
            $company->status = 'A';
            $company->save();

            return response()->json([
                'message' => 'Compañía aceptada correctamente.',
                'company' => $company
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al aceptar la compañía.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index()
    {
        try {
            // Obtener todas las compañías
            $companies = Company::all();

            // Devolver una respuesta con la lista de compañías
            return response()->json([
                'message' => 'Lista de compañías obtenida correctamente.',
                'companies' => $companies
            ], 200); // 200 OK
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener la lista de compañías.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }

    public function update(Request $request, $id)
    {
        try {
            // Buscar la compañía por ID
            $company = Company::find($id);

            if (!$company) {
                return response()->json(['message' => 'No se encontró la compañía especificada.'], 404);
            }

            // Obtener el usuario autenticado
            $user = Auth::user();

            // Verificar si el usuario tiene permiso de escritura ('W') en la compañía
            $member = $company->members()->where('user_id', $user->id)->first();
            if (!$member || $member->pivot->permission !== 'W') {
                return response()->json(['message' => 'No tienes permisos de escritura para actualizar esta compañía.'], 403);
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
                $acceptedMembersCount = $company->members()->wherePivot('status', 'A')->count();

                // Verificar que al menos 3 miembros tienen estado 'A'
                if ($acceptedMembersCount < 3) {
                    return response()->json([
                        'message' => 'Debe haber al menos 3 miembros con estado "A" para aceptar la compañía.'
                    ], 400); // Bad Request
                }

                // Eliminar miembros que no tienen estado 'A'
                $company->members()->wherePivot('status', '!=', 'A')->detach();
            }

            // Si el request tiene miembros
            if ($request->has('members')) {
                // Registrar los nuevos miembros con permiso 'R'
                foreach ($request->members as $memberId) {
                    // Asignar permiso 'R' a los nuevos miembros o mantener permiso 'W' si ya lo tienen
                    $existingMember = $company->members()->where('user_id', $memberId)->first();
                    if (!$existingMember) {
                        // Si el miembro no existe, añadirlo con permiso 'R' y estado 'P' (pendiente)
                        $company->members()->attach($memberId, [
                            'permission' => 'R',
                            'status' => 'P' // Estado 'P' para pendiente
                        ]);
                    }
                }
            }

            // Actualizar la compañía con los datos validados
            $company->update($request->except('members'));

            // Obtener la lista actualizada de miembros con sus permisos y estado
            $updatedMembers = $company->members()->get(['user_id','company_user.permission', 'company_user.status']);

            return response()->json([
                'message' => 'Compañía actualizada correctamente.',
                'company' => $company,
                'members' => $updatedMembers // Incluir los miembros en la respuesta
            ], 200);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Ocurrió un error al actualizar la compañía.',
                'error' => $e->getMessage()
            ], 500);
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
                ], 404); // 404 Not Found
            }

            // Eliminar la compañía
            $company->delete();

            // Devolver una respuesta de éxito
            return response()->json([
                'message' => 'Compañía eliminada correctamente.'
            ], 200); // 200 OK

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al eliminar la compañía.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
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
                    ->where('status', 'P'); // Estado pendiente
            })
                ->with(['members' => function ($query) use ($user) {
                    // Incluir solo la información del usuario autenticado
                    $query->where('user_id', $user->id)
                        ->withPivot('created_at') // Obtener la fecha de la invitación (asumiendo 'created_at')
                        ->select('users.id as user_id', 'email');  // Renombrar 'id' para evitar ambigüedad
                }])
                ->withCount('members')
                ->get();
            $data = $companies->map(function ($company) use ($user) {
                $member = $company->members->first(); // El miembro es el usuario autenticado
                return [
                    'company' => $company,
                    'invitation_date' => $member->pivot->created_at, // Fecha de invitación
                ];
            });
            return response()->json([
                'message' => 'Compañías pendientes obtenidas correctamente.',
                'companies' => $data
            ], 200); // 200 OK
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Ocurrió un error al obtener las compañías pendientes.',
                'error' => $e->getMessage()
            ], 500); // 500 Internal Server Error
        }
    }
}
