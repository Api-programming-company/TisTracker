import { Box, TextField, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

const Hu = ({ handleEliminarHu, index }) => {
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
      <Box>
        <TextField
          label="Nombre del hito*"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Responsable"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
        />

        <TextField
          label="Objetivo"
          variant="outlined"
          fullWidth
          sx={{ gridColumn: { xs: "1", sm: "1/3" } }}
        />
      </Box>

      <IconButton
        onClick={() => handleEliminarHu(index)}
        color="error"
        aria-label="Eliminar hito"
        sx={{ justifySelf: "center" }}
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default Hu;
