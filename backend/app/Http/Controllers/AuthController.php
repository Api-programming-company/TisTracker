<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            // Validar los datos del request
            $request->validate([
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);
    
            // Crear el usuario
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);
    
            // Retornar respuesta exitosa
            return response()->json(['message' => 'User registered successfully'], 201);
        } catch (ValidationException $e) {
            // Capturar errores de validación y devolver en formato JSON
            return response()->json([
                'errors' => $e->errors()
            ], 422); // Código de estado HTTP para Unprocessable Entity
        } catch (\Exception $e) {
            // Capturar cualquier otra excepción
            return response()->json([
                'error' => 'An unexpected error occurred.'
            ], 500); // Código de estado HTTP para Internal Server Error
        }
    }


    public function login(Request $request)
    {
        // Validar email y password
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        // Buscar al usuario por email
        $user = User::where('email', $request->email)->first();

        // Verificar si las credenciales son incorrectas
        if (! $user || ! Hash::check($request->password, $user->password)) {
            return response()->json([
                'error' => 'Las credenciales son incorrectas.'
            ], 401);
        }

        // Crear un token de acceso para el usuario autenticado
        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json(['token' => $token], 200);
    }

    public function logout(Request $request)
    {
        // Revocar todos los tokens del usuario autenticado
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out'], 200);
    }

    public function user(Request $request)
    {
        // Retornar la información del usuario autenticado
        return response()->json($request->user());
    }
}
