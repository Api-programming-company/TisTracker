<?php

namespace App\Http\Controllers\Api;

use App\Models\Docente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

class DocenteController extends Controller
{
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:docente,email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $docente = Docente::create([
            'first_name' => $validatedData['first_name'],
            'last_name' => $validatedData['last_name'],
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
            'first_name' => 'sometimes|required|string|max:255',
            'last_name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:docente,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $docente = Docente::findOrFail($id);

        if ($request->has('password')) {
            $validatedData['password'] = Hash::make($validatedData['password']);
        }

        $docente->update($validatedData);
        return response()->json($docente, 200);
    }

    public function destroy($id)
    {
        $docente = Docente::findOrFail($id);
        $docente->delete();
        return response()->json(['message' => 'Docente eliminado correctamente'], 200);
    }

    public function index()
    {
        $Docente = Docente::all();
        return response()->json($Docente);
    }

    public function checkEmail(Request $request)
    {
        $email = $request->query('email');
        $exists = Docente::where('email', $email)->exists();

        if ($exists) {
            return response()->json(['message' => 'El correo ya esta registrado.'], 409);
        } else {
            return response()->json(['message' => 'El correo esta disponible.'], 200);
        }
    }
}
