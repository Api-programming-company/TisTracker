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

Route::get('/', function () {
    return view('welcome');
});
Auth::routes(['verify' => true]);

Route::get('/home', function() {
    return view('emails.dashboard');
});


Route::get('/preview-notification', function () {
    $notification = new EvaluationAssigned(
        'Evaluación de Prueba',
        'Autoevaluación',
        now()->format('d/m/Y H:i'),
        now()->addDays(7)->format('d/m/Y H:i')
    );

    // Usuario ficticio
    $notifiable = App\Models\User::first();

    return $notification->toMail($notifiable)->render();
});
