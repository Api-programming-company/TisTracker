<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Evaluation;
use App\Models\Question;
use App\Models\AnswerOption;

class EvaluationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run($userId)
    {
        $evaluationMember = Evaluation::create([
            'title' => 'Evaluación a Integrantes de Grupo Empresa',
            'description' => 'Evaluación para miembros de empresas',
            'user_id' => $userId,
        ]);

        $questionsMember = [
            [
                'question_text' => 'Mi compañero(a) se comunicó de manera efectiva con el equipo a lo largo del proyecto.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Mi compañero(a) colaboró bien con otros miembros del equipo para alcanzar los objetivos del proyecto.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Mi compañero(a) asumió la responsabilidad de sus tareas y cumplió con sus compromisos.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'Mi compañero(a) fue proactivo al abordar y resolver problemas que surgieron durante el proyecto.',
                'answer_options' => [
                    ['option_text' => 'En desacuerdo', 'score' => 1],
                    ['option_text' => 'Neutral', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                ],
            ],
            [
                'question_text' => 'La contribución de mi compañero(a) fue valiosa para el éxito del proyecto.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Mi compañero(a) cumplió con los plazos establecidos para sus entregas.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Mi compañero(a) estuvo dispuesto a ayudar a otros miembros del equipo cuando fue necesario.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'Mi compañero(a) fue receptivo a la retroalimentación y mostró disposición para mejorar.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'La calidad del trabajo realizado por mi compañero(a) cumplió con los estándares que hemos establecido.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
        ];

        foreach ($questionsMember as $questionData) {
            $question = $evaluationMember->questions()->create([
                'question_text' => $questionData['question_text'],
            ]);

            foreach ($questionData['answer_options'] as $optionData) {
                $question->answerOptions()->create($optionData);
            }
        }

        $companyEvaluation = Evaluation::create([
            'title' => 'Evaluación a una Grupo Empresa',
            'description' => 'Evaluación para empresas',
            'user_id' => $userId,
        ]);

        $companyQuestions = [
            [
                'question_text' => 'El código está bien estructurado y es fácil de entender.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'El producto final cumple con todos los requisitos especificados en la documentación del proyecto.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'La documentación técnica es clara y completa, facilitando la comprensión del sistema.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'El código es fácil de mantener y actualizar en el futuro.',
                'answer_options' => [
                    ['option_text' => 'En desacuerdo', 'score' => 1],
                    ['option_text' => 'Neutral', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                ],
            ],
            [
                'question_text' => 'La interfaz de usuario es intuitiva y fácil de navegar.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'El estilo de codificación es consistente a lo largo de todo el proyecto.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'El producto final tiene un número mínimo de errores y bugs.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'El software es compatible con las plataformas y sistemas operativos especificados.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'El código cuenta con comentarios que facilitan su comprensión.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'El tiempo de carga del producto es aceptable y eficiente.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
        ];

        foreach ($companyQuestions as $questionData) {
            $question = $companyEvaluation->questions()->create([
                'question_text' => $questionData['question_text'],
            ]);

            foreach ($questionData['answer_options'] as $optionData) {
                $question->answerOptions()->create($optionData);
            }
        }
        $selfEvaluation = Evaluation::create([
            'title' => 'Autoevaluación de Grupo Empresa',
            'description' => 'Autoevaluación para empresas',
            'user_id' => $userId,
        ]);

        $selfEvaluationQuestions = [
            [
                'question_text' => 'Me siento seguro utilizando las tecnologías y herramientas requeridas para mi trabajo.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Tengo la capacidad de resolver problemas técnicos de manera eficiente.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Estoy al tanto de las mejores prácticas y patrones de diseño en desarrollo de software.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'Neutral', 'score' => 2],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 3],
                ],
            ],
            [
                'question_text' => 'Me comunico de manera clara y efectiva con los miembros de mi equipo.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
            [
                'question_text' => 'Siento que puedo colaborar fácilmente con otros en tareas y proyectos.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Recibo retroalimentación útil de mis compañeros y la utilizo para mejorar mi trabajo.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Soy capaz de gestionar mi tiempo de manera efectiva para cumplir con los plazos.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'Neutral', 'score' => 2],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 3],
                ],
            ],
            [
                'question_text' => 'Mi código cumple con los estándares de calidad establecidos por el equipo.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Tomo en cuenta las recomendaciones de otros desarrolladores durante las revisiones de código.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'Neutral', 'score' => 3],
                    ['option_text' => 'De acuerdo', 'score' => 4],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 5],
                ],
            ],
            [
                'question_text' => 'Estoy satisfecho con las herramientas de desarrollo y colaboración que utilizamos.',
                'answer_options' => [
                    ['option_text' => 'Totalmente en desacuerdo', 'score' => 1],
                    ['option_text' => 'En desacuerdo', 'score' => 2],
                    ['option_text' => 'De acuerdo', 'score' => 3],
                    ['option_text' => 'Totalmente de acuerdo', 'score' => 4],
                ],
            ],
        ];

        foreach ($selfEvaluationQuestions as $questionData) {
            $question = $selfEvaluation->questions()->create([
                'question_text' => $questionData['question_text'],
            ]);

            foreach ($questionData['answer_options'] as $optionData) {
                $question->answerOptions()->create($optionData);
            }
        }
    }
}
