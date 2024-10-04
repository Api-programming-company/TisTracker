<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CompanyUserScore extends Model
{
    protected $table = 'company_user_score';
    
    use HasFactory;

    protected $fillable = ['user_id', 'company_id', 'score'];

    protected $casts = [
        'score' => 'integer',
    ];
}
