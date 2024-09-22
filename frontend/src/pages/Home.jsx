import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import UserRegister from "./UserRegister";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/register");
    } else if (user.user_type === "docente") {
      navigate("/academic-periods");
    } else if (user.user_type === "estudiante") {
      if (user.academic_period_id) {
        navigate(`/academic-period/${user.academic_period_id}/companies`);
      } else {
        navigate("/enroll-to-ap");
      }
    }
  }, [user, navigate]);

  return null;
};

export default Home;
