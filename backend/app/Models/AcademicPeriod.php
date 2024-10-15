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
