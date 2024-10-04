import React,{useState} from 'react'

import {
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  List,
  Box,
  Typography
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import SeeDeliverable from "./SeeDeliverable";


const SeeMilestone = ({milestone}) => {
  const [openDeliverables, setOpenDeliverables] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="milestone-item" key={milestone.id}>
      <ListItem button onClick={() => setOpenDeliverables(!openDeliverables)}>
        <ListItemText
          primary={
            
              <Box sx={{ display: "flex", gap: 2 }}>
                <h2>{milestone.name}</h2>
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
              <div className="list-item">
                <div className="date-item-card">
                  <h4 >Fecha de inicio:</h4>  
                  <p className='text-neutral-500'>{formatDate(milestone.start_date)}</p>
                </div>
                
                  <div className="date-item-card">
                  <h4>Fecha de fin:</h4> 
                  <p className='text-neutral-500'>{formatDate(milestone.end_date)}</p>
                </div>
              </div>
              
            <div className="list-item">
              <h4>Porcentaje de cobro:</h4>{" "}	
              <p className='text-neutral-500'>{milestone.billing_percentage}%</p>
            </div>
              
            <ListItem>
              <List>
                {milestone.deliverables?.length > 0 ? (
                  milestone.deliverables.map((deliverable,index) => (
                    <SeeDeliverable
                      key={index}
                      deliverable={deliverable}
                    />
                  ))
                ) : (
                  <p className="text-neutral-500">
                    No hay entregables asignados</p>
                )}
              </List>
            </ListItem>
            
          </LocalizationProvider>
        </List>
      </Collapse>
      </div>
  )
}

export default SeeMilestone
