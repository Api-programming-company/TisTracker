import { Typography } from "@mui/material";
import React from "react";

const Question = ({ question }) => {
  return (
    <Typography component="h3" sx={{ fontSize: "18px", lineHeight: "1" }}>
      {question} *
    </Typography>
  );
};

export default Question;
