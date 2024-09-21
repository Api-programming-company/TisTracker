import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  CardHeader,
} from "@mui/material";
import { format } from "date-fns";
import { useEnrollInAcademicPeriodMutation } from "../../api/academicPeriodApi";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const formatDate = (date) => format(new Date(date), "dd MMM yyyy");

const AcademicPeriodCard = ({ period, isEnroll = true }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/academic-period/${period.id}`);
  };
  
  const [enrollInAcademicPeriod, { isLoading, isSuccess, isError, error }] =
    useEnrollInAcademicPeriodMutation();
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
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        cursor: "pointer", // Cambia el cursor a puntero
        transition: "background-color 0.3s, box-shadow 0.3s", // Transición suave para fondo y sombra
        "&:hover": {
          backgroundColor: "#f0f0f0", // Cambia a un color de fondo activo al hacer hover
          boxShadow: 4, // Aumenta un poco la sombra
        },
      }}
    >
      <CardHeader
        title={period.name}
        sx={{ textAlign: "center" }} // Centrar el título
      />
      <CardContent>
        <Typography variant="body2" noWrap>
          Fecha de Inicio: {formatDate(period.start_date)}
        </Typography>
        <Typography variant="body2" noWrap>
          Fecha de Fin: {formatDate(period.end_date)}
        </Typography>

        {period.description && (
          <Typography variant="body2">
            Descripción: {period.description}
          </Typography>
        )}
        {isEnroll ? (
          isEnrolled ? (
            <Typography color="success.main">
              ¡Inscrito correctamente!
            </Typography>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEnroll}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Inscribirse"}
            </Button>
          )
        ) : null}

        {isError && (
          <Typography color="error.main">Error: {error.message}</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AcademicPeriodCard;
