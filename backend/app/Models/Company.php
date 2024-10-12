<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\AcademicPeriod;
use App\Models\CompanyUserEvaluation;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'long_name',
        'short_name',
        'email',
        'address',
        'phone',
        'academic_period_id',
        'status',
    ];

    public function academicPeriod()
    {
        return $this->belongsTo(AcademicPeriod::class);
    }
    public function members()
    {
        return $this->hasMany(CompanyUser::class);
    }

    public function planning()
    {
        return $this->hasOne(Planning::class);
    }

    public function userScores()
    {
        return $this->belongsToMany(User::class, 'company_user_score')
            ->using(CompanyUserEvaluation::class)
            ->withPivot('score')
            ->withTimestamps();
    }
    public function evaluations()
    {
        return $this->hasMany(CompanyUserEvaluation::class);
    }
}
