<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EmailVerification;
use App\Models\User;

class EmailVerificationController extends Controller
{
    public function verifyEmail(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
        ]);

        $verification = EmailVerification::where('token', $request->token)
            ->where('expires_at', '>', now())
            ->first();

        if (!$verification) {
            return response()->json(['error' => 'Código de verificación inválido o expirado.'], 400);
        }

        $user = User::find($verification->user_id);
        $user->email_verified_at = now();
        $user->save();

        $verification->delete(); // Elimina el token después de la verificación

        return response()->json(['message' => 'Correo electrónico verificado exitosamente.'], 200);
    }
}
