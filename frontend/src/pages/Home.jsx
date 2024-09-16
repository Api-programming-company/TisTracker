import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import UserRegister from "./UserRegister";
import { ListaPeriodosAcademicos } from "../components";

const Home = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      {user.user_type === "estudiante" ? (
        <div>Es estudiante</div>
      ) : user.user_type === "docente" ? (
        <ListaPeriodosAcademicos />
      ) : (
        <UserRegister />
      )}
    </>
  );
};

export default Home;
