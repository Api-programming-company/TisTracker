import React, { useState, useEffect } from "react";
import { ListItem, ListItemText, TextField } from "@mui/material";

const Deliverable = ({ deliverable, isEditing, onChange }) => {
  const [name, setName] = useState(deliverable.name);
  const [responsible, setResponsible] = useState(deliverable.responsible);
  const [objective, setObjective] = useState(deliverable.objective);

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
      {isEditing ? (
        <>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nombre"
            fullWidth
            sx={{ mr: 2, mb: 2 }}
          />
          <TextField
            value={responsible}
            onChange={(e) => setResponsible(e.target.value)}
            label="Responsable"
            fullWidth
            sx={{ mr: 2, mb: 2 }}
          />
          <TextField
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            label="Objetivo"
            fullWidth
            sx={{ mr: 2, mb: 2 }}
          />
        </>
      ) : (
        <ListItemText
          primary={name}
          secondary={`Responsable: ${responsible} | Objetivo: ${objective}`}
        />
      )}
    </ListItem>
  );
};

export default Deliverable;
