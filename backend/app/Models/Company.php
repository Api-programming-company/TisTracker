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

    protected $appends = ['cross_evaluation_score', 'auto_evaluation_score'];

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

    public function getAutoEvaluationScoreAttribute()
    {
        $companyUserIds  = $this->members()->pluck('id');

        $memberScores = CompanyUserEvaluation::whereIn('company_user_id', $companyUserIds)
            ->where('company_id', $this->id)
            ->pluck('score');

        $averageScore = $memberScores->isNotEmpty() ? $memberScores->avg() : 0;

        return $averageScore;
    }

    public function getCrossEvaluationScoreAttribute()
    {
        $companyUserIds = $this->members()->pluck('id');

        $nonMemberScores = CompanyUserEvaluation::whereNotIn('company_user_id', $companyUserIds)
            ->where('company_id', $this->id)
            ->pluck('score');

        $averageScore = $nonMemberScores->isNotEmpty() ? $nonMemberScores->avg() : 0;

        return $averageScore;
    }

    
}
