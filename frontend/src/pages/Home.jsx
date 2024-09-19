import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import UserRegister from "./UserRegister";
import { ListaPeriodosAcademicos, AcademicPeriodListStudent } from "../components";

const Home = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      {user === null ? (
        <UserRegister />
        
      ) : user.user_type === "docente" ? (
        <ListaPeriodosAcademicos />
      ) : (
        <AcademicPeriodListStudent/>  
      )}
    </>
  );
};

export default Home;
