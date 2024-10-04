import { Grid2, Radio, Typography } from "@mui/material";
import React, { useState } from "react";

const Likert5 = () => {
  const size = {sm: 2, md: 2}

  const [selectedValue, setSelectedValue] = useState();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <Grid2 container spacing={2} >
      <Grid2 size={size}>
        <Typography>Muy malo</Typography>
        <Radio
          checked={selectedValue === "1"}
          value={"1"}
          name="muy_malo"
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={size}>
        <Typography>Malo</Typography>
        <Radio
          checked={selectedValue === "2"}
          value={"2"}
          name="malo"
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={size}>
        <Typography>Regular</Typography>
        <Radio
          checked={selectedValue === "3"}
          value={"3"}
          name="regular"
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={size}>
        <Typography>Bueno</Typography>
        <Radio
          checked={selectedValue === "4"}
          value={"4"}
          name="bueno"
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size={size}>
        <Typography>Muy bueno</Typography>
        <Radio
          checked={selectedValue === "5"}
          value={"5"}
          name="muy bueno"
          onChange={handleChange}
        />
      </Grid2>
    </Grid2>
  );
};

export default Likert5;
