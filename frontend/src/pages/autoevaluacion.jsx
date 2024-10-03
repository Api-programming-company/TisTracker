import React from "react";
import { evaluate } from "../utils/evaluaLikert"; 

const autoevaluacion = () => {
  // seguramente lo que viene del back tiene mas cosas pero tendrá una lista con las preguntas
  // a medida de que responda se añade el answer a cada objeto
  // al finalizar la evaluacion ejecutar la funcion evaluate pasandole la lista
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
  return <div>autoevaluacion</div>;
};

export default autoevaluacion;
