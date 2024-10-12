import { Box, Button, Container, Radio, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useContext } from "react";
import EvaluateContext from "../../context/evaluateContext/EvaluateContext";

const Parameter = ({ parameter, criteria_id }) => {
  const { deleteParameter } = useContext(EvaluateContext);
  const handleDeleteParameter = () => {
    deleteParameter({ parameter_id: parameter.id, criteria_id: criteria_id });
  };
  return (
    <Container>
      <Box sx={{ display: "flex" }}>
        <Radio disabled />
        <TextField variant="standard" fullWidth multiline />
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
