import { useNavigate } from "react-router-dom";
import React from "react";
import {
  Card,
  CardHeader,
  Container,
  Button,
  Divider,
  Box,
  Typography,
} from "@mui/material";

const PlantillasVisualizer = () => {
  const navigate = useNavigate();
  const plantillas = [
    { id: 50, title: "Plantilla para evaluación de estudiante" },
    { id: 52, title: "Autoevaluación de grupo empresas" },
    { id: 53, title: "Plantilla 2" },
    { id: 61, title: "Plantilla 100" },
    { id: 63, title: "Prueba de plantilla xd" },
  ];

  const handlePlantilla = (idPlantilla) => {
    navigate(`/verplantillas/${idPlantilla}`);
  };
  const handleCrearPlantilla = () => {
    navigate("/"); //Aumentar para redirigir al crear plantilla
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Plantillas de Evaluación
        </Typography>
      </Box>
      <Divider sx={{ width: "100%", mb: 4 }} />{" "}
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start" // Mantener alineación de izquierda a derecha
        sx={{ gap: 2 }} // Espacio entre tarjetas
      >
        {plantillas.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No hay plantillas.
          </Typography>
        ) : (
          plantillas.map((item) => (
            <Box
              key={item.id}
              flexBasis={{
                xs: "100%", // 1 item
                sm: "48%", // 2 items
                md: "30%", // 3 items
              }}
              sx={{ minWidth: 0 }}
            >
              <Card
                onClick={() => handlePlantilla(item.id)}
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "200px",
                  cursor: "pointer", // Cambia el cursor a puntero
                  transition: "background-color 0.3s, box-shadow 0.3s", // Transición suave para fondo y sombra
                  "&:hover": {
                    backgroundColor: "info.gray", // Cambia a un color de fondo activo al hacer hover
                    boxShadow: 4, // Aumenta un poco la sombra
                  },
                }}
              >
                <CardHeader title={item.title} sx={{ textAlign: "center" }} />
              </Card>
            </Box>
          ))
        )}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2, mb: 7 }}>
        <Button
          onClick={handleCrearPlantilla}
          variant="contained"
          color="primary"
          sx={{
            mb: 2,
            px: 12,
            py: 1,
            position: "relative",
          }}
        >
          Crear Plantilla
        </Button>
      </Box>
    </Container>
  );
};

export default PlantillasVisualizer;
