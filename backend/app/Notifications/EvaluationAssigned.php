<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Carbon\Carbon;

class EvaluationAssigned extends Notification
{
    use Queueable;

    public $evaluationName;
    public $evaluationType;
    public $startDate;
    public $endDate;
    public $teacherName;
    public $studentName;

    public function __construct($evaluationName, $evaluationType, $startDate, $endDate, $teacherName, $studentName)
    {
        $this->evaluationName = $evaluationName;
        $this->evaluationType = $evaluationType;
        $this->teacherName = $teacherName;
        $this->studentName = $studentName;

        // Convertir fechas a formato Carbon si no lo son y formatearlas
        $startDate = $startDate instanceof Carbon ? $startDate : Carbon::parse($startDate);
        $endDate = $endDate instanceof Carbon ? $endDate : Carbon::parse($endDate);

        $this->startDate = [
            'date' => $startDate->format('d/m/Y'),
            'time' => $startDate->format('H:i')
        ];

        $this->endDate = [
            'date' => $endDate->format('d/m/Y'),
            'time' => $endDate->format('H:i')
        ];
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject("Notificación de Evaluación Asignada: {$this->evaluationType}")
            ->greeting("Estimado/a {$this->studentName}:")
            ->line("Le informamos que el/la docente {$this->teacherName} le ha asignado una evaluación de tipo {$this->evaluationType}. A continuación, encontrará los detalles específicos:")
            ->line("**Periodo de la Evaluación:**")
            ->line("Desde: {$this->startDate['date']}, a las {$this->startDate['time']}")
            ->line("Hasta: {$this->endDate['date']}, a las {$this->endDate['time']}")
            ->line("Le recordamos que la evaluación estará disponible únicamente durante este periodo. Le sugerimos planificar su tiempo para completarla antes de la fecha y hora de finalización.")
            ->line("Si tiene alguna consulta o necesita asistencia, no dude en comunicarse con su docente.")
            ->line("¡Le deseamos mucho éxito!")
            ->salutation('Atentamente,');
    }
}


