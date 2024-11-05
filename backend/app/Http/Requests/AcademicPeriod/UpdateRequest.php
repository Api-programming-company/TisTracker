<?php

namespace App\Http\Requests\AcademicPeriod;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use App\Models\AcademicPeriod;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $id = $this->route('academic_period');
        $academicPeriod = AcademicPeriod::find($id);
        return Auth::check() && Auth::user()->user_type === 'D' && $academicPeriod && $academicPeriod->user_id === Auth::user()->id;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'start_date' => [
                'required',
                'date',
                'before:end_date',
                function ($attribute, $value, $fail) {
                    $threeMonthsAgo = now()->subMonths(3);
                    $threeMonthsFromNow = now()->addMonths(3);
                    $startDate = Carbon::parse($value);

                    if ($startDate->lessThan($threeMonthsAgo)) {
                        $fail('La fecha de inicio no puede ser anterior a tres meses desde hoy.');
                    }
                    if ($startDate->greaterThan($threeMonthsFromNow)) {
                        $fail('La fecha de inicio no puede ser posterior a tres meses desde hoy.');
                    }
                },
            ],
            'end_date' => [
                'required',
                'date',
                'after:start_date',
                function ($attribute, $value, $fail) {
                    $startDate = $this->start_date;
                    $endDate = Carbon::parse($value);
                    $maxEndDate = Carbon::parse($startDate)->addMonths(6);
                    if ($endDate->greaterThan($maxEndDate)) {
                        $fail('El periodo académico no puede durar más de 6 meses.');
                    }
                },
            ],
        ];
    }
    public function messages()
    {
        return [
            'start_date.required' => 'La fecha de inicio es obligatoria.',
            'start_date.date' => 'La fecha de inicio debe ser una fecha válida.',
            'start_date.before' => 'La fecha de inicio debe ser anterior a la fecha de fin.',
            'end_date.required' => 'La fecha de fin es obligatoria.',
            'end_date.date' => 'La fecha de fin debe ser una fecha válida.',
            'end_date.after' => 'La fecha de fin debe ser posterior a la fecha de inicio.',
        ];
    }
}
