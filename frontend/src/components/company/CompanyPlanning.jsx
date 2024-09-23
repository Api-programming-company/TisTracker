import React, { useState } from "react";
import { Box, Typography, List, Button } from "@mui/material";
import Milestone from "./Milestone";

const CompanyPlanning = ({ milestones, setFormData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMilestones, setTempMilestones] = useState([...milestones]); // Estado para los hitos en edición

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
  };

  const handleMilestoneChange = (updatedMilestone) => {
    const updatedMilestones = tempMilestones.map((milestone) =>
      milestone.id === updatedMilestone.id ? updatedMilestone : milestone
    );

    setTempMilestones(updatedMilestones); // Actualiza la lista temporal
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      id: Date.now(), // Genera un ID único basado en la fecha actual
      name: "Nuevo Hito",
      start_date: new Date(),
      end_date: new Date(),
      deliverables: []
    };

    setTempMilestones((prev) => [...prev, newMilestone]); // Agrega el nuevo hito a la lista temporal
  };

  return (
    <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2, mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        Planificación de la Compañía
      </Typography>
      <Button onClick={handleEditToggle}>
        {isEditing ? "Cancelar" : "Editar"}
      </Button>
      {isEditing && (
        <>
          <Button onClick={handleConfirm}>Confirmar</Button>
          <Button onClick={handleAddMilestone} sx={{ ml: 2 }}>
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
