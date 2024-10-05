<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evaluation;
use Illuminate\Support\Facades\Auth;
class EvaluationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user = Auth::user();

        // Obtener todas las evaluaciones del usuario autenticado
        $evaluations = $user->evaluations()->with('questions.answerOptions')->get();

        return response()->json($evaluations);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = Auth::user();

        // Validación de los datos
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'questions' => 'required|array',
            'questions.*.question_text' => 'required|string|max:255',
            'questions.*.answer_options' => 'required|array',
            'questions.*.answer_options.*.option_text' => 'required|string|max:255',
            'questions.*.answer_options.*.score' => 'required|integer|min:0|max:10',
        ]);

        // Crear la evaluación
        $evaluation = $user->evaluations()->create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        // Crear las preguntas y sus opciones de respuesta
        foreach ($request->questions as $questionData) {
            $question = $evaluation->questions()->create([
                'question_text' => $questionData['question_text'],
            ]);

            foreach ($questionData['answer_options'] as $optionData) {
                $question->answerOptions()->create($optionData);
            }
        }

        return response()->json($evaluation->load('questions.answerOptions'), 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = Auth::user();

        // Buscar la evaluación del usuario
        $evaluation = $user->evaluations()->with('questions.answerOptions')->find($id);

        if (!$evaluation) {
            return response()->json(['message' => 'Evaluación no encontrada.'], 404);
        }

        return response()->json($evaluation);
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
        $user = Auth::user();

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
            foreach ($request->questions as $questionData) {
                $question = $evaluation->questions()->updateOrCreate(
                    ['id' => $questionData['id']],
                    ['question_text' => $questionData['question_text']]
                );

                foreach ($questionData['answer_options'] as $optionData) {
                    $question->answerOptions()->updateOrCreate(
                        ['id' => $optionData['id']],
                        $optionData
                    );
                }
            }
        }

        return response()->json($evaluation->load('questions.answerOptions'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
