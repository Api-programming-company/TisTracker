import React, { useState, useEffect, useCallback } from "react";
import { Button, ListItem, ListItemText, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMod from "../DialogMod";
import { usePlanningContext } from "../../context/PlanningContext";

const Deliverable = ({ deliverable,milestone_id}) => {
  const [open, setOpen] = useState(false);
  const {changeDeliverable,deleteDeliverable} = usePlanningContext();

  const handleChange = (action, payload)  =>{
    switch (action) {
      case "handleNameChange":
        changeDeliverable(milestone_id, deliverable.id, { name: payload });
        break;
      default:
        break;
    }
  }

  return (
    <ListItem
      sx={{
        display: { xs: "block", sm: "flex" },
        justifyContent: "space-between",
      }}
    >
      
        <>
          <TextField
            value={deliverable.name}
            onChange={(e) => handleChange("handleNameChange", e.target.value)}
            label="Nombre"
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
            title={"Eliminar entregable \"" + deliverable.name + "\""}
            content={"¿Está seguro de realizar esta acción?"}
            onAccept={() => {
              setOpen(false);
              deleteDeliverable(milestone_id, deliverable.id)
            }}
            paramsAccept={deliverable.id}
            onCancel={() => setOpen(false)}
          />
        </>
    </ListItem>
  );
};

export default Deliverable;
