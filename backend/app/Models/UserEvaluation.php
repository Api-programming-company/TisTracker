<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserEvaluation extends Model
{
    protected $table = 'user_evaluations';

    protected $fillable = ['evaluator_id', 'evaluatee_id', 'score'];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'score' => 'integer',
    ];

    // Relación con el usuario que evalúa
    public function evaluator()
    {
        return $this->belongsTo(User::class, 'evaluator_id');
    }

    // Relación con el usuario evaluado
    public function evaluatee()
    {
        return $this->belongsTo(User::class, 'evaluatee_id');
    }
}
