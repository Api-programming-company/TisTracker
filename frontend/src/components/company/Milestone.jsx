import React, { useState } from "react";
import {
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  List,
  TextField,
  Button,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Deliverable from "./Deliverable";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMod from "../DialogMod";
import { id } from "date-fns/locale";

const Milestone = ({ milestone, onChange, onDelete,milestone_id}) => {
  const [openDeliverables, setOpenDeliverables] = useState(false);
  const [startDate, setStartDate] = useState(new Date(milestone.start_date));
  const [endDate, setEndDate] = useState(new Date(milestone.end_date));
  const [name, setName] = useState(milestone.name);
  const [open, setOpen] = useState(false)
  const [billingPercentage, setBillingPercentage] = useState(
    milestone.billing_percentage
  );

  const handleToggle = () => {
    setOpenDeliverables((prev) => !prev);
  };

  const handleDeliverableChange = (updatedDeliverable) => {
    const updatedDeliverables = milestone.deliverables.map((deliverable) =>
      deliverable.id === updatedDeliverable.id
        ? updatedDeliverable
        : deliverable
    );

    onChange({ ...milestone, deliverables: updatedDeliverables },milestone_id);
  };

  const handleNameChange = (newName) => {
    setName(newName);
    onChange({ ...milestone, name: newName },milestone_id);
  };

  const handleStartDateChange = (newStartDate) => {
    setStartDate(newStartDate);
    onChange({ ...milestone, start_date: newStartDate },milestone_id);
  };

  const handleEndDateChange = (newEndDate) => {
    setEndDate(newEndDate);
    onChange({ ...milestone, end_date: newEndDate },milestone_id);
  };

  const handleBillingPercentageChange = (newBillingPercentage) => {
    setBillingPercentage(newBillingPercentage);
    onChange({ ...milestone, billing_percentage: newBillingPercentage },milestone_id);
  };

  const handleAddDeliverable = () => {
    const newDeliverable = {
      name: "Nuevo Entregable",
      responsible: "",
      objective: "",
    };

    const updatedDeliverables = [...milestone.deliverables, newDeliverable];
    onChange({ ...milestone, deliverables: updatedDeliverables }, milestone_id);
  };

  const handleDeleteDeliverable = (id) => {
    const updatedDeliverables = milestone.deliverables.filter((e)=> e.id !== id)
    onChange({...milestone, deliverables: updatedDeliverables},milestone_id)
  }

  return (
    <div className="milestone-item" key={milestone.id}>
      <ListItem button onClick={handleToggle}>
        <ListItemText
          primary={
            
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  fullWidth
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
                  onClick={()=>setOpen(true)}
                >
                </Button>
                <DialogMod
                  open={open}
                  setOpen={setOpen}
                  title={"Eliminar hito"}
                  content={"¿Está seguro de realizar esta acción?"}
                  onAccept={onDelete}
                  paramsAccept={milestone.id}
                  onCancel={() => setOpen(false)}
                />
              </Box>
            
          }
        />
        <IconButton>
          {openDeliverables ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={openDeliverables} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ListItem>
              <DatePicker
                label="Fecha de inicio"
                value={startDate}
                onChange={handleStartDateChange}
                renderInput={(params) => <TextField {...params} />}
                sx={{ mr: 2 }}
              />
              <DatePicker
                label="Fecha de fin"
                value={endDate}
                onChange={handleEndDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </ListItem>
            <ListItem>
              
                <TextField
                  label="Porcentaje de facturación"
                  value={billingPercentage}
                  onChange={(e) =>
                    handleBillingPercentageChange(e.target.value)
                  }
                  type="number"
                  fullWidth
                />
            
            </ListItem>
            <ListItem>
              <List>
                {milestone.deliverables.length > 0 ? (
                  milestone.deliverables.map((deliverable,index) => (
                    <Deliverable
                      key={index}
                      milestone_id={milestone_id}
                      deliverable_id={index}
                      deliverable={deliverable}
                      onChange={handleDeliverableChange}
                      onDelete={handleDeleteDeliverable}
                    />
                  ))
                ) : (
                  <ListItemText primary="No hay entregables asignados." />
                )}
              </List>
            </ListItem>
            <ListItem
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              
                <Button
                  onClick={handleAddDeliverable}
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                    },
                    mb: 1,
                  }}
                >
                  Agregar Entregable
                </Button>
            </ListItem>
          </LocalizationProvider>
        </List>
      </Collapse>
    </div>
  );
};

export default Milestone;
