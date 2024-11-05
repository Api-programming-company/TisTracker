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
  const utcDateString = dateString + "Z"; // Agregamos "Z" para indicar que es UTC
  const date = new Date(utcDateString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDate2 = (dateString) => {
  const date = dateString.split("-");
  const strDate = date[2] + "/" + date[1] + "/" + date[0];
  return strDate; // ta feo jaja
};

export const formatDateTime = (dateString) => {
  const utcDateString = dateString + "Z"; // Agregamos "Z" para indicar que es UTC
  const date = new Date(utcDateString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
};

export const isNumeric = (cadena) => {
  return !isNaN(cadena) && !isNaN(parseFloat(cadena));
};
