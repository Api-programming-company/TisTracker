<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class EvaluationAssignedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $studentName;
    public $teacherName;
    public $startDate;
    public $endDate;
    public $startTime;
    public $endTime;
    public $appName;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($studentName, $teacherName, $startDate, $endDate, $startTime, $endTime, $appName)
    {
        $this->studentName = $studentName;
        $this->teacherName = $teacherName;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->startTime = $startTime;
        $this->endTime = $endTime;
        $this->appName = $appName;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Notificación de Evaluación Asignada en ' . $this->appName)
                    ->markdown('emails.evaluation_assigned');
    }
}
