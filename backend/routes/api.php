<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailVerificationController;


Route::post('user/register', [AuthController::class, 'register']);
Route::get('user/check-email', [AuthController::class, 'checkEmail']);
Route::post('user/verify-email', [EmailVerificationController::class, 'verifyEmail']);
Route::post('user/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    
    return response()->json([
        'user' => [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'user_type' => $user->user_type === 'E' ? 'estudiante' : 'docente',
        ]
    ]);
});


Route::get('/simon', function () {
    return response()->json(['message' => 'hola simon']);
});
