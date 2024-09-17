import React from 'react';
import { Card, CardContent, Typography, Grid, Container, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useGetAcademicPeriodsQuery } from '../api/academicPeriodApi'; 

const formatDate = (date) => format(new Date(date), 'dd MMM yyyy');

const ListaPeriodosAcademicos = () => {
  const navigate = useNavigate();
  const { data: periods = [], error, isLoading } = useGetAcademicPeriodsQuery();

  const handleClick = () => {
    navigate('/registroperiodoacademico');
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lista de Períodos Académicos
      </Typography>
      <Grid container spacing={3}>
        {periods.map((period) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={period.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {period.name}
                </Typography>
                <Typography color="text.secondary">
                  Fecha de Inicio: {formatDate(period.start_date)}
                </Typography>
                <Typography color="text.secondary">
                  Fecha de Fin: {formatDate(period.end_date)}
                </Typography>
                {period.description && (
                  <Typography color="text.secondary">
                    Descripción: {period.description}
                  </Typography>
                )}
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
