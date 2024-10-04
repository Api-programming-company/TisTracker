<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'question_text',
        'evaluation_id',
    ];

    /**
     * Una pregunta pertenece a una sola evaluación.
     */
    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class);
    }
}
