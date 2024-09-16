import React, { createContext, useState, useEffect } from "react";
import { useCheckUserQuery } from "../api/userApi";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { data: data, error, isLoading } = useCheckUserQuery();
  const [userType, setUserType] = useState(null); // 'docente', 'estudiante', o null

  useEffect(() => {
    if (data) {
      setUserType(data.user.user_type);
      console.log("el usuario es: ", data);
    }
  }, [data]);


  return (
    <AppContext.Provider value={{ userType, setUserType }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
