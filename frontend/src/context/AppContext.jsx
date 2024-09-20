import React, { createContext, useState, useEffect } from "react";
import { useLazyCheckUserQuery, useLogoutUserMutation } from "../api/userApi";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const saveUserToLocalStorage = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  };
  
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
  };
  
  const [checkUser, { data, error, isError, isSuccess, isLoading }] =
    useLazyCheckUserQuery();
  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutUserMutation();
  const navigate = useNavigate();
  // Iniciamos el user con los datos del localstorage si existen
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user === null) {
      checkUser();
    }
  }, [user, checkUser]);

  useEffect(() => {
    if (data) {
      setUser(data.user);
      saveUserToLocalStorage(data.user); // Guardar el usuario en el localStorage
      console.log("el usuario es: ", data);
    }
    if (isError) {
      console.log(error);
      removeUserFromLocalStorage(); // Eliminar el usuario en caso de error
    }
  }, [data, isSuccess, isError]);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap(); // Llama a la mutación de logout y espera a que se complete
      setUser(null);
      removeUserFromLocalStorage();
      navigate("/login"); // Redirige al usuario a la página de inicio de sesión
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
      // Manejo de errores si es necesario
    }
  };
  return (
    <AppContext.Provider value={{ user, setUser, handleLogout, removeUserFromLocalStorage }}>
      {isLoading || isLoggingOut ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        children
      )}
    </AppContext.Provider>
  );
};


export default AppContext;
