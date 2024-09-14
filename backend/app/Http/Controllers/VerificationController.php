<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use App\Models\VerificationCode;

class VerificationController extends Controller
{
    public function sendVerificationCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $email = $request->input('email');

        // Generar un código de registro de 6 números aleatorios
        $code = rand(100000, 999999);

        // Guardar el código en la base de datos con una fecha de expiración (opcional)
        $verificationCode = new VerificationCode();
        $verificationCode->email = $email;
        $verificationCode->code = $code;
        $verificationCode->expires_at = now()->addMinutes(15); // Código válido por 15 minutos
        $verificationCode->save();

        // Enviar el correo electrónico
        Mail::send('emails.verification', ['code' => $code], function ($message) use ($email) {
            $message->to($email)
                    ->subject('Código de Verificación');
        });

        return response()->json(['message' => 'Código de verificación enviado correctamente.'], 200);
    }
    
    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'code' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $email = $request->input('email');
        $code = $request->input('code');

        $verificationCode = VerificationCode::where('email', $email)
            ->where('code', $code)
            ->where('expires_at', '>', now())
            ->first();

        if ($verificationCode) {
            return response()->json(['message' => 'Código verificado correctamente.'], 200);
        } else {
            return response()->json(['error' => 'Código de verificación inválido o expirado.'], 400);
        }
    }
}
