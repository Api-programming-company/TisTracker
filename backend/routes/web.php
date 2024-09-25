<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;

Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!api).*$');

Route::get('/', function () {
    return view('welcome');
});
Auth::routes(['verify' => true]);

Route::get('/home', function () {
    return view('emails.dashboard');
});
