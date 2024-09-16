import React, { createContext, useState, useEffect } from "react";
import { useLazyCheckUserQuery } from "../api/userApi";
import { CircularProgress, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [checkUser, { data, error, isError, isSuccess, isLoading }] =
    useLazyCheckUserQuery();
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
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {isLoading ? (
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

const saveUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

export default AppContext;
