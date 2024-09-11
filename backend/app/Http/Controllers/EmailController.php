<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Mail;
use App\Mail\TestEmail;
use Illuminate\Http\Request;

class EmailController extends Controller
{
    public function sendTestEmail(Request $request)
    {
        $data = [
            'title' => 'Correo de prueba',
            'body' => 'Este es un correo de prueba enviado desde Laravel.'
        ];

        Mail::to('jhondeycraft776@gmail.com')->send(new TestEmail($data));

        return response()->json(['message' => 'Correo enviado correctamente']);
    }
}
