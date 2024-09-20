import {
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Entregable from "./Entregable";

const VerHito = ({ entregable, onDelete, editar, setEditar, onUpdate }) => {
  // en entregable esta id, nombre_hito, fecha_ini, fecha_entrega, cobro, hu: []
  const [formData, setFormData] = useState(entregable);

  const handleUpdateEntregable = (updatedData) => {
    setFormData((prevState) => {
      const newFormData = { ...prevState, ...updatedData };
      onUpdate(newFormData)
      return newFormData;
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
      <Box sx={{ display: "flex", justifyContent: "space-evenly", marginY: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Hito
        </Typography>

      </Box>

      <Entregable
        entregable={formData}
        onDelete={onDelete}
        onUpdate={handleUpdateEntregable}
        toEdit={editar}
      />
    </Box>
  );
};

export default VerHito;
