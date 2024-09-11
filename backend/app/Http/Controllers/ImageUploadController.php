<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageUploadController extends Controller
{
    public function upload(Request $request)
    {
        // Validar la imagen
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // 2MB máximo
        ]);

        // Almacenar la imagen en la carpeta uploads
        $path = $request->file('image')->store('uploads', 'public');

        // Obtener la URL de la imagen
        $url = Storage::url($path);

        return response()->json([
            'message' => 'Imagen subida correctamente',
            'url' => "holaa",
        ]);
    }
}
