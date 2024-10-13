import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  Avatar,
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
                <ListItem key={e.user.id}>
                  <Avatar
                    sx={{
                      bgcolor: "primary.main",
                      color: "white",
                      width: 56,
                      height: 56,
                      mr: 2,
                    }}
                  >
                    {e.user.first_name[0]}
                    {e.user.last_name[0]}
                  </Avatar>
                  <ListItemText
                    primary={e.user.full_name}
                    secondary={e.user.email}
                  />
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
