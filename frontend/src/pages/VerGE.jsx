import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

const VerGE = () => {
  const getInfo = {
    nombre_largo: "Vamos equipo S.R.L.",
    nombre_corto: "Vamo",
    correo: "vamos_equipo@vamos.com",
    direccion: "Av. Petrolera",
    telefono: "4444444",
    consultor_tis: "L.B.",
    gestion: "Gestion I-2024",
    integrantes: [
      { id: 1, nombre: "Roberto", apellidos: "Calorias" },
      { id: 2, nombre: "Redondinho", apellidos: "Laicas" },
      { id: 3, nombre: "David", apellidos: "Bacon" },
      { id: 4, nombre: "Lola", apellidos: "Mento" },
      { id: 5, nombre: "Jacky", apellidos: "Sieras" },
      { id: 6, nombre: "Susana", apellidos: "Horia" },
    ],
    planificacion: [
      {
        id: 1,
        nombre_hito: "Hito 1",
        fecha_ini: "12/09/2024",
        fecha_entrega: "16/09/2024",
        cobro: "10",
        hu: [
          {
            id: 1,
            nombre_hu: "Documentacion Parte A",
            responsable: "Susana Horia",
            objetivo: "s",
          },
          {
            id: 2,
            nombre_hu: "Documentacion Parte B",
            responsable: "David Bacon",
            objetivo: "Redactar la parte B de la documentacion",
          },
        ],
      },
      {
        id: 2,
        nombre_hito: "Hito 2",
        fecha_ini: "22/09/2024",
        fecha_entrega: "26/09/2024",
        cobro: "15",
        hu: [
          {
            id: 1,
            nombre_hu: "Documento de especificacion de requerimientos",
            responsable: "Jacky Sieras",
            objetivo: "Analizar los requerimientos del sistema",
          },
          {
            id: 2,
            nombre_hu: "Documentación de arquitectura de software",
            responsable: "Lola Mento",
            objetivo: "Diseñar la arquitectura de software",
          },
        ],
      },
    ],
  };
  //   ];

  return (
    <Box>
      <Typography variant="h4">Información de Grupo Empresa</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Nombre largo</Typography>
        </AccordionSummary>
        <AccordionDetails>{getInfo.nombre_largo}</AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Nombre Corto</Typography>
        </AccordionSummary>
        <AccordionDetails>{getInfo.nombre_corto}</AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Correo electrónico</Typography>
        </AccordionSummary>
        <AccordionDetails>{getInfo.correo}</AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Dirección</Typography>
        </AccordionSummary>
        <AccordionDetails>{getInfo.direccion}</AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Teléfono</Typography>
        </AccordionSummary>
        <AccordionDetails>{getInfo.telefono}</AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Consultor TIS</Typography>
        </AccordionSummary>
        <AccordionDetails>{getInfo.consultor_tis}</AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Gestión</Typography>
        </AccordionSummary>
        <AccordionDetails>{getInfo.gestion}</AccordionDetails>
      </Accordion>

      <Typography variant="h4">Información de su Planificación</Typography>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="h5">Hitos</Typography>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default VerGE;
