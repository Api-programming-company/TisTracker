import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const StudentCard = ({ student, onRemove }) => {
  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{student.first_name} {student.last_name}</Typography>
        <Typography variant="body2" color="text.secondary">
          Correo: {student.email}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => onRemove(student.id)}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
