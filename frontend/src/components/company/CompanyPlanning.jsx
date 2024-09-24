import React, { useState } from "react";
import { Box, Typography, List, Button } from "@mui/material";
import Milestone from "./Milestone";
import { useUpdateCompanyPlanningByIdMutation } from "../../api/companyApi";
import DialogMod from "../DialogMod";

const CompanyPlanning = ({ milestones, setFormData, setSendData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMilestones, setTempMilestones] = useState([...milestones]); // Estado para los hitos en edición
  const [open, setOpen] = useState(false);

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);

    // Si se cancela la edición, reinicia los hitos temporales
    if (isEditing) {
      setTempMilestones([...milestones]); // Reinicia a los hitos originales
    }
  };

  const handleConfirm = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: tempMilestones, // Confirma los hitos temporales al formData
    }));
    setIsEditing(false);

    setSendData(true)
  };

  const handleMilestoneChange = (updatedMilestone) => {
    const updatedMilestones = tempMilestones.map((milestone) =>
      milestone.id === updatedMilestone.id ? updatedMilestone : milestone
    );

    setTempMilestones(updatedMilestones); // Actualiza la lista temporal
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      name: "Nuevo Hito",
      start_date: new Date(),
      end_date: new Date(),
      deliverables: [],
    };

    setTempMilestones((prev) => [...prev, newMilestone]); // Agrega el nuevo hito a la lista temporal
  };

  const handleDeleteMilestone = (id) => {
    const updatedMilestones = tempMilestones.filter((e)=> e.id !== id)
    setTempMilestones([...updatedMilestones])
  }

  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Planificación de la Grupo Empresa
      </Typography>
      <Button
        onClick={handleEditToggle}
        sx={{
          ...(isEditing
            ? {
                backgroundColor: "transparent",
                border: "1px solid black",
                "&:hover": {
                  color: "white",
                  backgroundColor: "primary.dark",
                },
              }
            : {
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }),
          mb: 2,
          mr: 2,
        }}
      >
        {isEditing ? "Cancelar" : "Editar"}
      </Button>

      {isEditing && (
        <>
          <Button
            onClick={() => setOpen(true)}
            sx={{
              backgroundColor: "transparent",
              border: "1px solid black",
              "&:hover": {
                color: "white",
                backgroundColor: "primary.dark",
              },
              mb: 2,
              mr: 2,
            }}
          >
            Confirmar
          </Button>
          <DialogMod
            open={open}
            setOpen={setOpen}
            title={"Confirmar"}
            content={"¿Está seguro de realizar esta acción?"}
            onAccept={handleConfirm}
            onCancel={() => setOpen(false)}
          />
          <Button
            color="primary"
            onClick={handleAddMilestone}
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
          >
            Agregar Hito
          </Button>
        </>
      )}
      <List>
        {tempMilestones.length > 0 ? (
          tempMilestones.map((milestone) => (
            <Milestone
              key={milestone.id}
              milestone={milestone}
              isEditing={isEditing}
              onChange={handleMilestoneChange}
              onDelete={handleDeleteMilestone}
            />
          ))
        ) : (
          <Typography>No hay hitos asignados.</Typography>
        )}
      </List>
    </Box>
  );
};

export default CompanyPlanning;
