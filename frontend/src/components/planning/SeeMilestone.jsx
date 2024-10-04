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
      <div className='list-header'button onClick={() => setOpenDeliverables(!openDeliverables)}>
        <ListItemText
          primary={
                <h2>{milestone.name}</h2>
          }
        />
        <IconButton>
          {openDeliverables ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </div>
      <Collapse in={openDeliverables} timeout="auto" unmountOnExit>
        <div className="list">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
              <div className="list-item2">
                <div className="date-item-card">
                  <h4 className='text-neutral-700'>Fecha de inicio:</h4>  
                  <p className='text-neutral-500'>{formatDate(milestone.start_date)}</p>
                </div>
                
                  <div className="date-item-card">
                  <h4 className='text-neutral-700'>Fecha de fin:</h4> 
                  <p className='text-neutral-500'>{formatDate(milestone.end_date)}</p>
                </div>
              </div>
              
            <div className="list-item2">
              <div className="date-item-card">
                <h4 className='text-neutral-700'>Porcentaje de cobro:</h4>{" "}	
                <p className='text-neutral-500'>{milestone.billing_percentage}%</p>
              </div>
            </div>
              
              <div className="deliverables-list">
                <h4 className='text-neutral-700'>Entregables:</h4>
                {milestone.deliverables?.length > 0 ? (
                  milestone.deliverables.map((deliverable,index) => (
                    <SeeDeliverable
                      key={index}
                      index={index + 1 }
                      deliverable={deliverable}
                    />
                  ))
                ) : (
                  <p className="text-neutral-500">
                    No hay entregables asignados</p>
                )}
              </div>
            
          </LocalizationProvider>
        </div>
      </Collapse>
      </div>
  )
}

export default SeeMilestone
