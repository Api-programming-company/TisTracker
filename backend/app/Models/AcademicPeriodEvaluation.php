<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicPeriodEvaluation extends Model
{
    use HasFactory;

    protected $fillable = [
        'evaluation_id',
        'academic_period_id',
        'evaluation_type',
        'start_date',
        'end_date',
    ];

    public function evaluation()
    {
        return $this->belongsTo(Evaluation::class);
    }

    public function academicPeriod()
    {
        return $this->belongsTo(AcademicPeriod::class);
    }
}
