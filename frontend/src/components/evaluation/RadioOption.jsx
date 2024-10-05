import { Grid2, Radio, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import EvaluateContext from "../../context/evaluateContext/EvaluateContext";

const RadioOption = ({ answer_options, question_id }) => {
  const [selectedValue, setSelectedValue] = useState();
  const { selectAnswer } = useContext(EvaluateContext);
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    selectAnswer({ question_id: question_id, answer: event.target.value });
  };
  return (
    <>
      {answer_options.map((option) => {
        return (
          <Grid2 size={{ xs: 4, md: 1 }}>
            <Typography sx={{ height: 40 }}>{option.text}</Typography>
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
