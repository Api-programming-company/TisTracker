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
                'email' => ['required', 'email', 'unique:users,email',  $this->getEmailValidationRule($request->user_type)],
                'password' => ['required', 'string', 'min:8', 'confirmed', new ValidarPassword($request->first_name, $request->last_name)],
                'user_type' => 'required|in:E,D', // Validar que sea 'E' o 'D'
            ]);

            // Crear nuevo usuario
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'user_type' => $request->user_type,
            ]);

            // Crear el token de verificación
            $token = Str::random(32);

            // Guardar el token en la base de datos+

            EmailVerification::create([
                'user_id' => $user->id,
                'token' => $token,
                'expires_at' => now()->addMinutes(15),
            ]);

            // Enviar el correo de verificación
            Mail::to($user->email)->send(new VerifyEmail($token, $user));


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
                'user' => [
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'user_type' => $user->user_type === 'E' ? 'estudiante' : 'docente',
                    'academic_period_id' => $user->academic_period_id,
                ]
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
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Sesión cerrada']);
        // Revocar el token actual
        // $request->user()->currentAccessToken()->delete();

        //return response()->json([
        //    'message' => 'Sesión cerrada correctamente.'
        //]);
    }

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
        if ($userType === 'E') {
            return new ValidarCorreoEstudiante;
        }

        if ($userType === 'D') {
            return new ValidarCorreoDocente;
        }

        return '';
    }
}
