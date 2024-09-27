import { Box, Button, Icon, Typography } from "@mui/material";
import React from "react";
import DialogMod from "./DialogMod";

const SolicitudesGECard = ({
  request,
  setSelectedCompany,
  isUpdateLoading,
  handleAccept,
  handleDecline,
  openA,
  setOpenA,
  openR,
  setOpenR
}) => {
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
          justifyContent: "space-between",
          mb: 1,
          mt: 3,
          mr: 3,
          ml: 3,
        }}
      >
        <Box sx={{ flex: 1, mr: 2, mb: 3 }}>
          <Typography
            component="h1"
            sx={{ color: "black", fontSize: "36px", lineHeight: "1" }}
          >
            {request.short_name}
          </Typography>
          <Typography component="h2" sx={{ color: "black" }}>
            {request.long_name}
          </Typography>
          <Typography component="p" sx={{ color: "#8E9090", fontSize: "14px" }}>
            <Icon>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077063.png"
                alt="Icono persona"
                style={{
                  width: "17px",
                  height: "17px",
                }}
              />
            </Icon>{" "}
            {request.members_count} integrantes
          </Typography>
          <Typography component="p" sx={{ color: "#8E9090", fontSize: "14px" }}>
            Desean formar parte del grupo de TIS
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            mb: 3,
          }}
        >
          <Button
            onClick={() => {
              setSelectedCompany(request.id);
              setOpenA(true);
            }}
            variant="contained"
            disabled={isUpdateLoading}
            color="primary"
            sx={{
              mb: 2,
              px: 12,
              py: 1,
              position: "relative",
            }}
          >
            ACEPTAR
          </Button>
          <DialogMod
            open={openA}
            setOpen={setOpenA}
            title={"Confirmar"}
            content={"¿Está seguro de que desea aceptar esta solicitud?"}
            onAccept={handleAccept}
            paramsAccept={request.id}
          />

          <Button
            onClick={() => setOpenR(true)}
            variant="contained"
            color="transparent"
            disabled={isUpdateLoading}
            sx={{
              px: 12,
              py: 1,
              color: "black",
              border: "1px solid black",
            }}
          >
            RECHAZAR
          </Button>
          <DialogMod
            open={openR}
            setOpen={setOpenR}
            title={"Rechazar"}
            content={"¿Está seguro de que desea rechazar esta solicitud?"}
            onAccept={handleDecline}
            paramsAccept={request.id}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default SolicitudesGECard;
