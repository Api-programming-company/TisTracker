import { Box, Radio, Typography } from "@mui/material";
import React, { useState } from "react";

const Likert5 = () => {
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
        <Typography>Muy malo</Typography>
        <Radio
          checked={selectedValue === "1"}
          value={"1"}
          name="muy_malo"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styling}>
        <Typography>Malo</Typography>
        <Radio
          checked={selectedValue === "2"}
          value={"2"}
          name="malo"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styling}>
        <Typography>Regular</Typography>
        <Radio
          checked={selectedValue === "3"}
          value={"3"}
          name="regular"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styling}>
        <Typography>Bueno</Typography>
        <Radio
          checked={selectedValue === "4"}
          value={"4"}
          name="bueno"
          onChange={handleChange}
        />
      </Box>
      <Box sx={styling}>
        <Typography>Muy bueno</Typography>
        <Radio
          checked={selectedValue === "5"}
          value={"5"}
          name="muy bueno"
          onChange={handleChange}
        />
      </Box>
    </Box>
  );
};

export default Likert5;
