import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress } from "@mui/material";
import { useGetPendingCompaniesRequestQuery } from "../api/studentApi";
import PendingInvitationCard from "../components/student/PendingInvitationCard";

const InvitacionesGE = () => {
  const { data, error, isSuccess, isFetching, isError } =
    useGetPendingCompaniesRequestQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log("Pending Companies data:", data);
      console.log(data?.companies);
    }

    if (isError) {
      console.error("Error fetching pending companies:", error);
    }
  }, [isSuccess, isError, data, error]);

  if (isFetching) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 1 }}
        >
          Invitaciones de Grupo Empresas
        </Typography>

        {data?.companies.length === 0 && (
          <Typography variant="h6" align="center" color="textSecondary">
            No tienes invitaciones pendientes.
          </Typography>
        )}

        {data?.companies.map((invitation) => (
          <PendingInvitationCard key={invitation.company_user.id} request={invitation.company_user} />
        ))}
      </Box>
    </Container>
  );
};

export default InvitacionesGE;
