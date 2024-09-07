<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class TestController extends Controller
{
    public function index()
    {
        return response()->json(['message' => 'endpoint get uwu']);
    }
    public function nombre_funcion(Request $request)
    {
        // datos enviados en el body de la solicitud
        $data = $request->all();
        Log::info('Datos recibidos:', $request->all());

        return response()->json([
            'message' => 'POST request received!',
            'data' => $data,
        ]);
    }
}
