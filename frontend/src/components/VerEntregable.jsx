import { useTheme } from "@emotion/react";
import { Box, Chip, Typography } from "@mui/material";
import React from "react";

const VerEntregable = ({ nombre_entregable, responsable, objetivo }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          "& > *": {
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            flex: 1,
            minWidth: { xs: "100%", sm: "auto" },
            boxSizing: "border-box",
          },
        }}
      >
        <Box sx={{ display: "flex" }}>
          <Typography
            variant="subtitle"
            sx={{ margin: "0px 5px", fontWeight: "bold",marginBottom: 2 }}
          >
            Nombre de entregable:{" "}
          </Typography>
          <Chip
            label={nombre_entregable}
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

        <Box sx={{ display: "flex", gap: 0 }}>
          <Typography
            variant="subtitle"
            sx={{ margin: "0px 5px", fontWeight: "bold",marginBottom: 2 }}
          >
            Responsable:{" "}
          </Typography>
          <Chip
            label={responsable}
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
            sx={{ margin: "0px 5px", fontWeight: "bold" }}
          >
            Objetivo:{" "}
          </Typography>
          <Chip
            label={objetivo}
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
      </Box>
    </Box>
  );
};

export default VerEntregable;
