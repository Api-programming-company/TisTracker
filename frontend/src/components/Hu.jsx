import { Box, TextField } from "@mui/material";
import React from "react";

const Hu = () => {
  return (
    <Box
      sx={{
        border: "1px solid grey",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: '1rem',
        padding: '1rem'
      }}
    >
      <TextField
        label="Nombre del hito"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "5px" }}
        //  value={inputValue}
        // onChange={handleInputChange}
      />
      <TextField
        label="Responsable"
        variant="outlined"
        fullWidth
        style={{ marginBottom: "5px" }}
        //  value={inputValue}
        // onChange={handleInputChange}
      />
      <TextField
        label="Objetivo"
        variant="outlined"
        fullWidth
        style={{ gridColumn: "1/3" }}
        //  value={inputValue}
        // onChange={handleInputChange}
      />
    </Box>
  );
};

export default Hu;
