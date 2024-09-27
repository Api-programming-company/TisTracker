import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,

} from "@mui/material";
import { useGetPendingCompaniesRequestQuery } from "../api/studentApi";
import PendingInvitationCard from "../components/student/PendingInvitationCard";

const InvitacionesGE = () => {
  const invitacionesEjemplo = {
    message: "Compañías pendientes obtenidas correctamente.",
    companies: [
      {
        company: {
          id: 14,
          long_name: "Empresa de simon",
          short_name: "simcorp",
          email: "simon@gmail.com",
          address: "umss",
          phone: "12345678",
          academic_period_id: 13,
          created_at: "2024-09-24T01:13:08.000000Z",
          updated_at: "2024-09-24T01:25:43.000000Z",
          status: "A",
          members_count: 4,
          members: [
            {
              user_id: 8,
              email: "123456789@est.umss.edu",
              pivot: {
                company_id: 14,
                user_id: 8,
                status: "P",
                permission: "R",
                created_at: "2024-09-24T01:13:10.000000Z",
                updated_at: "2024-09-24T01:13:10.000000Z",
              },
            },
          ],
        },
        invitation_date: "2024-09-24T01:13:10.000000Z",
      },
      {
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
      },
    ],
  };

  //-----------------------------------------------------------

  // const { data, error, isSuccess, isFetching, isError } =
  //   useGetPendingCompaniesRequestQuery();


  // Estados para manejar invitaciones y mensajes
  const [invitations, setInvitations] = useState(invitacionesEjemplo.companies);

  // if (isFetching) {
  //   return (
  //     <Container
  //       maxWidth="sm"
  //       sx={{
  //         display: "flex",
  //         justifyContent: "center",
  //         alignItems: "center",
  //         height: "80vh",
  //       }}
  //     >
  //       <CircularProgress />
  //     </Container>
  //   );
  // }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 5, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center", mb: 3 }}
        >
          Invitaciones de Grupo Empresas
        </Typography>

        {invitations.length === 0 && (
          <Typography variant="h6" align="center" color="textSecondary">
            No tienes invitaciones pendientes.
          </Typography>
        )}

        {invitations.map((invitation) => (
          <PendingInvitationCard
            key={invitation.company.id}
            request={invitation}
          />
        ))}
      </Box>
    </Container>
  );
};

export default InvitacionesGE;
