import React, { useState } from "react";
import { Box, Typography, List, Button } from "@mui/material";
import Milestone from "./Milestone";
import { useUpdateCompanyPlanningByIdMutation } from "../../api/companyApi";
import DialogMod from "../DialogMod";
import { CiCirclePlus } from "react-icons/ci";


const CompanyPlanning = ({ setFormData, setSendData }) => {
  const [isEditing, setIsEditing] = useState(false);
  //const [milestones, setMilestones] = useState([...milestones]); // Estado para los hitos en edición
  const [open, setOpen] = useState(false);
  const [milestones,setMilestones] = useState([]);


  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);

    // Si se cancela la edición, reinicia los hitos temporales
    if (isEditing) {
        }
  };

  const handleConfirm = () => {
    setFormData((prev) => ({
      ...prev,
      milestones: milestones, // Confirma los hitos temporales al formData
    }));
    setIsEditing(false);

    setSendData(true)
  };

  const handleMilestoneChange = (updatedMilestone) => {
    const updatedMilestones = milestones.map((milestone) =>
      milestone.id === updatedMilestone.id ? updatedMilestone : milestone
    );

    setMilestones(updatedMilestones); // Actualiza la lista temporal
  };

  const handleAddMilestone = () => {
    const newMilestone = {
      name: "Nuevo Hito",
      start_date: new Date(),
      end_date: new Date(),
      deliverables: [],
    };

    setMilestones((prev) => [...prev, newMilestone]); // Agrega el nuevo hito a la lista temporal
  };

  const handleDeleteMilestone = (id) => {
    const updatedMilestones = milestones.filter((e)=> e.id !== id)
    setMilestones(updatedMilestones)
  }

  return (
    <div className="container">
      
      <Typography
            component="h1"
            sx={{ color: "black", fontSize: "40px", lineHeight: "1" }}
          >Planificación de equipo</Typography>
      <List>
        {milestones.length > 0 ? (
          milestones.map((milestone) => (
            <Milestone
              key={milestone.id}
              milestone={milestone}
              isEditing={isEditing}
              onChange={handleMilestoneChange}
              onDelete={handleDeleteMilestone}
            />
          ))
        ) : (
          <p>No hay hitos asignados</p>
        )}
      </List>
      
          
          <Button
            color="primary"
            onClick={handleAddMilestone}
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                color: "white",
                backgroundColor: "primary.dark",
              },
              mr: 2,
              mb: 2,
            }}
          >
            <i><CiCirclePlus /></i> Agregar Hito
          </Button>

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
    </div>
    );
};

export default CompanyPlanning;
