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
    return $request->user();
});

