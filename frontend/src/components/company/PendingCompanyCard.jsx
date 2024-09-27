import { Box, Button, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/validaciones";

const PendingCompanyCard = ({ request }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "whitesmoke",
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
            sx={{ color: "black", fontSize: "40px", lineHeight: "1" }}
          >
            {request.long_name}
          </Typography>
          <Typography
            component="h2"
            align="center"
            sx={{ color: "black", fontSize: "26px" }}
          >
            {request.short_name}
          </Typography>

          <Typography component="p" sx={{ color: "#8E9090", fontSize: "14px" }}>
            <PersonIcon />
            Cuenta con {request.members_count} integrantes.
          </Typography>

          <Typography component="p" sx={{ color: "#8E9090", fontSize: "14px" }}>
            <CalendarMonthIcon />
            La solicitud se realizó el {formatDate(request.created_at)}.
          </Typography>
        </Box>

        <Button
          onClick={() => navigate(`/request/${request.id}/pending`, {state: {request}})}
          variant="contained"
          color="primary"
          sx={{
            mb: 2,
            px: 12,
            py: 1,
            position: "relative",
          }}
        >
          Ver solicitud
        </Button>
      </Box>
    </Box>
  );
};

export default PendingCompanyCard;
