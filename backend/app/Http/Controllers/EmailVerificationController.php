<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Exception;

class EmailVerificationController extends Controller
{
    public function verifyEmail(Request $request)
    {
        try {
            // Validar el request
            $request->validate([
                'token' => 'required|string',
            ]);

            // Buscar la verificación con el token
            $verification = EmailVerification::where('token', $request->token)
                ->where('expires_at', '>', now())
                ->first();

            // Verificar si el token es válido
            if (!$verification) {
                return response()->json(['error' => 'Código de verificación inválido o expirado.'], 400);
            }

            // Encontrar el usuario y verificar el email
            $user = User::find($verification->user_id);
            if ($user) {
                $user->email_verified_at = now();
                $user->save();
                $verification->delete(); // Eliminar el token después de la verificación

                return response()->json(['message' => 'Correo electrónico verificado exitosamente.'], 200);
            } else {
                return response()->json(['error' => 'Usuario no encontrado.'], 404);
            }
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->errors()
            ], 422); // Código de estado HTTP para Unprocessable Entity
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Ocurrió un error inesperado.',
                'message' => $e->getMessage()
            ], 500); // Código de estado HTTP para Internal Server Error
        }
    }
}
