import { Box, Radio, Typography } from "@mui/material";
import React, { useState } from "react";

const Likert2 = () => {
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
        <Typography>Si</Typography>
        <Radio
          checked={selectedValue === "1"}
          value={"1"}
          name="yes"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styling}>
        <Typography>No</Typography>
        <Radio
          checked={selectedValue === "0"}
          value={"0"}
          name="no"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default Likert2;
