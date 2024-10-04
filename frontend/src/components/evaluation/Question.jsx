import { Typography } from "@mui/material";
import React from "react";

const Question = ({ question }) => {
  return (
    <Typography
        component="h3"
        sx={{ color: "black", fontSize: "18px", lineHeight: "1" }}
    >
      {question}
    </Typography>
  );
};

export default Question;
