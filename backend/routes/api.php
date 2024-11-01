<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\{
    AuthController,
    WebhookController,
    AcademicPeriodController,
    CompanyController,
    PlanningController,
    CompanyUserController,
    EvaluationController,
    UserEvaluationController,
    CompanyUserEvaluationControllers,
    AcademicPeriodEvaluationController
};
use Illuminate\Foundation\Auth\EmailVerificationRequest;

// Webhook
Route::post('/webhook', [WebhookController::class, 'handle']);

// Autenticación y usuario
Route::prefix('user')->group(function () {
    Route::post('register', [AuthController::class, 'register']);
    Route::get('check-email', [AuthController::class, 'checkEmail']);
    Route::post('login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);

    Route::middleware('auth:sanctum')->get('/', function (Request $request) {
        try {
            return response()->json(['user' => $request->user()]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'An error occurred while fetching the user data.',
                'message' => $e->getMessage()
            ], 500);
        }
    });
    
});

// Verificación de correo electrónico
Route::middleware('auth')->group(function () {
    Route::get('/email/verify', fn() => response()->json(['message' => 'Por favor, verifica tu correo.']))
        ->name('verification.notice');

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
        $request->fulfill();
        return response()->json(['message' => 'Correo verificado exitosamente.']);
    })->middleware('signed')->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {
        $request->user()->sendEmailVerificationNotification();
        return response()->json(['message' => 'Enlace de verificación reenviado.']);
    })->middleware('throttle:6,1')->name('verification.send');
});

// Rutas relacionadas con compañías y usuarios
Route::middleware('auth')->group(function () {
    Route::get('pending-companies', [CompanyController::class, 'getCompaniesByAcademicPeriod']);
    Route::get('student/pending-companies', [CompanyController::class, 'getPendingCompaniesForUser']);
    Route::get('academic-periods/companies/pending', [CompanyController::class, 'getPendingCompanies']);
    Route::get('evaluation-company-user/{id}', [CompanyUserController::class, 'getEvaluationByCompanyUserId']);
    Route::get('evaluation-company/{id}/{evaluation_type}', [CompanyController::class, 'getEvaluationByCompanyId']);
    Route::post('companies/accept/{id}', [CompanyController::class, 'acceptCompanyById']);

    Route::apiResource('company', CompanyController::class);
    Route::apiResource('invitations', CompanyUserController::class);
    Route::get('/student/company/{academicPeriodId}', [CompanyUserController::class, 'getStudentCompanyByAcademicPeriod']);

    //buscador por correo solo estudiante
    Route::get('student/search/{email}', [AuthController::class, 'searchStudentByEmail']);
});

// Periodos Académicos y Planificación
Route::middleware('auth')->group(function () {
    Route::get('grouped-by-teacher', [AcademicPeriodController::class, 'getAllGroupedByTeacher']);
    Route::post('enroll', [AcademicPeriodController::class, 'enroll']);
    
    Route::apiResource('academic-periods', AcademicPeriodController::class);
    Route::apiResource('plannings', PlanningController::class);
});

// Evaluaciones
Route::middleware('auth')->group(function () {
    Route::apiResource('evaluations', EvaluationController::class);
    Route::apiResource('user-evaluations', UserEvaluationController::class);
    Route::apiResource('company-user-evaluation', CompanyUserEvaluationControllers::class);
    Route::apiResource('academic-period-evaluations', AcademicPeriodEvaluationController::class);
    Route::get('grades', [AuthController::class, 'getGrades']);
});