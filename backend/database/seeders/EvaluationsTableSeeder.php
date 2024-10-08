<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Evaluation;
use App\Models\Question;
use App\Models\AnswerOption;
use App\Models\User;
use Carbon\Carbon;
class EvaluationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Verificar que existan usuarios para asignar evaluaciones
        $users = User::where('user_type', 'D')->get(); // Asumiendo que 'E' son estudiantes
        if ($users->isEmpty()) {
            $this->command->info('No hay usuarios de tipo Estudiante para asignar evaluaciones.');
            return;
        }

        // Definir una fecha común para created_at y updated_at
        $now = Carbon::now();

        // Crear Evaluaciones para cada docente
        foreach ($users as $user) {
            $evaluation = Evaluation::create([
                'id' => 1,
                'user_id' => $user->id,
                'title' => "Ejemplo de Evaluación",
                'description' => "Evaluacion para conocimiento.",
                'created_at' => $now,
                'updated_at' => $now,
            ]);

            // Crear preguntas para la evaluación
            $questionsData = [
                [
                    'question_text' => '¿Cómo calificarías tu conocimiento sobre el tema?',
                    'answer_options' => [
                        ['option_text' => 'Muy bajo', 'score' => 1],
                        ['option_text' => 'Bajo', 'score' => 3],
                        ['option_text' => 'Medio', 'score' => 5],
                        ['option_text' => 'Alto', 'score' => 7],
                        ['option_text' => 'Muy alto', 'score' => 10],
                    ],
                ],
                [
                    'question_text' => '¿Qué tan útil fue el contenido proporcionado?',
                    'answer_options' => [
                        ['option_text' => 'Nada útil', 'score' => 0],
                        ['option_text' => 'Poco útil', 'score' => 2],
                        ['option_text' => 'Moderadamente útil', 'score' => 4],
                        ['option_text' => 'Muy útil', 'score' => 6],
                        ['option_text' => 'Extremadamente útil', 'score' => 8],
                    ],
                ],
                [
                    'question_text' => '¿Recomendarías este curso a otros?',
                    'answer_options' => [
                        ['option_text' => 'Definitivamente no', 'score' => 0],
                        ['option_text' => 'Probablemente no', 'score' => 1],
                        ['option_text' => 'No estoy seguro', 'score' => 2],
                        ['option_text' => 'Probablemente sí', 'score' => 3],
                        ['option_text' => 'Definitivamente sí', 'score' => 4],
                    ],
                ],
            ];

            foreach ($questionsData as $questionData) {
                $question = Question::create([
                    'evaluation_id' => $evaluation->id,
                    'question_text' => $questionData['question_text'],
                    'created_at' => $now,
                    'updated_at' => $now,
                ]);

                foreach ($questionData['answer_options'] as $optionData) {
                    AnswerOption::create([
                        'question_id' => $question->id,
                        'option_text' => $optionData['option_text'],
                        'score' => $optionData['score'],
                        'created_at' => $now,
                        'updated_at' => $now,
                    ]);
                }
            }
        }
    }
}
