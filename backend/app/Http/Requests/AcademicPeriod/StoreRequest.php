<?php

namespace App\Http\Requests\AcademicPeriod;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Illuminate\Validation\ValidationException;

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
            'end_date' => 'required|date|after:start_date',
            'description' => 'nullable|string',
        ];
    }

    /**
     * Configure the validator instance.
     *
     * @param  \Illuminate\Validation\Validator  $validator
     * @return void
     */
    protected function prepareForValidation()
    {
        $startDate = new Carbon($this->start_date);
        $endDate = new Carbon($this->end_date);
        $maxEndDate = $startDate->copy()->addMonths(6);

        // Agregar validación personalizada para limitar la duración a 6 meses
        if ($endDate->gt($maxEndDate)) {
            throw ValidationException::withMessages([
                'end_date' => 'El periodo académico no puede durar más de 6 meses.',
            ]);
        }
    }
}
