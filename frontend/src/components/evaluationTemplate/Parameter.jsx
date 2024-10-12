import { Box, Button, Container, Radio, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

const Parameter = ({ parameter }) => {
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
          //   onClick={() => setOpen(true)}
        ></Button>
      </Box>
    </Container>
  );
};

export default Parameter;
