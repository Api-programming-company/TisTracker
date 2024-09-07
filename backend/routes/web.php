<?php

use Illuminate\Support\Facades\Route;

/*
Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});
Route::get('/', function () {
    return view('welcome');
});
*/

Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!api/).*$'); // Las peticiones a la api no se redirigen al frontend
