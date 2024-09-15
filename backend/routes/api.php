<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Ruta para registrar un nuevo usuario
Route::post('/register', [AuthController::class, 'register']);

// Ruta para iniciar sesión (login)
Route::post('/login', [AuthController::class, 'login']);

// Ruta para cerrar sesión (logout), protegida por Sanctum
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
