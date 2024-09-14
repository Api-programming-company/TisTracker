import { validarContraseña } from '../utils/validaciones';

describe('validarContraseña', () => {
  test('debe aceptar una contraseña válida', () => {
    expect(validarContraseña('2#>8\'Dk5Yk2VHwY')).toBe(true); // Contraseña válida según criterios
  });

  test('debe rechazar una contraseña que sea demasiado corta', () => {
    expect(validarContraseña('2#>8\'Dk')).toBe(false); // Menos de 8 caracteres
  });

  test('debe rechazar una contraseña sin letras minúsculas', () => {
    expect(validarContraseña('2#>8\'DK5YK2VHWY')).toBe(false); // Sin letras minúsculas
  });

  test('debe rechazar una contraseña sin letras mayúsculas', () => {
    expect(validarContraseña('2#>8\'dk5yk2vhwy')).toBe(false); // Sin letras mayúsculas
  });

  test('debe rechazar una contraseña sin dígitos', () => {
    expect(validarContraseña('#>\'DkYkVHwY')).toBe(false); // Sin dígitos
  });

  test('debe rechazar una contraseña sin caracteres especiales', () => {
    expect(validarContraseña('2a8Dk5Yk2VHwY')).toBe(false); // Sin caracteres especiales
  });

  test('debe rechazar una contraseña con caracteres no permitidos', () => {
    // Ajusta este test si los caracteres especiales permitidos son más específicos
    expect(validarContraseña('2#>8\'Dk5Yk2VHwY ')).toBe(false); // Carácter especial no permitido (si " " no está en el conjunto permitido)
  });

  test('debe aceptar una contraseña con caracteres especiales permitidos', () => {
    // Asegúrate de usar caracteres especiales permitidos según el regex
    expect(validarContraseña('2#>8\'Dk5Yk2VHwY!')).toBe(true); // Caracteres especiales permitidos
  });
});