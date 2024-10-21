<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluation;
use App\Models\AcademicPeriodEvaluation;
use Illuminate\Support\Facades\Auth;
use Exception;
use Illuminate\Validation\ValidationException;
class EvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $user = Auth::user();

            // Obtener todas las evaluaciones del usuario autenticado
            $evaluations = $user->evaluations()->get();

            return response()->json($evaluations);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al obtener las evaluaciones.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();

            // Validar que el usuario tenga el tipo de usuario 'D'
            if ($user->user_type !== 'D') {
                return response()->json(['message' => 'Solo un docente puede crear una plantilla de evaluación.'], 403);
            }

            // Validación de los datos
            $validatedData = $request->validate([
                'title' => 'required|string|max:255|unique:evaluations,title,NULL,id,user_id,' . $user->id,
                'description' => 'nullable|string',
                'questions' => 'required|array',
                'questions.*.question_text' => 'required|string|max:255',
                'questions.*.answer_options' => 'required|array',
                'questions.*.answer_options.*.option_text' => 'required|string|max:255',
                'questions.*.answer_options.*.score' => 'required|integer|min:0',
            ], [
                'title.required' => __('validation.attributes.evaluation.title') . ' es requerido.',
                'title.unique' => ' El ' . __('validation.attributes.evaluation.title') . ' ya está registrado en sus plantillas',
                'title.string' => __('validation.attributes.evaluation.title') . ' debe ser una cadena.',
            ]);

            foreach ($validatedData['questions'] as $question) {
                if (count($question['answer_options']) > 10) {
                    return response()->json(['message' => 'Cada pregunta debe tener como maximo 10 criterios.'], 422);
                }
            }
            // Crear la evaluación
            $evaluation = $user->evaluations()->create([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'user_id' => $user->id,
            ]);

            // Crear las preguntas y sus opciones de respuesta
            foreach ($validatedData['questions'] as $questionData) {
                $question = $evaluation->questions()->create([
                    'question_text' => $questionData['question_text'],
                ]);
                $question->answerOptions()->createMany($questionData['answer_options']);
            }

            return response()->json($evaluation->load('questions.answerOptions'), 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al crear la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            // Buscar la evaluación en la tabla evaluations
            $evaluation = Evaluation::with(['questions.answerOptions' => function ($query) {
                $query->orderBy('score');
            }])->find($id);

            if (!$evaluation) {
                return response()->json(['message' => 'Evaluación no encontrada.'], 404);
            }

            return response()->json($evaluation);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al obtener la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $user = Auth::user();

            $evaluation = Evaluation::findOrFail($id);
            $isUsed = AcademicPeriodEvaluation::where('evaluation_id', $evaluation->id)->exists();

            if ($isUsed) {
                return response()->json([
                    'message' => 'Esta evaluación no se puede modificar porque ya forma parte de un periodo académico.',
                ], 403);
            }

            // Validar la entrada
            $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'description' => 'nullable|string',
                'questions' => 'sometimes|required|array',
                'questions.*.question_text' => 'sometimes|required|string|max:255',
                'questions.*.answer_options' => 'sometimes|required|array',
                'questions.*.answer_options.*.option_text' => 'sometimes|required|string|max:255',
                'questions.*.answer_options.*.score' => 'sometimes|required|integer|min:0|max:10',
            ]);

            // Buscar la evaluación
            $evaluation = $user->evaluations()->find($id);

            if (!$evaluation) {
                return response()->json(['message' => 'Evaluación no encontrada.'], 404);
            }

            // Actualizar la evaluación
            $evaluation->update($request->only('title', 'description'));

            // Actualizar preguntas y opciones de respuesta (si se proporcionaron)
            if ($request->has('questions')) {
                // Eliminar preguntas que ya no están en la solicitud
                $newQuestionIds = collect($request->questions)->pluck('id')->filter()->all();
                $evaluation->questions()->whereNotIn('id', $newQuestionIds)->delete();

                foreach ($request->questions as $questionData) {
                    $question = $evaluation->questions()->updateOrCreate(
                        ['id' => $questionData['id']],
                        ['question_text' => $questionData['question_text']]
                    );

                    // Eliminar opciones de respuesta que ya no están en la solicitud
                    $newOptionIds = collect($questionData['answer_options'])->pluck('id')->filter()->all();
                    $question->answerOptions()->whereNotIn('id', $newOptionIds)->delete();

                    foreach ($questionData['answer_options'] as $optionData) {
                        $question->answerOptions()->updateOrCreate(
                            ['id' => $optionData['id']],
                            $optionData
                        );
                    }
                }
            }

            return response()->json($evaluation->load('questions.answerOptions'));
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Error de validación.',
                'errors' => $e->errors()
            ], 422);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al actualizar la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = Auth::user();

            // Buscar la evaluación
            $evaluation = $user->evaluations()->find($id);

            if (!$evaluation) {
                return response()->json(['message' => 'Evaluación no encontrada.'], 404);
            }

            // Eliminar la evaluación
            $evaluation->delete();

            return response()->json(['message' => 'Evaluación eliminada correctamente.']);
        } catch (Exception $e) {
            return response()->json(['message' => 'Ocurrió un error al eliminar la evaluación.', 'error' => $e->getMessage()], 500);
        }
    }
}
