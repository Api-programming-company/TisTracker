import { Box, Chip, Stack, Typography } from "@mui/material";
import React from "react";
import VerEntregable from "./VerEntregable";

const VerHito = ({ nombre, fecha_ini, fecha_entrega, cobro, hu }) => {
  return (
    <Box
      sx={{
        border: "1px solid #ddd",
        padding: 2,
        borderRadius: 1,
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" sx={{ margin: "0px 5px", fontWeight: 'bold'}}>
          Nombre de Hito:{" "}
        </Typography>
        <Chip label={nombre} variant="outlined" sx={{fontSize: 'larger'}}/>
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
          <Typography variant="h6" sx={{ margin: "0px 5px", fontWeight: 'bold' }}>
            Fecha de inicio:{" "}
          </Typography>
          <Chip label={fecha_ini} variant="outlined" sx={{fontSize: 'larger'}}/>
        </Box>

        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ margin: "0px 5px", fontWeight: 'bold' }}>
            Fecha de entrega:{" "}
          </Typography>
          <Chip label={fecha_entrega} variant="outlined" sx={{fontSize: 'larger'}}/>
        </Box>
      </Box>
      <Box sx={{ display: "flex" }}>
        <Typography variant="h6" sx={{ margin: "0px 5px", fontWeight: 'bold' }}>
          Porcentaje de cobro en (%):{" "}
        </Typography>
        <Chip label={cobro} variant="outlined" sx={{fontSize: 'larger'}}/>
      </Box>
      <Typography variant="h4" sx={{ marginY: 2 }}>
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
