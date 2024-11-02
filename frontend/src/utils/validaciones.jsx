export const validarContraseña = (contraseña) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/|\\~`-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>,.?/|\\~`-]{8,}$/;
  return regex.test(contraseña);
};

export const validarEmailDocente = (email) => {
  const regexDocente = /^[a-zA-Z0-9._%+-]+@fcyt\.umss\.edu\.bo$/;
  return regexDocente.test(email);
};

export const validarEmailEstudiante = (email) => {
  const regexEstudiante = /^[0-9]{9}@est\.umss\.edu$/;
  return regexEstudiante.test(email);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const formatDate = (dateString) => {
  // Crear un nuevo objeto Date a partir de la cadena de fecha
  const date = new Date(dateString);

  // Convertir la fecha a la zona horaria local
  const localDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));

  // Formatear la fecha en el formato deseado
  return localDate.toLocaleDateString(undefined, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

export const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, { // Sin especificar locale, usa la configuración regional del navegador
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false, 
  });
};

export const isNumeric = (cadena) => {
  return !isNaN(cadena) && !isNaN(parseFloat(cadena));
}