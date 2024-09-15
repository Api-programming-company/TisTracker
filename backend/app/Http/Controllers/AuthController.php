<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\EmailVerification;
use App\Mail\VerifyEmail;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

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
        // Validar los datos de registro
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
            'user_type' => 'required|in:E,D', // Validar que sea 'E' o 'D'
        ]);

        // Crear nuevo usuario
        $user = User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type, // Asignar user_type
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
        // Crear un token para el nuevo usuario
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'user_type' => $user->user_type === 'E' ? 'Estudiante' : 'Docente', // Devolver el tipo de usuario
            ]
        ], 201);
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
}
