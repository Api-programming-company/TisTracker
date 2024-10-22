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
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

const Criteria = ({ criteria, setShowError, showError }) => {
  const {
    state,
    handleCriteriaTitleChange,
    addParameter,
    deleteCriteria,
    handleParameterOrder,
  } = useContext(EvaluateContext);
  const [toggle, setToggle] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShowError(false);
    switch (name) {
      case "criteria":
        handleCriteriaTitleChange({ id: criteria.id, value: value });
        break;
      default:
        break;
    }
  };

  const findError = (field) => {
    const x = state?.errors?.filter(
      (e) => e.from === field && e?.id === criteria.id
    );
    if (x?.length >= 1 && showError) {
      return x[0].message;
    }
    return "";
  };

  const handleCollapse = () => setToggle((prev) => !prev);

  const handleAddParameter = () => {
    setShowError(false);
    addParameter({ id: criteria.id });
  };
  const handleDeleteCriteria = () => {
    setShowError(false);
    deleteCriteria(criteria.id);
  };

  const handleDragEnd = (event) => {
    setShowError(false);
    const { active, over } = event;
    const oldIndex = criteria.answer_options.findIndex(
      (e) => e.id === active.id
    );
    const newIndex = criteria.answer_options.findIndex((e) => e.id === over.id);
    const newOrder = arrayMove(criteria.answer_options, oldIndex, newIndex);
    handleParameterOrder({ criteria_id: criteria.id, newOrder: newOrder });
  };

  useEffect(() => {
    if (showError) {
      setToggle(true);
    }
  }, [showError]);

  return (
    <Container>
      <Box
        sx={{
          border: "solid",
          borderWidth: 1,
          borderColor: "#CAC4D0",
          margin: 3,
        }}
      >
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
                  error={Boolean(findError("question_text"))}
                  helperText={findError("question_text")}
                  fullWidth
                  multiline
                  inputProps={{ maxLength: 255 }}
                  autoFocus
                />
                <IconButton button onClick={handleCollapse}>
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
                    setShowError={setShowError}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
          {findError("parameters") && (
            <p className="text-red-300 text-sm ml-1">
              {findError("parameters")}
            </p>
          )}
          {findError("parameter") && (
            <p className="text-red-300 text-sm ml-1">
              {findError("parameter")}
            </p>
          )}
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
              variant="outlined"
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
