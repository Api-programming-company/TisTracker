import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Avatar,
  Stack,
  Box,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const StudentCard = ({ student, onRemove }) => {
  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2,
        p: 2,
        borderRadius: 2,
        boxShadow: 3,
        transition: "box-shadow 0.3s",
        "&:hover": {
          boxShadow: 6,
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%", flexGrow: 1 }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            color: "white",
            width: 56,
            height: 56,
            mr: 2,
          }}
        >
          {student.first_name[0]}
          {student.last_name[0]}
        </Avatar>
        <CardContent sx={{ p: 0 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {student.first_name} {student.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {student.email}
          </Typography>
        </CardContent>
      </Stack>
      {onRemove && (
        <IconButton
          onClick={() => onRemove(student.id)}
          color="error"
          size="large"
          sx={{
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </Card>
  );
};

export default StudentCard;
