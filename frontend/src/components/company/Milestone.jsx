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
import { set } from "date-fns";

const Milestone = ({ milestone }) => {
  const [openDeliverables, setOpenDeliverables] = useState(true);
  const [open, setOpen] = useState(false)
  const {handleChangeMilestone,deleteMilestone,addDeliverable} = usePlanningContext();
  const [isError, setIsError] = useState(false);

  const findError = (name) => {
    const error = milestone.errors.find((error) => error.errorArea === name);
    if(error && !isError){
      setIsError(true);
      setOpenDeliverables(true);
    } 
    return error?.message;
  };
  const handleAction = (action, payload) => {
    setIsError(false);
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
    <div className={`milestone-item ${isError && "border-red"}`} key={milestone.id}>
      <ListItem >
        <ListItemText
          primary={
            
              <Box sx={{ display: "flex", gap: 2 }}>
                <TextField
                  label="Nombre de Hito"
                  value={milestone.name}
                  onChange={(e) => handleAction("handleNameChange", e.target.value)}
                  fullWidth
                  error={Boolean(findError("name"))}
                  helperText={findError("name")}
                />
                <Button
                  sx={{
                    backgroundColor: "transparent",
                    "&:hover": {
                      color: "primary.light",
                    },

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
        <IconButton button onClick={() => handleAction("handleToggle")}>
          {openDeliverables ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={openDeliverables} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ListItem>
              <div className="date-item">
              <DatePicker
                label="Fecha de inicio"
                value={milestone.start_date}
                onChange={(e) => handleAction("handleStartDateChange", e)}
                renderInput={(params) => <TextField {...params} error={Boolean(findError("start_date"))} helperText={findError("start_date")} />}
                sx={{ mr: 2 }}
              />
              {findError("start_date") && <p className="text-red-300 text-sm">{findError("start_date")}</p>}
              </div>
             
              <div className="date-item">
              <DatePicker
                label="Fecha de fin"
                value={milestone.end_date}
                onChange={(e) => handleAction("handleEndDateChange", e)}
                renderInput={(params) => <TextField {...params}  error={Boolean(findError("end_date"))} helperText={findError("end_date")}/>}
                
              />
               {findError("end_date") && <p className="text-red-300 text-sm">{findError("end_date")}</p>}

              </div>
              
            </ListItem>
            <ListItem>
              
                <TextField
                  label="Porcentaje de facturación"
                  value={milestone.billingPercentage}
                  onChange={(e) =>
                    handleAction("handleBillingPercentageChange", Number(e.target.value))
                  }
                  type="number"
                  fullWidth
                  error={Boolean(findError("billing_percentage"))}
                  helperText={findError("billing_percentage")}
                />
            
            </ListItem>
            <ListItem>
              <div className="deliverables-list">
              {milestone.deliverables?.length > 0 ? (
                  milestone.deliverables.map((deliverable,index) => (
                    <Deliverable
                      key={index}
                      milestone_id={milestone.id}
                      deliverable={deliverable}
                    />
                  ))
                ) : (
                  <p className="text-neutral-500">
                    No hay entregables asignados</p>
                )}
              </div>
                
                {Boolean(findError("deliverables")) &&
                <p className="text-red-300 text-sm">{findError("deliverables")}</p>
                    
                    }
            </ListItem>
            <ListItem
              sx={{ display: "flex", justifyContent: "start", width: "100%" }}
            >
              
                <Button
                  variant="outlined"
                  onClick={() => addDeliverable(milestone.id)}
                  sx={{
                    backgroundColor: "transparent",
                    color: "primary.main",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    mb: 1,
                    ml: 2,
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
