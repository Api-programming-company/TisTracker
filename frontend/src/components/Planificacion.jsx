import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Entregable from "./Entregable";
import AddIcon from "@mui/icons-material/Add";

const Planificacion = () => {
  const [entregables, setEntregables] = useState([]);

  const handleAgregarEntregable = () => {
    setEntregables([
      ...entregables,
      { id: Date.now(), nombre_hito: "", fecha_ini: "", fecha_entrega: "", cobro: "", hu: [] }
    ]);
  };

  const handleEliminarEntregable = (id) => {
    setEntregables(entregables.filter(entregable => entregable.id !== id));
  };

  const handleUpdateEntregable = (updatedData) => {
    setEntregables(
      entregables.map(entregable =>
        entregable.id === updatedData.id ? updatedData : entregable
      )
    );
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h4" sx={{ marginY: 2 }}>
        Planificación de Entregables
      </Typography>

      <Stack spacing={2}>
        {entregables.map((entregable) => (
          <Box key={entregable.id} sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 1, position: 'relative' }}>
            <Entregable
              entregable={entregable}
              onUpdate={handleUpdateEntregable}
              onDelete={() => handleEliminarEntregable(entregable.id)}
            />
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAgregarEntregable}
          >
            Agregar entregable
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Planificacion;
