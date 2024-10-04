import { Grid2, Radio, Typography } from "@mui/material";
import React, { useState } from "react";

const RadioOption = ({ answer_options }) => {
  const [selectedValue, setSelectedValue] = useState();
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  return (
    <>
      {answer_options.map((option) => {
        return (
          <Grid2 size={{xs: 4,md:1}} > 
            <Typography sx={{height: 40}} >{option.text}</Typography> 
            <Radio
              checked={selectedValue === option.score}
              value={option.score}
              name={option.text}
              onChange={handleChange}
            />
          </Grid2>
        );
      })}
    </>
  );
};

export default RadioOption;
