<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\AcademicPeriodController;
use App\Http\Controllers\CompanyController;


Route::post('user/register', [AuthController::class, 'register']);
Route::get('user/check-email', [AuthController::class, 'checkEmail']);
Route::post('user/verify-email', [EmailVerificationController::class, 'verifyEmail']);
Route::post('user/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('user/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->get('user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'user' => [
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'user_type' => $user->user_type === 'E' ? 'estudiante' : 'docente',
            'academic_period_id' => $user->academic_period_id,
        ]
    ]);
});

// docente
Route::middleware('auth')->group(function () {
    Route::get('docente/academic-periods', [AcademicPeriodController::class, 'index']);
    Route::post('docente/academic-periods', [AcademicPeriodController::class, 'store']);
    Route::get('academic-periods/grouped-by-teacher', [AcademicPeriodController::class, 'getAllGroupedByTeacher']);
    Route::post('academic-periods/enroll', [AcademicPeriodController::class, 'enroll']);
    Route::post('company', [CompanyController::class, 'store']);
    Route::get('/academic-periods/companies', [CompanyController::class, 'getCompaniesByAcademicPeriod']);
});

Route::get('/simon', function () {
    return response()->json(['message' => 'hola simon']);
});
