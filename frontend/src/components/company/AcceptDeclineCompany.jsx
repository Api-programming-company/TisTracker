import { Box, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

const AcceptDeclineCompany = () => {
  const invitacionesEjemplo = {
    message: "Compañías pendientes obtenidas correctamente.",
    company: {
      id: 33,
      long_name: "asdfasasdasf",
      short_name: "asdas",
      email: "asdasd@sadas.com",
      address: "sdasdasd",
      phone: "77665453",
      academic_period_id: 1,
      created_at: "2024-09-24T05:58:41.000000Z",
      updated_at: "2024-09-27T02:56:01.000000Z",
      status: "A",
      members_count: 2,
      members: [
        {
          user_id: 8,
          email: "123456789@est.umss.edu",
          pivot: {
            company_id: 33,
            user_id: 8,
            status: "P",
            permission: "W",
            created_at: "2024-09-24T05:58:42.000000Z",
            updated_at: "2024-09-24T05:58:42.000000Z",
          },
        },
      ],
    },
    invitation_date: "2024-09-24T05:58:42.000000Z",
  };

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
