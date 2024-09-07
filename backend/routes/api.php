<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteRegistrar;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\EstudianteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// docker-compose exec app php artisan make:model Estudiante  


Route::apiResource('posts', PostController::class);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/simon', function () {
    return 'simon hola';
});

Route::apiResource('estudiantes', EstudianteController::class);

Route::get('/test', [TestController::class, 'index']); // Ruta para GET
Route::post('/test', [TestController::class, 'nombre_funcion']); // Ruta para POST
