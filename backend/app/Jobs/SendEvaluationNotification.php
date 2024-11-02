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
    protected $evaluationType;
    protected $startDate;
    protected $endDate;

    public function __construct($students, $evaluationName, $evaluationType, $startDate, $endDate)
    {
        $this->students = $students;
        $this->evaluationName = $evaluationName;
        $this->evaluationType = $evaluationType;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function handle()
    {
        $formattedStartDate = $this->startDate->format('d/m/Y H:i');
        $formattedEndDate = $this->endDate->format('d/m/Y H:i');

        Notification::send($this->students, new EvaluationAssigned(
            $this->evaluationName,
            $this->evaluationType,
            $formattedStartDate,
            $formattedEndDate
        ));
    }
}

