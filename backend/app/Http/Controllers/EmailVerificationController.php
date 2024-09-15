<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmailVerification;
use App\Models\User;
use Illuminate\Validation\ValidationException;
use Exception;
use Illuminate\Support\Facades\Log;
class EmailVerificationController extends Controller
{
    public function verifyEmail(Request $request)
    {
        Log::info('Verificación de correo electrónico iniciada', ['request' => $request->all()]);

        try {
            // Validar el request
            $request->validate([
                'token' => 'required|string',
            ]);

            Log::info('Validación del request exitosa', ['token' => $request->token]);

            // Buscar la verificación con el token
            $verification = EmailVerification::where('token', $request->token)
                ->where('expires_at', '>', now())
                ->first();

            if (!$verification) {
                Log::warning('Código de verificación inválido o expirado', ['token' => $request->token]);
                return response()->json(['error' => 'Código de verificación inválido o expirado.'], 400);
            }

            Log::info('Token válido encontrado', ['verification' => $verification]);

            // Encontrar el usuario y verificar el email
            $user = User::find($verification->user_id);
            if ($user) {
                $user->email_verified_at = now();
                $user->save();
                $verification->delete(); // Eliminar el token después de la verificación

                Log::info('Correo electrónico verificado exitosamente', ['user_id' => $user->id]);

                return response()->json(['message' => 'Correo electrónico verificado exitosamente.'], 200);
            } else {
                Log::warning('Usuario no encontrado', ['user_id' => $verification->user_id]);
                return response()->json(['error' => 'Usuario no encontrado.'], 404);
            }
        } catch (ValidationException $e) {
            Log::error('Error de validación', ['errors' => $e->errors()]);
            return response()->json([
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            Log::error('Error inesperado', ['message' => $e->getMessage()]);
            return response()->json([
                'error' => 'Ocurrió un error inesperado.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
}