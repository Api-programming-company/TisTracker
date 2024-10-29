<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class EvaluationAssigned extends Notification
{
    use Queueable;

    public $evaluationName;

    public function __construct($evaluationName)
    {
        $this->evaluationName = $evaluationName;
    }

    public function via($notifiable)
    {
        return ['mail']; // u otros canales de notificación, como 'database', 'slack', etc.
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
                    ->subject('Nueva evaluación asignada')
                    ->line("Has recibido una nueva evaluación: {$this->evaluationName}")
                    ->action('Ver Evaluación', url('/'))
                    ->line('¡Buena suerte!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
