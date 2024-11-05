import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import { formatDate2 } from "../../utils/validaciones";

const PendingInvitationCard = ({ request, showButton = true }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "info.gray",
        borderRadius: "15px",
        padding: 2,
        mb: 5,
      }}
    >
      <Box
        sx={{
          display: { xs: "block", sm: "flex" },
          flexDirection: "column",
          mb: 1,
          mt: 3,
          mr: 3,
          ml: 3,
        }}
      >
        <Box sx={{ flex: 1, mr: 2, mb: 3 }}>
          <Typography
            component="h1"
            align="center"
            sx={{ fontSize: "40px", lineHeight: "1" }}
          >
            {request.company.long_name}
          </Typography>
          <Typography component="h2" align="center" sx={{ fontSize: "26px" }}>
            {request.company.short_name}
          </Typography>

          <Typography
            component="p"
            sx={{ color: "info.details", fontSize: "14px" }}
          >
            <PersonIcon />
            Cuenta con {request.company.members_count} integrantes.
          </Typography>

          <Typography
            component="p"
            sx={{ color: "info.details", fontSize: "14px" }}
          >
            <CalendarMonthIcon />
            La solicitud se realizó el {formatDate2(request.created_at)}.
          </Typography>
        </Box>
        {showButton ? (
          <Button
            onClick={() =>
              navigate(`/invitation/${request.id}/pending`, {
                state: { request },
              })
            }
            variant="contained"
            color="primary"
            sx={{
              mb: 2,
              px: 12,
              py: 1,
              position: "relative",
            }}
          >
            Ver invitación
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default PendingInvitationCard;
