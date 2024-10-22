import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/login");
    } else if (user.user_type === "D") {
      navigate("/academic-periods");
    } else if (user.user_type === "E") {
      navigate("/student-home");
    }
  }, [user, navigate]);

  return null;
};

export default Home;
