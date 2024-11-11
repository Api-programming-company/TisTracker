<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Notifications\EvaluationAssigned;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!api).*$');

Route::get('/', function () {
    return view('welcome');
});
Auth::routes(['verify' => true]);

Route::get('/home', function() {
    return view('emails.dashboard');
});


Route::get('/preview-notification', function () {
    // Datos de prueba
    $evaluationName = 'Evaluación de Prueba';
    $evaluationType = 'Autoevaluación';
    $startDate = now()->format('Y-m-d H:i:s');
    $endDate = now()->addDays(7)->format('Y-m-d H:i:s');
    $teacherName = 'Docente Ejemplo';
    $studentName = 'Estudiante Ejemplo';

    // Crear la instancia de notificación con los parámetros requeridos
    $notification = new EvaluationAssigned(
        $evaluationName,
        $evaluationType,
        $startDate,
        $endDate,
        $teacherName,
        $studentName
    );

    // Usuario ficticio para previsualización
    $notifiable = App\Models\User::first();

    // Retorna la notificación como vista para previsualización
    return $notification->toMail($notifiable);
});
