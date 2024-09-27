import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import React from "react";

const MemberAccordion = ({ members }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
          id="panel1-header"
        >
          Integrantes
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {members.map((e) => {
              return (
                <ListItem key={e.user_id}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={e.email}/>
                </ListItem>
              );
            })}
          </List>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default MemberAccordion;
