<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\UserEvaluation;

class CompanyUser extends Model
{
    protected $fillable = [
        'company_id',
        'user_id',
        'status',
        'permission',
    ];
    protected $appends = ['user_evaluations_score'];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function evaluationsGiven()
    {
        return $this->hasMany(UserEvaluation::class, 'evaluator_company_user_id');
    }

    public function evaluationsReceived()
    {
        return $this->hasMany(UserEvaluation::class, 'evaluatee_company_user_id');
    }

    public function getUserEvaluationsScoreAttribute()
    {
        return $this->evaluationsReceived()
            ->avg('score') ?? 0; // Retorna el promedio o 0 si no hay scores
    }
}
