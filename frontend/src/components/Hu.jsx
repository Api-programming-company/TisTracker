import { Box, TextField, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

const Hu = ({ handleEliminarHu, index, onUpdate, info }) => {
  const theme = useTheme();

  const [huData, setHuData] = useState({
    id: info?.id,
    nombre_hu: info?.nombre_hu || "",
    responsable: info?.responsable || "",
    objetivo: info?.objetivo || "",
  });

  const [errors, setErrors] = useState({
    nombre_hu: "",
    responsable: "",
    objetivo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHuData({ ...huData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    onUpdate(huData)
  };

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
          name="nombre_hu"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={handleInputChange}
          multiline
        />
        <TextField
          label="Responsable"
          name="responsable"
          variant="outlined"
          fullWidth
          sx={{ mb: 2 }}
          onChange={handleInputChange}
          multiline
        />

        <TextField
          label="Objetivo"
          name="objetivo"
          variant="outlined"
          fullWidth
          sx={{ gridColumn: { xs: "1", sm: "1/3" } }}
          onChange={handleInputChange}
          multiline
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
