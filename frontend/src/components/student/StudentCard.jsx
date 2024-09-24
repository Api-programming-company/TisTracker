import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  Avatar,
  Box,
  Radio,
  FormControlLabel,
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const StudentCard = ({ student, onRemove, isEncargado, onSelectEncargado }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 1,
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        boxShadow: 1,
        padding: 1,
        height: '60px',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ marginRight: 1, fontSize: '0.8rem' }}>
          {student.first_name[0]}{student.last_name[0]}
        </Avatar>
        <CardContent sx={{ flexGrow: 1, padding: 0 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {student.first_name} {student.last_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
            {student.email}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ padding: 0 }}>
        <FormControlLabel
          control={
            <Radio
              checked={isEncargado}
              onChange={onSelectEncargado} // Usa el manejador pasado como prop
              color="primary"
            />
          }
          label="Encargado"
        />
        <IconButton onClick={() => onRemove(student.id)} color="error" size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default StudentCard;
