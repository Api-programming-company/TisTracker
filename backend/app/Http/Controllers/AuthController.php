<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\EmailVerification;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use App\Rules\ValidarCorreoEstudiante;
use App\Rules\ValidarCorreoDocente;
use App\Rules\ValidarPassword;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Handle user registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function register(Request $request)
    {
        try {
            // Validar los datos de registro
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => ['required', 'email', 'unique:users,email', $this->getEmailValidationRule($request->user_type)],
                'password' => ['required', 'string', 'min:8', 'confirmed', new ValidarPassword],
                'user_type' => 'required|in:E,D',
            ], [], User::getFieldLabels());

            // Crear nuevo usuario
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => $request->user_type,
            ]);

            // Enviar notificación de verificación de correo nativa
            $user->sendEmailVerificationNotification();

            return response()->json([
                'message' => 'Registro exitoso. Por favor, revisa tu correo para verificar tu cuenta.'
            ], 201);
        } catch (ValidationException $e) {
            // Manejo de errores de validación
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            // Manejo de otros errores
            return response()->json([
                'message' => 'Se ha producido un error inesperado',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Handle login and issue a token.
     */
    public function login(Request $request)
    {
        try {
            // Validar los datos de inicio de sesión
            $request->validate([
                'email' => 'required|email',
                'password' => 'required',
            ]);

            // Intentar autenticar al usuario
            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json([
                    'message' => 'Credenciales incorrectas'
                ], 401); // Error de credenciales incorrectas
            }

            // Si se autentica correctamente, regenerar la sesión
            $request->session()->regenerate();

            // Obtener la información del usuario autenticado
            $user = Auth::user();

            // Retornar la información del usuario
            return response()->json([
                'user' => $user
            ], 200);
        } catch (ValidationException $e) {
            // Manejo de errores de validación
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422); // Error de validación
        } catch (Exception $e) {
            // Manejo de otros errores
            return response()->json([
                'message' => 'Se ha producido un error inesperado',
                'error' => $e->getMessage()
            ], 500); // Error general
        }
    }
    /**
     * Handle logout and revoke token.
     */
    public function logout(Request $request)
    {
        try {
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return response()->json(['message' => 'Sesión cerrada']);
        } catch (Exception $e) {
            // Manejo de otros errores
            return response()->json([
                'message' => 'Se ha producido un error inesperado',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * verifica email.
     */
    public function checkEmail(Request $request)
    {
        try {
            // Validar que se ha proporcionado un correo electrónico
            $request->validate([
                'email' => 'required|email',
            ]);

            // Buscar si el correo electrónico existe en la base de datos
            $exists = User::where('email', $request->email)->exists();

            return response()->json([
                'exists' => $exists
            ]);
        } catch (ValidationException $e) {
            // Manejo de errores de validación
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            // Manejo de otros errores
            return response()->json([
                'message' => 'Se ha producido un error inesperado',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    protected function getEmailValidationRule($userType)
    {
        try {
            if ($userType === 'E') {
                return new ValidarCorreoEstudiante;
            }

            if ($userType === 'D') {
                return new ValidarCorreoDocente;
            }

            return '';
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Se ha producido un error inesperado al validar el tipo de correo',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    public function searchStudentByEmail($email)
    {
        try {
            // Validar que se ha proporcionado un correo electrónico válido
            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                return response()->json([
                    'message' => 'El correo electrónico proporcionado no es válido.'
                ], 422); // 422 Unprocessable Entity
            }

            // Obtener el usuario autenticado
            $currentUser = auth()->user();

            // Verificar si el usuario está intentando buscarse a sí mismo
            if ($currentUser->email === $email) {
                return response()->json([
                    'message' => 'No puedes buscarte a ti mismo.'
                ], 403); // 403 Forbidden
            }

            // Buscar si el correo electrónico existe y pertenece a un estudiante
            $student = User::where('email', $email)
                ->where('user_type', 'E') // 'E' para estudiantes
                ->first();

            // Verificar si se encontró el estudiante
            if (!$student) {
                return response()->json([
                    'message' => 'No se encontró ningún estudiante con el correo especificado.'
                ], 404); // 404 Not Found
            }

            // Devolver la información del estudiante
            return response()->json([
                'message' => 'Estudiante encontrado.',
                'student' => $student
            ], 200); // 200 OK

        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Se ha producido un error inesperado',
                'error' => $e->getMessage()
            ], 500); // Error general
        }
    }

    public function getGrades(Request $request)
    {
        try {
            $academicPeriodId = $request->input('academic_period_id');
            $limit = $request->input('limit', 10); // Default limit to 10 if not provided

            // TODO optimizar
            $query = User::query()
                ->leftJoin('user_evaluations', 'users.id', '=', 'user_evaluations.evaluatee_company_user_id')
                ->select('users.id', 'users.email', \DB::raw('COALESCE(AVG(user_evaluations.score), 0) as user_evaluations_score'))
                ->groupBy('users.id', 'users.email') 
                ->groupBy('users.id');

            if ($academicPeriodId) {
                $query->where('academic_period_id', $academicPeriodId);
            }

            // Obtener las calificaciones del estudiante con límite
            $grades = $query->limit($limit)->get();

            // Devolver las calificaciones
            return response()->json([
                'grades' => $grades
            ], 200); // 200 OK
        } catch (Exception $e) {
            // Manejar otros errores
            return response()->json([
                'message' => 'Se ha producido un error inesperado',
                'error' => $e->getMessage()
            ], 500); // Error general
        }
    }
}