import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

const DialogMod = ({
  open,
  setOpen,
  title,
  content,
  onAccept,
  paramsAccept = null,
  onCancel = null,
  paramsCancel = null,
  showButtonCancel = true,
}) => {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (onCancel === null) {
      setOpen(false);
      return;
    }
    onCancel(paramsCancel);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {showButtonCancel ? <Button onClick={handleClose}>Cancelar</Button> : null}
        <Button onClick={() => onAccept(paramsAccept)} autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogMod;
