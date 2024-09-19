import React from "react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {AcademicPeriodCard} from "../";

const TeacherCard = ({ teacher, isOpen, onToggle }) => {
  return (
    <Box mb={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={onToggle}
      >
        <Typography variant="h6">{teacher.teacher_name}</Typography>
        <IconButton onClick={onToggle}>
          <ExpandMoreIcon
            sx={{
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          />
        </IconButton>
      </Box>
      <Collapse in={isOpen}>
        <Box mt={2}>
          {teacher.academic_periods.map((period) => (
            <AcademicPeriodCard key={period.id} period={period} />
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export default TeacherCard;
