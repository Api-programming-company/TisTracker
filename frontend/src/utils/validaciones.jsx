export const validarContraseña = (contraseña) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/|\\~`-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;"'<>,.?/|\\~`-]{8,}$/;
  return regex.test(contraseña);
};
