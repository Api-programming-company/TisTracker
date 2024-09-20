import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import UserRegister from "./UserRegister";
import { ListaPeriodosAcademicos, CompanyList } from "../components";

const Home = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      {user === null ? (
        <UserRegister />
      ) : user.user_type === "docente" ? (
        <ListaPeriodosAcademicos />
      ) : (
        <CompanyList/>  
      )}
    </>
  );
};

export default Home;
