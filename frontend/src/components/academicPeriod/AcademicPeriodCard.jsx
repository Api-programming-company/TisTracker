import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  CardHeader,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import { useEnrollInAcademicPeriodMutation } from "../../api/academicPeriodApi";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/validaciones";

const AcademicPeriodCard = ({ period, isEnroll = true }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`docente-home/${period.id}`);
  };

  const handleEdit = (event) => {
    event.stopPropagation();
    navigate(`/update-academic-period/${period.id}`);
  };

  const [enrollInAcademicPeriod, { isLoading, isSuccess, isError, error }] =
    useEnrollInAcademicPeriodMutation();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
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
        cursor: "pointer",
        transition: "background-color 0.3s, box-shadow 0.3s",
        "&:hover": {
          backgroundColor: "info.gray",
          boxShadow: 4,
        },
      }}
    >
      <CardHeader title={period.name} sx={{ textAlign: "center" }} />
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

        {/* Icono de editar */}
        <Tooltip title="Ajustar Periodo académico" arrow>
          <IconButton
            onClick={handleEdit}
            sx={{
              mt: 2, // Espaciado superior para separar del contenido anterior
              "&:hover": {
                backgroundColor: "transparent", // Sin fondo al pasar el mouse
              },
            }}
          >
            <EditIcon color="secondary" />
          </IconButton>
        </Tooltip>
      </CardContent>
    </Card>
  );
};

export default AcademicPeriodCard;
