import {
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import React, { useState } from "react";
import Parameter from "./Parameter";

const Criteria = ({ criteria }) => {
  const [toggle, setToggle] = useState(true);
  return (
    <Container>
      <Box sx={{ border: "solid", borderWidth: 1, borderColor: "#CAC4D0" }}>
        <ListItem>
          <ListItemText
            primary={
              <Box sx={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  label="Criterio"
                  value={criteria.question_text}
                  fullWidth
                  multiline
                />
                <IconButton button onClick={() => setToggle(!toggle)}>
                  {toggle ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              </Box>
            }
          />
        </ListItem>
        <Collapse in={toggle}>
          {criteria.answer_options.map((e) => {
            return <Parameter key={new Date().now} parameter={e} />;
          })}
          <Button variant="contained" sx={{ marginX: 3, marginY: 1 }}>
            Agregar Parámetro
          </Button>
          <Divider sx={{ width: "100%" }} />{" "}
          <Box sx={{display:'flex', flexDirection:"row-reverse"}}>
            <Button variant="contained" sx={{ marginX: 3, marginY: 1 }}>
              Eliminar Criterio
            </Button>
          </Box>
        </Collapse>
      </Box>
    </Container>
  );
};

export default Criteria;
