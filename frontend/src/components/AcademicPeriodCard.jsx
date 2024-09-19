import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import { format } from "date-fns";
import { useEnrollInAcademicPeriodMutation } from "../api/academicPeriodApi";
import AppContext from "../context/AppContext";

const formatDate = (date) => format(new Date(date), "dd MMM yyyy");

const AcademicPeriodCard = ({ period }) => {
  const [enrollInAcademicPeriod, { isLoading, isSuccess, isError, error }] = useEnrollInAcademicPeriodMutation();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    // Check if the user is already enrolled in the current period
    if (user && user.academic_period_id === period.id) {
      setIsEnrolled(true);
    }
  }, [user, period.id]);

  const handleEnroll = async () => {
    try {
      await enrollInAcademicPeriod({ academic_period_id: period.id }).unwrap();
      setIsEnrolled(true);
    } catch (err) {
      console.error(err);
    }
  };

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
        <div>
          {isEnrolled ? (
            <Typography color="success.main">¡Inscrito correctamente!</Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEnroll}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Inscribirse"}
            </Button>
          )}
          {isError && <Typography color="error.main">Error: {error.message}</Typography>}
        </div>
      </CardContent>
    </Card>
  );
};

export default AcademicPeriodCard;
