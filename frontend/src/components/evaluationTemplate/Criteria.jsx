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
import React, { useContext, useEffect, useState } from "react";
import Parameter from "./Parameter";
import EvaluateContext from "../../context/evaluateContext/EvaluateContext";

const Criteria = ({ criteria }) => {
  const { handleCriteriaTitleChange, addParameter, deleteCriteria } =
    useContext(EvaluateContext);
  const [toggle, setToggle] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "criteria":
        handleCriteriaTitleChange({ id: criteria.id, value: value });
        break;
      default:
        break;
    }
  };

  const handleAddParameter = () => {
    addParameter({ id: criteria.id });
  };
  const handleDeleteCriteria = () => {
    deleteCriteria(criteria.id);
  };

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
                  name="criteria"
                  value={criteria.question_text}
                  onChange={handleInputChange}
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
          {criteria.answer_options?.map((e, index) => {
            return <Parameter key={index} parameter={e} />;
          })}
          <Button
            variant="contained"
            sx={{ marginX: 3, marginY: 1 }}
            onClick={handleAddParameter}
          >
            Agregar Parámetro
          </Button>
          <Divider sx={{ width: "100%" }} />{" "}
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Button
              variant="contained"
              sx={{ marginX: 3, marginY: 1 }}
              onClick={handleDeleteCriteria}
            >
              Eliminar Criterio
            </Button>
          </Box>
        </Collapse>
      </Box>
    </Container>
  );
};

export default Criteria;
