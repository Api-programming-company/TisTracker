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
import React, { useContext, useState } from "react";
import Parameter from "./Parameter";
import EvaluateContext from "../../context/evaluateContext/EvaluateContext";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const Criteria = ({ criteria, findError, setShowError }) => {
  const {
    handleCriteriaTitleChange,
    addParameter,
    deleteCriteria,
    handleParameterOrder,
  } = useContext(EvaluateContext);
  const [toggle, setToggle] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowError(false)
    switch (name) {
      case "criteria":
        handleCriteriaTitleChange({ id: criteria.id, value: value });
        break;
      default:
        break;
    }
  };

  const handleAddParameter = () => {
    setShowError(false)
    addParameter({ id: criteria.id });
  };
  const handleDeleteCriteria = () => {
    setShowError(false)
    deleteCriteria(criteria.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const oldIndex = criteria.answer_options.findIndex(
      (e) => e.id === active.id
    );
    const newIndex = criteria.answer_options.findIndex((e) => e.id === over.id);
    const newOrder = arrayMove(criteria.answer_options, oldIndex, newIndex);
    handleParameterOrder({ criteria_id: criteria.id, newOrder: newOrder });
  };

  return (
    <Container>
      <Box sx={{ border: "solid", borderWidth: 1, borderColor: "#CAC4D0",margin:3}}>
        <ListItem>
          <ListItemText
            primary={
              <Box sx={{ display: "flex" }}>
                <TextField
                  variant="outlined"
                  label="Criterio de evaluación*"
                  name="criteria"
                  value={criteria.question_text}
                  onChange={handleInputChange}
                  helperText={findError("question_text")}
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
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={criteria.answer_options}
              strategy={verticalListSortingStrategy}
            >
              {criteria.answer_options?.map((e) => {
                return (
                  <Parameter
                    key={e.id}
                    parameter={e}
                    criteria_id={criteria.id}
                    findError={findError}
                    setShowError={setShowError}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
          {findError("parameters") && <p className="text-red-300 text-sm">{findError("parameters")}</p>}
          {findError("parameter") && <p className="text-red-300 text-sm">{findError("parameter")}</p>}
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
