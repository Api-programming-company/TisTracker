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

    public function __construct($evaluationName, $evaluationType, $startDate, $endDate)
    {
        $this->evaluationName = $evaluationName;
        $this->evaluationType = $evaluationType;

        $startDate = $startDate instanceof Carbon ? $startDate : Carbon::parse($startDate);
        $endDate = $endDate instanceof Carbon ? $endDate : Carbon::parse($endDate);

        // Formatear fecha y hora por separado
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
            ->greeting('¡Buenas!')
            ->subject('Nueva evaluación asignada')
            ->line("Has recibido una nueva evaluación: {$this->evaluationName}")
            ->line("Tipo de evaluación: {$this->evaluationType}")
            ->line("Fecha de inicio: {$this->startDate['date']}Hora de inicio: {$this->startDate['time']}")
            ->line("Fecha de fin: {$this->endDate['date']} Hora de fin: {$this->endDate['time']}")
            ->line('¡Buena suerte!');
    }
}
