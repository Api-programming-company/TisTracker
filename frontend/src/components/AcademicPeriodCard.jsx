import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { format } from "date-fns";

const formatDate = (date) => format(new Date(date), "dd MMM yyyy");

const AcademicPeriodCard = ({ period }) => {
  return (
    <Card sx={{ mb: 2 }}>
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
  );
};

export default AcademicPeriodCard;
