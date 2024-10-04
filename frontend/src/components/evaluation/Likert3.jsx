import { Grid2, Radio, Typography } from "@mui/material";
import React, { useState } from "react";

const Likert3 = () => {
  const size = {xs: 4 ,sm: 4, md: 2}

  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Grid2 container spacing={2}>
      <Grid2 size={size}>
        <Typography>Bajo</Typography>
        <Radio
          checked={selectedValue === "1"}
          value={"1"}
          name="bajo"
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={size}>
        <Typography>Medio</Typography>
        <Radio
          checked={selectedValue === "2"}
          value={"2"}
          name="medio"
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={size}>
        <Typography>Alto</Typography>
        <Radio
          checked={selectedValue === "3"}
          value={"3"}
          name="alto"
          onChange={handleChange}
        />
      </Grid2>
    </Grid2>
  );
};

export default Likert3;
