import React, { useState, useEffect, useCallback } from "react";
import { Button, ListItem, ListItemText, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMod from "../DialogMod";

const Deliverable = ({ deliverable, onChange, onDelete ,milestone_id}) => {
  const [name, setName] = useState(deliverable.name);
  const [responsible, setResponsible] = useState(deliverable.responsible);
  const [objective, setObjective] = useState(deliverable.objective);
  const [open, setOpen] = useState(false);




  const updateDeliverable = useCallback(() => {
    onChange({ ...deliverable, name, responsible, objective },milestone_id);

  },[ name, objective, responsible]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleResponsibleChange = (e) => {
    setResponsible(e.target.value);
  }

  const handleObjectiveChange = (e) => {
    setObjective(e.target.value);
  }

  useEffect(() => {
    updateDeliverable();
  }, [updateDeliverable]);

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
            onChange={handleNameChange}
            label="Nombre"
            fullWidth
            multiline
            sx={{ mr: 2, mb: 2 }}
          />
          <TextField
            value={responsible}
            onChange={handleResponsibleChange}
            label="Responsable"
            fullWidth
            multiline
            sx={{ mr: 2, mb: 2 }}
          />
          <TextField
            value={objective}
            onChange={handleObjectiveChange}
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
