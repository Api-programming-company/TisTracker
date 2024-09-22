<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidarCorreoEstudiante implements Rule
{
    protected $errorMessage;

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
        // Validar que el correo tenga el dominio correcto
        if (!preg_match('/^.+@est\.umss\.edu$/', $value)) {
            $this->errorMessage = 'El correo de un estudiante debe tener el dominio @est.umss.edu';
            return false;
        }

        // Verificar si tiene 9 dígitos
        if (!preg_match('/^\d{9}@/', $value)) {
            $this->errorMessage = 'El correo debe tener exactamente 9 dígitos antes del dominio';
            return false;
        }

        return true; // Si pasa ambas validaciones, devuelve true
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->errorMessage ?? 'El correo de un estudiante es inválido';
    }
}
