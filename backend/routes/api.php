<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
//use App\Http\Controllers\EmailVerificationController;
use App\Http\Controllers\AcademicPeriodController;
use App\Http\Controllers\CompanyController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use App\Http\Controllers\PlanningController;
use App\Http\Controllers\CompanyUserController;
use App\Http\Controllers\WebhookController;
use App\Http\Controllers\EvaluationController;
use App\Http\Controllers\UserEvaluationController;

Route::post('/webhook', [WebhookController::class, 'handle']);

Route::post('user/register', [AuthController::class, 'register']);
Route::get('user/check-email', [AuthController::class, 'checkEmail']);
//Route::post('user/verify-email', [EmailVerificationController::class, 'verifyEmail']); no es necesario
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
// Ruta para mostrar la notificación de verificación de email
Route::get('/email/verify', function () {
    return response()->json(['message' => 'Por favor, verifica tu correo.']);
})->middleware('auth')->name('verification.notice');

// Ruta que maneja la verificación de email desde el enlace
Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
    return response()->json(['message' => 'Correo verificado exitosamente.']);
})->middleware(['auth', 'signed'])->name('verification.verify');

// Ruta para reenviar el enlace de verificación
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Enlace de verificación reenviado.']);
})->middleware(['auth', 'throttle:6,1'])->name('verification.send');
// docente
Route::middleware('auth')->group(function () {
    Route::get('pending-companies', [CompanyController::class, 'getCompaniesByAcademicPeriod']);


    Route::get('grouped-by-teacher', [AcademicPeriodController::class, 'getAllGroupedByTeacher']);
    Route::post('enroll', [AcademicPeriodController::class, 'enroll']);

    Route::apiResource('company', CompanyController::class);
    Route::get('student/pending-companies', [CompanyController::class, "getPendingCompaniesForUser"]);


   
    Route::get('academic-periods/companies/pending', [CompanyController::class, 'getPendingCompanies']);
    Route::post('companies/accept/{id}', [CompanyController::class, 'acceptCompanyById']);
    Route::apiResource('invitations', CompanyUserController::class);

    // Ruta de planificacion
    Route::apiResource('plannings', PlanningController::class);
    //buscador por correo solo estudiante
    Route::get('student/search/{email}', [AuthController::class, 'searchStudentByEmail']);
    Route::get('/student/company/{academicPeriodId}', [CompanyUserController::class, 'getStudentCompanyByAcademicPeriod']);
    Route::apiResource('academic-periods', AcademicPeriodController::class);
    


});

//ruta de evaluacion 
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('evaluations', EvaluationController::class);
});
//evaluar a mi grupo empresa
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('Userevaluations', UserEvaluationController::class);
});