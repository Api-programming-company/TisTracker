import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Entregable from "./Entregable";

const VerHito = ({ entregable }) => {
  // en entregable esta id, nombre_hito, fecha_ini, fecha_entrega, cobro, hu: []
  const [formData, setFormData] = useState(entregable)
  const [editar, setEditar] = useState(true);

  const handleAgregarEntregable = () => {
    // setEntregables([
    //   ...entregables,
    //   { id: Date.now(), nombre_hito: "", fecha_ini: "", fecha_entrega: "", cobro: "", hu: [] }
    // ]);
  };

  const handleUpdateEntregable = (updatedData) => {
    setFormData((prevState)=>{
      const newFormData = {...prevState, ...updatedData}
      return newFormData
    });
  };

  const handleEliminarEntregable = (id) => {
    // setEntregables(entregables.filter(entregable => entregable.id !== id));
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

        <Button
          variant="contained"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => setEditar(!editar)}
        >
          {editar ? "Editar hito" : "Guardar"}
        </Button>
      </Box>

      <Entregable
        entregable={formData}
        onDelete={handleEliminarEntregable}
        onUpdate={handleUpdateEntregable}
        toEdit={editar}
      />
    </Box>
  );
};

export default VerHito;
