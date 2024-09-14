import React from 'react';
import { Card, CardContent, Typography, Grid, Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

// Datos de ejemplo
const periods = Array.from({ length: 25 }, (_, i) => ({
  name: `Periodo ${i + 1}`,
  startDate: new Date(2024, i % 12, 1),
  endDate: new Date(2024, (i % 12) + 1, 0)
}));

const formatDate = (date) => format(date, 'dd MMM yyyy');

const ListaPeriodosAcademicos = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/registroperiodoacademico');
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Períodos Académicos
      </Typography>
      <Grid container spacing={3}>
        {periods.map((period, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {period.name}
                </Typography>
                <Typography color="text.secondary">
                  Fecha de Inicio: {formatDate(period.startDate)}
                </Typography>
                <Typography color="text.secondary">
                  Fecha de Fin: {formatDate(period.endDate)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleClick} 
        style={{
          position: 'fixed',
          bottom: 16,
          right: 16
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default ListaPeriodosAcademicos;
