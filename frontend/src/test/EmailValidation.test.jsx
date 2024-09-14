import { validarEmailDocente, validarEmailEstudiante } from '../utils/validaciones';

describe('validarEmailDocente', () => {
  test('debe aceptar un correo de docente válido', () => {
    expect(validarEmailDocente('leticiablanco.c@fcyt.umss.edu.bo')).toBe(true);
  });

  test('debe rechazar un correo de docente con dominio incorrecto', () => {
    expect(validarEmailDocente('profesor@gmail.com')).toBe(false);
  });

  test('debe rechazar un correo de docente sin dominio', () => {
    expect(validarEmailDocente('profesor@fcyt')).toBe(false);
  });

  test('debe rechazar un correo de docente con formato incorrecto', () => {
    expect(validarEmailDocente('profesor@fcyt.umss.com')).toBe(false);
  });
});

describe('validarEmailEstudiante', () => {
  test('debe aceptar un correo de estudiante válido', () => {
    expect(validarEmailEstudiante('123454321@est.umss.edu')).toBe(true);
  });

  test('debe rechazar un correo de estudiante con formato incorrecto', () => {
    expect(validarEmailEstudiante('12344321@est.umss.edu')).toBe(false); // Menos de 9 dígitos
  });

  test('debe rechazar un correo de estudiante con dominio incorrecto', () => {
    expect(validarEmailEstudiante('123454321@gmail.com')).toBe(false); // Dominio incorrecto
  });

  test('debe rechazar un correo de estudiante con letras en lugar de números', () => {
    expect(validarEmailEstudiante('abcd12345@est.umss.edu')).toBe(false); // Letras en lugar de solo números
  });
});
