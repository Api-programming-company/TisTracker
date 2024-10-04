import React from "react";
import { evaluate } from "../utils/evaluaLikert";
import { Box, Container, Divider, Grid, Grid2, Typography } from "@mui/material";
import Question from "../components/evaluation/Question";
import Likert2 from "../components/evaluation/Likert2";
import Likert3 from "../components/evaluation/Likert3";
import Likert5 from "../components/evaluation/Likert5";

const Autoevaluation = () => {
  // seguramente lo que viene del back tiene mas cosas pero tendrá una lista con las preguntas
  // a medida de que responda se añade el answer a cada objeto
  // al finalizar la evaluacion ejecutar la funcion evaluate pasandole la lista
  // para answer en likert: 2 --> Si = 1, No = 0
  // para answer en likert: 3 --> Bajo = 1, Medio = 2, Alto = 3
  // para answer en likert: 5 --> Muy malo = 1, Malo = 2, Regular = 3, Bueno = 4, Muy bueno = 5
  // al final queda [{question:'', likert: 2||3||5, answer: 0||1||2||3||4||5}, {...}, {...}]
  const ejemplo = [
    {
      question:
        "Me comuniqué de manera clara y efectiva con los miembros de mi equipo.",
      likert: 5,
    },
    {
      question:
        "Contribuí activamente a la identificación y resolución de problemas técnicos.",
      likert: 5,
    },
    {
      question:
        "He cumplido con mis tareas y entregas en los plazos establecidos.",
      likert: 3,
    },
    {
      question:
        "Estuve abierto(a) a recibir y dar retroalimentación constructiva.",
      likert: 2,
    },
    {
      question:
        "Participé activamente en las reuniones del equipo y en las discusiones sobre el proyecto.",
      likert: 2,
    },
    {
      question:
        "He tomado la iniciativa en tareas o decisiones importantes cuando ha sido necesario.",
      likert: 3,
    },
    {
      question:
        "Manejé de manera constructiva los desacuerdos o conflictos que surgen en el equipo.",
      likert: 5,
    },
    {
      question:
        "Busqué constantemente aprender y mejorar mis habilidades técnicas relacionadas con el proyecto.",
      likert: 2,
    },
    {
      question:
        "Me aseguré de que el código que desarrollo cumpla con los estándares de calidad establecidos por el equipo.",
      likert: 2,
    },
    {
      question:
        "Utilicé herramientas de control de versiones de manera efectiva para gestionar y colaborar en el código fuente.",
      likert: 2,
    },
  ];
  return (
    <Container sx={{paddingY:1}}>
      <Typography
        component="h1"
        sx={{ color: "black", fontSize: "40px", lineHeight: "1", marginY:3 }}
      >
        Autoevaluación
      </Typography>

      <Grid2 container spacing={2}>
        {ejemplo.map((e) => {
          return (
            <>
              <Grid2 size={{ sm: 12, md: 6 }}>
                <Question question={e.question} />
              </Grid2>
              <Grid2 size={{ sm: 12, md: 6 }}>
                {e.likert === 2 ? (
                  <Likert2 />
                ) : e.likert === 3 ? (
                  <Likert3 />
                ) : (
                  <Likert5 />
                )}
              </Grid2>
            </>
          );
        })}
      </Grid2>
    </Container>
  );
};

export default Autoevaluation;
