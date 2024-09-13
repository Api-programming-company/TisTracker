<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidarCorreoEstudiante implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //validar correo de estudiante
        return preg_match('/@est\.umss\.edu$/', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'el correo de un estudiante tiene que tener el dominio @est.umss.edu';
    }
}