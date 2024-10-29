<?php

namespace App\Jobs;

use App\Models\AcademicPeriodEvaluation;
use App\Notifications\EvaluationAssigned;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Notification;

class SendEvaluationNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $students;
    protected $evaluationName;

    public function __construct($students, $evaluationName)
    {
        $this->students = $students;
        $this->evaluationName = $evaluationName;
    }

    public function handle()
    {
        Notification::send($this->students, new EvaluationAssigned($this->evaluationName));
    }
}