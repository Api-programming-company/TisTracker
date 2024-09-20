import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import UserRegister from "./UserRegister";
import { AcademicPeriodList, CompanyList } from "../components";

const Home = () => {
  const { user } = useContext(AppContext);
  return (
    <>
      {user === null ? (
        <UserRegister />
      ) : user.user_type === "docente" ? (
        <AcademicPeriodList />
      ) : (
        <CompanyList/>  
      )}
    </>
  );
};

export default Home;
