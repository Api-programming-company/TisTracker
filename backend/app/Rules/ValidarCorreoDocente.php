<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidarCorreoDocente implements Rule
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
        //verificar que sea docente
        return preg_match('/@fcyt\.umss\.edu\.bo$/', $value);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El correo de un docente tiene que tener el dominio @fcyt.umss.edu.bo';
    }
}