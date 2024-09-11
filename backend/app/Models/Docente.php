<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Docente extends Model
{
    use HasFactory;
    protected $table = 'docente';
    protected $fillable = [
        'nombre',
        'apellidos',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
    ];
}
