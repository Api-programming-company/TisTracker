<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class ValidarPassword implements Rule
{
    protected $nombre;
    protected $apellidos;

    // public function __construct($nombre, $apellidos)
    // {
    //     $this->nombre = $nombre;
    //     $this->apellidos = $apellidos;
    // }

    public function passes($attribute, $value)
    {
        $minLength = 8; // Mínimo 8 caracteres
        $hasUpperCase = preg_match('/[A-Z]/', $value); // Al menos una mayúscula
        $hasLowerCase = preg_match('/[a-z]/', $value); // Al menos una minúscula
        $hasNumber = preg_match('/\d/', $value);// Al menos un número
        $hasSpecialChar = preg_match('/[!@#$%^&*]/', $value);// Al menos un caracter especial
        $hasNoSpaces = !preg_match('/\s/', $value);// No puede contener espacios
        //$noCommonSequences = !preg_match('/(12345|abcdef|qwerty)/', $value);// No puede contener secuencias comunes
        //$noNameParts = !preg_match('/' . preg_quote($this->nombre, '/') . '|' . preg_quote($this->apellidos, '/') . '/i', $value);// No puede contener el nombre o apellidos

        return strlen($value) >= $minLength &&
            $hasUpperCase &&
            $hasLowerCase &&
            $hasNumber &&
            $hasSpecialChar &&
            $hasNoSpaces;
        // $noCommonSequences &&
        // $noNameParts;
    }

    public function message()
    {
        return 'La contraseña no cumple con los requisitos de seguridad.';
    }
}