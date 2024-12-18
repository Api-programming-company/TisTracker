<?php

namespace App\Http\Requests\AcademicPeriod;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check() && Auth::user()->user_type === 'D';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:255|unique:academic_periods',
            'start_date' => [
                'required',
                'date',
                function ($attribute, $value, $fail) {
                    // Parsear la fecha de inicio enviada por el cliente
                    $startDate = Carbon::parse($value)->startOfDay();;
                    // Obtener la fecha actual en la zona horaria del cliente
                    $now = Carbon::now($startDate->getTimezone())->startOfDay();;
                    if ($startDate->isBefore($now)) {
                        $fail('La fecha de inicio no puede ser anterior a la fecha actual.');
                    }
                },
            ],
            'end_date' => [
                'required',
                'date',
                'after:start_date',
                function ($attribute, $value, $fail) {
                    $startDate = request('start_date');
                    $endDate = Carbon::parse($value);
                    $maxEndDate = Carbon::parse($startDate)->addMonths(6);
                    if ($endDate->greaterThan($maxEndDate)) {
                        $fail('El periodo académico no puede durar más de 6 meses.');
                    }
                },
            ],
            'company_creation_start_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
                'before:company_creation_end_date',
            ],
            'company_creation_end_date' => [
                'required',
                'date',
                'after:company_creation_start_date',
                'before_or_equal:end_date',
            ],
            'planning_start_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
                'before:planning_end_date',
            ],
            'planning_end_date' => [
                'required',
                'date',
                'after:planning_start_date',
                'before_or_equal:end_date',
            ],
            'evaluation_start_date' => [
                'required',
                'date',
                'after_or_equal:planning_end_date',
                'before:evaluation_end_date',
            ],
            'evaluation_end_date' => [
                'required',
                'date',
                'after:evaluation_start_date',
                'before_or_equal:end_date',
            ],
            'description' => 'nullable|string',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'name.required' => 'El nombre del periodo académico es obligatorio.',
            'name.string' => 'El nombre del periodo académico debe ser una cadena de texto.',
            'name.max' => 'El nombre del periodo académico no puede exceder los 255 caracteres.',
            'name.unique' => 'Ya existe un periodo académico con este nombre.',
            'start_date.required' => 'La fecha de inicio es obligatoria.',
            'start_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'start_date.after_or_equal' => 'La fecha de inicio debe ser hoy o posterior a hoy.',
            'end_date.required' => 'La fecha de finalización es obligatoria.',
            'end_date.date' => 'La fecha de finalización debe ser una fecha válida.',
            'end_date.after' => 'La fecha de finalización debe ser posterior a la fecha de inicio.',

            'company_creation_start_date.required' => 'La fecha de inicio para la creación de compañías es obligatoria.',
            'company_creation_start_date.date' => 'La fecha de inicio para la creación de compañías debe ser una fecha válida.',
            'company_creation_start_date.after_or_equal' => 'La fecha de inicio para la creación de compañías debe ser posterior o igual a la fecha de inicio del periodo académico.',
            'company_creation_start_date.before_or_equal' => 'La fecha de inicio para la creación de compañías debe ser igual o anterior a la fecha de finalización para la creación de compañías.',

            'company_creation_end_date.required' => 'La fecha de finalización para la creación de compañías es obligatoria.',
            'company_creation_end_date.date' => 'La fecha de finalización para la creación de compañías debe ser una fecha válida.',

            'planning_start_date.required' => 'La fecha de inicio para la planificación es obligatoria.',
            'planning_start_date.date' => 'La fecha de inicio para la planificación debe ser una fecha válida.',
            'planning_start_date.before' => 'La fecha de inicio para la planificación debe ser anterior a la fecha de finalización para la planificación.',
            'planning_end_date.required' => 'La fecha de finalización para la planificación es obligatoria.',
            'planning_end_date.date' => 'La fecha de finalización para la planificación debe ser una fecha válida.',
            'planning_end_date.after' => 'La fecha de finalización para la planificación debe ser posterior a la fecha de inicio.',
            'planning_end_date.before_or_equal' => 'La fecha de finalización para la planificación debe ser igual o anterior a la fecha de finalización del periodo académico.',

            'evaluation_start_date.required' => 'La fecha de inicio para la evaluación es obligatoria.',
            'evaluation_start_date.date' => 'La fecha de inicio para la evaluación debe ser una fecha válida.',

            'evaluation_end_date.required' => 'La fecha de finalización para la evaluación es obligatoria.',
            'evaluation_end_date.date' => 'La fecha de finalización para la evaluación debe ser una fecha válida.',
            'evaluation_end_date.after' => 'La fecha de finalización para la evaluación debe ser posterior a la fecha de inicio.',

            'description.string' => 'La descripción debe ser una cadena de texto.',
        ];
    }
}
