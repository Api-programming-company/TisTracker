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

const Milestone = ({ milestone, onChange, onDelete, milestone_id }) => {
  const [openDeliverables, setOpenDeliverables] = useState(false);
  const [startDate, setStartDate] = useState(new Date(milestone.start_date));
  const [endDate, setEndDate] = useState(new Date(milestone.end_date));
  const [name, setName] = useState(milestone.name);
  const [open, setOpen] = useState(false)
  const [billingPercentage, setBillingPercentage] = useState(
    milestone.billing_percentage
  );

  const handleAction = (action, payload) => {
    console.log("working");
    switch (action) {
      case "handleToggle":
        setOpenDeliverables((prev) => !prev);
        break;
      // case "handleDeliverableChange":
      //   const updatedDeliverables = milestone.deliverables.map((deliverable) =>
      //     deliverable.id === payload.id ? payload : deliverable
      //   );
      //   onChange({ ...milestone, deliverables: updatedDeliverables },milestone_id);
      //   break;
      case "handleNameChange":
        setName(payload);
        onChange({ ...milestone, name: payload },milestone_id);
        break;
      case "handleStartDateChange":
        setStartDate(payload);
        onChange({ ...milestone, start_date: payload },milestone_id);
        break;
      case "handleEndDateChange":
        setEndDate(payload);
        onChange({ ...milestone, end_date: payload },milestone_id);
        break;
      case "handleBillingPercentageChange":
        setBillingPercentage(payload);
        onChange({ ...milestone, billing_percentage: payload },milestone_id);
        break;
      // case "handleAddDeliverable":
      //   const newDeliverable = {
      //     name: "Nuevo Entregable",
      //     responsible: "",
      //     objective: "",
      //   };

      //   const updatedDeliverables = [...milestone.deliverables, newDeliverable];
      //   onChange({ ...milestone, deliverables: updatedDeliverables },milestone_id);
      //   break;
      // case "handleDeleteDeliverable":
      //   const updatedDeliverables = milestone.deliverables.filter((e)=> e.id !== payload)
      //   onChange({...milestone, deliverables: updatedDeliverables},milestone_id)
      //   break;
      default:
        break;
    }
  };

  return (
    <div className="milestone-item" key={milestone.id}>
      <ListItem button onClick={() => handleAction("handleToggle")}>
        <ListItemText
          primary={
            
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  value={name}
                  onChange={(e) => handleAction("handleNameChange", e.target.value)}
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
                  onClick={()=>handleAction("handleDeleteDeliverable",milestone.id)}
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
                onChange={(e) => handleAction("handleStartDateChange", e)}
                renderInput={(params) => <TextField {...params} />}
                sx={{ mr: 2 }}
              />
              <DatePicker
                label="Fecha de fin"
                value={endDate}
                onChange={(e) => handleAction("handleEndDateChange", e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </ListItem>
            <ListItem>
              
                <TextField
                  label="Porcentaje de facturación"
                  value={billingPercentage}
                  onChange={(e) =>
                    handleAction("handleBillingPercentageChange", e.target.value)
                  }
                  type="number"
                  fullWidth
                />
            
            </ListItem>
            <ListItem>
              <List>
                {milestone.deliverables?.length > 0 ? (
                  milestone.deliverables.map((deliverable,index) => (
                    <Deliverable
                      key={index}
                      milestone_id={milestone_id}
                      deliverable_id={index}
                      deliverable={deliverable}
                      onChange={(payload) => handleAction("handleDeliverableChange", payload)}
                      onDelete={(payload) => handleAction("handleDeleteDeliverable", payload)}
                    />
                  ))
                ) : (
                  <p className="text-neutral-500">No hay entregables asignados.</p>
                )}
              </List>
            </ListItem>
            <ListItem
              sx={{ display: "flex", justifyContent: "center", width: "100%" }}
            >
              
                <Button
                  onClick={() => handleAction("handleAddDeliverable")}
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
