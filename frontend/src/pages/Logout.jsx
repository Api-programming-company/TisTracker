import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Container, Typography } from "@mui/material";
import AppContext from "../context/AppContext";

const Logout = () => {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    console.log("cerramos sesion");

    // Aquí puedes hacer una solicitud al backend para invalidar el token, si es necesario.
    // Ejemplo: await logoutUser(); (dependiendo de cómo esté implementado en tu API)

    // Limpia el estado del usuario
    setUser(null);

    // Redirige al usuario a la página de inicio de sesión
    //navigate('/login');

    setIsLoggingOut(false);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h5" align="center" sx={{ mt: 8 }}>
        Cerrar sesión
      </Typography>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleLogout}
        disabled={isLoggingOut}
      >
        {isLoggingOut ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Cerrar Sesión"
        )}
      </Button>
    </Container>
  );
};

export default Logout;
