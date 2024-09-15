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
                'email' => ['required', 'email', 'unique:users,email'],#, $this->getEmailValidationRule($request->user_type)],
                'password' => ['required', 'string', 'min:8', 'confirmed'],#, new ValidarPassword($request->first_name, $request->last_name)],
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

            // Guardar el token en la base de datos
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
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Manejo de errores de validación
            return response()->json([
                'message' => 'Error de validación',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
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
        // Validar los datos de inicio de sesión
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Buscar el usuario por email
        $user = User::where('email', $request->email)->first();

        // Verificar que las credenciales sean correctas
        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Las credenciales no coinciden con nuestros registros.'
            ], 401);
        }

        // Crear un token para el usuario
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'user_type' => $user->user_type === 'E' ? 'Estudiante' : 'Docente',
            ]
        ]);
    }
    /**
     * Handle logout and revoke token.
     */
    public function logout(Request $request)
    {
        // Revocar el token actual
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada correctamente.'
        ]);
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
