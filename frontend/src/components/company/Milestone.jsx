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
import { usePlanningContext } from "../../context/PlanningContext";

const Milestone = ({ milestone }) => {
  const [openDeliverables, setOpenDeliverables] = useState(false);
  const [open, setOpen] = useState(false)
  const {handleChangeMilestone,deleteMilestone} = usePlanningContext();

  const handleAction = (action, payload) => {
    switch (action) {
      case "handleToggle":
        setOpenDeliverables((prev) => !prev);
        break;
      case "handleNameChange":
        handleChangeMilestone(milestone.id,{name:payload});
        break;
      case "handleStartDateChange":
        handleChangeMilestone(milestone.id,{start_date:payload});
        break;
      case "handleEndDateChange":
        handleChangeMilestone(milestone.id,{end_date:payload});
        break;
      case "handleBillingPercentageChange":
        handleChangeMilestone(milestone.id,{billing_percentage:payload});
        break;
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
                  value={milestone.name}
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
                  onClick={()=> setOpen(true)}
                >
                </Button>
                <DialogMod
                  open={open}
                  setOpen={setOpen}
                  title={"Eliminar hito"}
                  content={"¿Está seguro de realizar esta acción?"}
                  onAccept={() => {
                    setOpen(false)
                    deleteMilestone(milestone.id)
                  }}
                  
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
                value={milestone.startDate}
                onChange={(e) => handleAction("handleStartDateChange", e)}
                renderInput={(params) => <TextField {...params} />}
                sx={{ mr: 2 }}
              />
              <DatePicker
                label="Fecha de fin"
                value={milestone.endDate}
                onChange={(e) => handleAction("handleEndDateChange", e)}
                renderInput={(params) => <TextField {...params} />}
              />
            </ListItem>
            <ListItem>
              
                <TextField
                  label="Porcentaje de facturación"
                  value={milestone.billingPercentage}
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
                      deliverable_id={index}
                      deliverable={deliverable}
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
