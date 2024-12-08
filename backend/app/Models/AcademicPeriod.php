<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AcademicPeriod extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'description',
        'user_id',
        'company_creation_start_date', 
        'company_creation_end_date',   
        'planning_start_date',         
        'planning_end_date',  
        'evaluation_start_date',         
        'evaluation_end_date',         
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'academic_period_id');
    }

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function companies()
    {
        return $this->hasMany(Company::class);
    }

    public function evaluations()
    {
        return $this->hasMany(AcademicPeriodEvaluation::class, 'academic_period_id');
    }
}
