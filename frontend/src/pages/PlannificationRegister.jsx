import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CompanyPlanning from "../components/company/CompanyPlanning";
import { useState } from "react";

const PlannificationRegister = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    milestones: [],
  });
  const [sendData, setSendData] = useState({
    milestones: [],
  });
  return (
    <CompanyPlanning
      milestones={formData.milestones}
      setFormData={setFormData}
      setSendData={setSendData}
    />
  );
};

export default PlannificationRegister;
