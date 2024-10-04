import { Box, Radio, Typography } from "@mui/material";
import React, { useState } from "react";

const Likert3 = () => {
  const styling = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  };

  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        paddingX: 1,
      }}
    >
      <Box sx={styling}>
        <Typography>Bajo</Typography>
        <Radio
          checked={selectedValue === "1"}
          value={"1"}
          name="bajo"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styling}>
        <Typography>Medio</Typography>
        <Radio
          checked={selectedValue === "2"}
          value={"2"}
          name="medio"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styling}>
        <Typography>Alto</Typography>
        <Radio
          checked={selectedValue === "3"}
          value={"3"}
          name="alto"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default Likert3;
