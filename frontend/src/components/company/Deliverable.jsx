import React, { useState, useEffect } from "react";
import { Button, ListItem, ListItemText, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMod from "../DialogMod";

const Deliverable = ({ deliverable, isEditing, onChange, onDelete }) => {
  const [name, setName] = useState(deliverable.name);
  const [responsible, setResponsible] = useState(deliverable.responsible);
  const [objective, setObjective] = useState(deliverable.objective);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    onChange({ ...deliverable, name, responsible, objective });
  }, [name, responsible, objective]);

  return (
    <ListItem
      sx={{
        display: { xs: "block", sm: "flex" },
        justifyContent: "space-between",
      }}
    >
      
        <>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nombre"
            fullWidth
            multiline
            sx={{ mr: 2, mb: 2 }}
          />
          <TextField
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            label="Responsable"
            fullWidth
            multiline
            sx={{ mr: 2, mb: 2 }}
          />
          <TextField
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            label="Objetivo"
            fullWidth
            multiline
            sx={{ mr: 2, mb: 2 }}
          />

          <Button
            variant="outlined"
            sx={{
              backgroundColor: "transparent",
              border: "1px solid black",
              "&:hover": {
                color: "white",
                backgroundColor: "primary.dark",
              },
              mr: 2,
              mb: 2,
            }}
            startIcon={<DeleteIcon />}
            onClick={() => setOpen(true)}
          ></Button>

          <DialogMod
            open={open}
            setOpen={setOpen}
            title={"Eliminar hito"}
            content={"¿Está seguro de realizar esta acción?"}
            onAccept={onDelete}
            paramsAccept={deliverable.id}
            onCancel={() => setOpen(false)}
          />
        </>
    </ListItem>
  );
};

export default Deliverable;
