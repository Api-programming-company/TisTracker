import { Grid2, Radio, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import EvaluateContext from "../../context/evaluateContext/EvaluateContext";

const RadioOption = ({ answer_options, question_id }) => {
  const [selectedValue, setSelectedValue] = useState();
  const { selectAnswer } = useContext(EvaluateContext);
  const handleChange = (event) => {
    const selectedScore = Number(event.target.value);
    setSelectedValue(selectedScore);
    selectAnswer({ question_id: question_id, answer: selectedScore });
  };
  return (
    <>
      {answer_options.map((option) => {
        return (
          <Grid2
            size={{ xs: 4, md: 1 }}
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <Typography sx={{ height: 40, display: "contents" }}>
              {option.option_text}
            </Typography>
            <Radio
              checked={selectedValue === option.score}
              value={option.score}
              name={option.option_text}
              onChange={handleChange}
            />
          </Grid2>
        );
      })}
    </>
  );
};

export default RadioOption;
