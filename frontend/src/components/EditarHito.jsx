import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Entregable from "./Entregable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useParams } from "react-router-dom";

const EditarHito = () => {
  const infoHito = useLocation();
  const getHito = infoHito.state;

  const [entregables, setEntregables] = useState(getHito);
  const entregable = {
    id: getHito?.id,
    nombre_hito: getHito?.nombre_hito || "",
    fecha_ini: getHito?.fecha_ini || "",
    fecha_entrega: getHito?.fecha_entrega || "",
    cobro: getHito?.cobro || "",
    hu: getHito?.hu || [],
  };

  // Para el dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //
  const handleUpdateEntregable = (updatedData) => {
    setEntregables(updatedData);
  };

  const handleDeleteHito = () => {
    // enviar post con el id para que se elimine el hito
    handleClickOpen();
  };

  const handleGuardar = () => {
    window.alert(entregables.cobro)
    //enviar al back :v
  }
  
  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginY: 2 }}
      >
        <Typography variant="h4">Edición de hito</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleDeleteHito}
          startIcon={<DeleteIcon />}
        >
          Eliminar hito
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Estás seguro de elimnar este hito?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Si eliminas el hito lo perderas de forma permanente, sin la
              posibilidad de recuperarlo.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Rechazar</Button>
            <Button onClick={handleClose} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

      <Stack spacing={2}>
        <Box
          key={entregable.id}
          sx={{
            border: "1px solid #ddd",
            padding: 2,
            borderRadius: 1,
            position: "relative",
          }}
        >
          <Entregable
            entregable={entregable}
            onUpdate={handleUpdateEntregable}
            toEdit={true}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Button variant="contained" color="primary" onClick={handleGuardar}>
            Guardar cambios
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default EditarHito;
