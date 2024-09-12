<?php

namespace App\Http\Controllers\Api;

use App\Models\Docente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class DocenteController extends Controller
{
    public function store(Request $request) 
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellidos' => 'required|string|max:255',
            'email' => 'required|email|unique:docentes,email',
            'password' => 'required|string|min:8|confirmed', 
        ]);

        $docente = Docente::create([
            'nombre' => $validatedData['nombre'],
            'apellidos' => $validatedData['apellidos'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        return response()->json($docente, 201); 
    }

    public function show($id)
    {
        $docente = Docente::findOrFail($id);
        return response()->json($docente);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'apellidos' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:docentes,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed', 
        ]);

        $docente = Docente::findOrFail($id);

        if ($request->has('password')) {
            $validatedData['password'] = Hash::make($validatedData['password']); 
        }

        $docente->update($validatedData);
        return response()->json($docente, 200);
    }

    public function index() 
    {
        $docentes = Docente::all(); 
        return response()->json($docentes);
    }
}
