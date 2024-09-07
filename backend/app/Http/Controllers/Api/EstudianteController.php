<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;


class EstudianteController extends Controller
{
    public function index()
    {
        $Estuduante = Estudiante::all();
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|email|unique:estudiantes,email',
        ]);

        $estudiante = Estudiante::create($validatedData);
        return response()->json($estudiante, 201);
    }
   
}
