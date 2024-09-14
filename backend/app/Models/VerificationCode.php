<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VerificationCode extends Model
{
    use HasFactory;

    // Definir la tabla asociada al modelo
    protected $table = 'verification_code';

    // Definir los atributos que se pueden asignar masivamente
    protected $fillable = [
        'email',
        'code',
        'expires_at',
    ];

    // Definir los atributos que deben ser cast a un tipo específico
    protected $casts = [
        'expires_at' => 'datetime',
    ];
}
