import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Entregable from "./Entregable";

const VerHito = ({ entregable, onDelete }) => {
  // en entregable esta id, nombre_hito, fecha_ini, fecha_entrega, cobro, hu: []
  const [formData, setFormData] = useState(entregable);
  const [editar, setEditar] = useState(true);


  // para dialog -----------------
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelarGuardado = () => {
    setEditar(!editar)
    setOpen(false);
  };

  const handleAceptarGuardado = () => {
    //post enviar formData para que guarde los datos del hito acorde a su id
    console.log(formData);
    setOpen(false);
  };
  // ----------------------------

  const handleUpdateEntregable = (updatedData) => {
    setFormData((prevState) => {
      const newFormData = { ...prevState, ...updatedData };
      return newFormData;
    });
  };

  const handleClickButton = () => {
    if (!editar) {
      handleClickOpen();
    }
    setEditar(!editar);
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
          onClick={handleClickButton}
        >
          {editar ? "Editar hito" : "Guardar"}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Guardar cambios"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Estás seguro de que deseas guardar los cambios realizados?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelarGuardado}>Rechazar</Button>
            <Button onClick={handleAceptarGuardado} autoFocus>
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
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
