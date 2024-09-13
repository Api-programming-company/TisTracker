<?php

namespace App\Http\Controllers\Api;

use App\Models\Estudiante;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller; // Importa la clase Controller correctamente



class EstudianteController extends Controller
{
    public function index()// Obtener todos los estudiantes
    {
         $Estudiante = Estudiante::all(); 
         return response()->json($Estudiante); //devuelve un json con todos los estudiantes
        
    }

    public function store(Request $request)// Crear un nuevo estudiante :D
    {
        $validatedData = $request->validate([
            'nombre' => 'required|string|max:255',
            'apellido' => 'required|string|max:255',
            'email' => 'required|email|unique:estudiantes,email',
            'codSis' => 'required|integer|unique:estudiantes,codSis',
            'password' => 'required|string|min:8', 
        ]);

        $estudiante = Estudiante::create($validatedData);
        return response()->json($estudiante, 201);
    }
    public function show($id) // Obtener un estudiante específico
    {
        $estudiante = Estudiante::findOrFail($id);
        return response()->json($estudiante);
    }
    public function update(Request $request, $id) // Actualizar un estudiante específico
    {
        $validatedData = $request->validate([
            'nombre' => 'sometimes|required|string|max:255',
            'apellido' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:estudiantes,email,' . $id,
            'codSis' => 'sometimes|required|integer|unique:estudiantes,codSis,' . $id,
            'password' => 'sometimes|required|string|min:8',
        ]);

        $estudiante = Estudiante::findOrFail($id);
        $estudiante->update($validatedData);
        return response()->json($estudiante, 200);
    }
    public function destroy($id) // Eliminar un estudiante específico
    {
        Estudiante::destroy($id);
        return response()->json(null, 204);
    }
   
}

//Rutas RESTful
// GET /api/estudiante - Para obtener todos los estudiantes (index)
// POST /api/estudiante - Para crear un nuevo estudiante (store)
// GET /api/estudiante/{id} - Para obtener un estudiante específico (show)
// PUT/PATCH /api/estudiante/{id} - Para actualizar un estudiante específico (update)
// DELETE /api/estudiante/{id} - Para eliminar un estudiante específico (destroy)