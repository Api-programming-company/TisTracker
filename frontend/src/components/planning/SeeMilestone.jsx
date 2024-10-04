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

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import SeeDeliverable from "./SeeDeliverable";

const SeeMilestone = ({milestone}) => {
  const [openDeliverables, setOpenDeliverables] = useState(false);

  return (
    <div className="milestone-item" key={milestone.id}>
      <ListItem button onClick={() => setOpenDeliverables(!openDeliverables)}>
        <ListItemText
          primary={
            
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography variant="h6">
                  {milestone.name}
                </Typography>
              </Box>
            
          }
        />
        <IconButton>
          {openDeliverables ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </ListItem>
      <Collapse in={openDeliverables} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem>
            <List>
              {/* {milestone.deliverables?.length > 0 ? (
                milestone.deliverables.map((deliverable,index) => (
                  <SeeDeliverable
                    key={index}
                    milestone_id={milestone.id}
                    deliverable={deliverable}
                  />
                ))
              ) : (
                <p className="text-neutral-500">
                  No hay entregables asignados</p>
              )} */}
            </List>
          </ListItem>
        </List>
      </Collapse>
      </div>
  )
}

export default SeeMilestone
