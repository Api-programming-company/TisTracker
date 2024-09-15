import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import UserRegister from "./UserRegister";
import { ListaPeriodosAcademicos } from "../components";

const Home = () => {
  const { userType } = useContext(AppContext);
  return (
    <>
      {userType === "estudiante" ? (
        <div>Es estudiante</div>
      ) : userType === "docente" ? (
        <ListaPeriodosAcademicos />
      ) : (
        <UserRegister />
      )}
    </>
  );
};

export default Home;
