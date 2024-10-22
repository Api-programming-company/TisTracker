import { Box, Button, Container, Radio, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext, useState } from "react";
import EvaluateContext from "../../context/evaluateContext/EvaluateContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

const Parameter = ({ parameter, criteria_id, setShowError }) => {
  const [isDraging, setIsDraging] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: parameter.id });

  const { deleteParameter, handleParameterChange } =
    useContext(EvaluateContext);

  const handleDeleteParameter = () => {
    setShowError(false);
    deleteParameter({ parameter_id: parameter.id, criteria_id: criteria_id });
  };

  const handleChange = (e) => {
    setShowError(false);
    const { value } = e.target;
    handleParameterChange({
      parameter_id: parameter.id,
      criteria_id: criteria_id,
      value: value,
    });
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  };
  const style2 = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    width: "100%",
  };

  return (
    <Container>
      <Box sx={{ display: "flex" }}>
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <DragIndicatorIcon />
        </div>
        <div ref={setNodeRef} style={style2}>
          <Radio disabled />
          <TextField
            variant="standard"
            name="parameter"
            value={parameter.option_text}
            onChange={handleChange}
            fullWidth
            multiline
          />
          <Button
            sx={{
              backgroundColor: "transparent",
              "&:hover": {
                color: "primary.light",
              },
            }}
            startIcon={<DeleteIcon />}
            onClick={handleDeleteParameter}
          ></Button>
        </div>
      </Box>
    </Container>
  );
};

export default Parameter;
