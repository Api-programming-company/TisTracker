<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Evaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'user_id',
    ];

    /**
     * Una evaluación pertenece a un solo usuario.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function questions()
    {
        return $this->hasMany(Question::class);
    }

    public static function getFieldLabels()
    {
        return [
            'title' => 'título',
            'description' => 'descripción',
            'questions' => 'preguntas',
            'question_text' => 'texto de la pregunta',
            'answer_options' => 'criterios',
            'option_text' => 'texto del criterio',
            'score' => 'puntuación',
        ];
    }
}
