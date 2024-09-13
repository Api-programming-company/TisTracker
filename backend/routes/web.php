<?php

use Illuminate\Support\Facades\Route;
use TCG\Voyager\Facades\Voyager;

Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

/*
Route::get('/', function () {
    return view('welcome');
});
*/

Route::get('/{any}', function () {
    return view('index');
})->where('any', '^(?!api/)(?!admin).*');
