import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Registro from "./Registro";
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
        <Registro />
      )}
    </>
  );
};

export default Home;
