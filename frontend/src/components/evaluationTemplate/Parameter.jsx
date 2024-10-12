import { Box, Button, Container, Radio, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import EvaluateContext from "../../context/evaluateContext/EvaluateContext";

const Parameter = ({ parameter, criteria_id }) => {
  const { deleteParameter, handleParameterChange } =
    useContext(EvaluateContext);

  const handleDeleteParameter = () => {
    deleteParameter({ parameter_id: parameter.id, criteria_id: criteria_id });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    handleParameterChange({
      parameter_id: parameter.id,
      criteria_id: criteria_id,
      value: value,
    });
  };
  return (
    <Container>
      <Box sx={{ display: "flex" }}>
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
      </Box>
    </Container>
  );
};

export default Parameter;
