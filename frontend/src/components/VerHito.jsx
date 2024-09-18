import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import VerEntregable from "./VerEntregable";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";

const VerHito = ({ id, nombre_hito, fecha_ini, fecha_entrega, cobro, hu }) => {
  const navigate = useNavigate();

  const handleEditHito = () => {
    let y = fecha_ini.split("/");
    fecha_ini = y[1] + "/" + y[0] + "/" + y[2];
    let z = fecha_entrega.split("/");
    fecha_entrega = z[1] + "/" + z[0] + "/" + z[2];

    navigate(`/edithito/${id}`, {
      state: { id, nombre_hito, fecha_ini, fecha_entrega, cobro, hu },
    });
  };
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: 2,
        borderRadius: 1,
        position: "relative",
        marginBottom: 3,
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginY: 2 }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Hito
        </Typography>

        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={handleEditHito}
        >
          Editar hito
        </Button>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="subtitle"
          sx={{ margin: "0px 5px", fontWeight: "bold", marginBottom: 2 }}
        >
          Nombre de Hito:{" "}
        </Typography>
        <Chip
          label={nombre_hito}
          variant="outlined"
          sx={{
            fontSize: "larger",
            marginBottom: 2,
            height: "auto",
            width: "100%",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          flexWrap: "wrap",
          "& > *": {
            flex: 1,
            minWidth: { xs: "100%", sm: "auto" },
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="subtitle"
            sx={{ margin: "0px 5px", fontWeight: "bold", marginBottom: 2 }}
          >
            Fecha de inicio:{" "}
          </Typography>
          <Chip
            label={fecha_ini}
            variant="outlined"
            sx={{
              fontSize: "larger",
              height: "auto",
              marginBottom: 2,
              width: "100%",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography
            variant="subtitle"
            sx={{ margin: "0px 5px", fontWeight: "bold", marginBottom: 2 }}
          >
            Fecha de entrega:{" "}
          </Typography>
          <Chip
            label={fecha_entrega}
            variant="outlined"
            sx={{
              fontSize: "larger",
              height: "auto",
              marginBottom: 2,
              width: "100%",
              "& .MuiChip-label": {
                display: "block",
                whiteSpace: "normal",
              },
            }}
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography
          variant="subtitle"
          sx={{ margin: "0px 5px", fontWeight: "bold" }}
        >
          Porcentaje de cobro en (%):{" "}
        </Typography>
        <Chip
          label={cobro}
          variant="outlined"
          sx={{
            fontSize: "larger",
            height: "auto",
            width: "100%",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
        />
      </Box>
      <Typography variant="h5" sx={{ marginY: 2, fontWeight: "bold" }}>
        Entregables
      </Typography>
      <Stack spacing={2}>
        {hu.map((e) => (
          <VerEntregable
            key={e.id}
            nombre_entregable={e.nombre_hu}
            responsable={e.responsable}
            objetivo={e.objetivo}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default VerHito;
