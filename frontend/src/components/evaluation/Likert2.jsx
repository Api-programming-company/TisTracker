import { Grid2, Radio, Typography } from "@mui/material";
import React, { useState } from "react";

const Likert2 = () => {
  const size = {xs: 6, sm: 6, md: 2}

  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Grid2 container spacing={2}>
      <Grid2 size={size}>
        <Typography>Si</Typography>
        <Radio
          checked={selectedValue === "1"}
          value={"1"}
          name="yes"
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={size}>
        <Typography>No</Typography>
        <Radio
          checked={selectedValue === "0"}
          value={"0"}
          name="no"
          onChange={handleChange}
        />
      </Grid2>
    </Grid2>
  );
};

export default Likert2;
