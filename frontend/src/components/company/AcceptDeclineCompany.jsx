import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const AcceptDeclineCompany = () => {
  const company = useLocation().state.request;
  return (
    <Box sx={{ mt: 5, mb: 10 }}>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ textAlign: "center", mb: 3 }}
      >
        Detales de la solicitud
      </Typography>
    </Box>
  );
};

export default AcceptDeclineCompany;
