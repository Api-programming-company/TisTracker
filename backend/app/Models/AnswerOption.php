<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AnswerOption extends Model
{
    use HasFactory;

    protected $fillable = [
        'option_text',
        'score',
        'question_id',
    ];

    /**
     * Una opción de respuesta pertenece a una pregunta.
     */
    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
