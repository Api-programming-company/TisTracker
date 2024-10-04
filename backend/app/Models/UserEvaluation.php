<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\CompanyUser;

class UserEvaluation extends Model
{
    protected $table = 'user_evaluations';

    protected $fillable = ['evaluator_company_user_id', 'evaluatee_company_user_id', 'score'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'score' => 'integer',
    ];

    // Relación con el miembro que evalúa
    public function evaluator()
    {
        return $this->belongsTo(CompanyUser::class, 'evaluator_company_user_id');
    }

    // Relación con el miembro evaluado
    public function evaluatee()
    {
        return $this->belongsTo(CompanyUser::class, 'evaluatee_company_user_id');
    }
}
