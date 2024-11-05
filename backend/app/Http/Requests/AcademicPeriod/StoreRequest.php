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
            'start_date' => 'required|date|after_or_equal:today',
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
            'description.string' => 'La descripción debe ser una cadena de texto.',
        ];
    }
}
