import React, { useEffect, useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import { useGetGradesQuery } from "../api/userApi";
import { useParams } from "react-router-dom";
import ReportTemplate from "../components/ReportTemplate";


const formatGradesData = (grades) => {
    return grades
      .map((grade) => {
        const autoevaluacion = grade.company.auto_evaluation_score;
        const cruzada = grade.company.cross_evaluation_score;
        const pares = grade.pares;
        const planificacion = grade.company.planning_score;

        const totalEvaluations = Math.round(
          (autoevaluacion + pares + cruzada) / 3
        );
        const total = Math.round(
          (totalEvaluations * 40) / 100 + (planificacion * 60) / 100
        );

        return {
          Apellidos: grade.apellidos,
          Nombre: grade.nombre,
          "Grupo Empresa": grade.company.short_name,
          Autoevaluación : autoevaluacion,
          Cruzada : cruzada,
          Pares : pares,
          Planificación: planificacion,
          Evaluaciones: totalEvaluations,
          Total : total,
        };
      })
      .sort((a, b) => a.Apellidos.localeCompare(b.Apellidos) || a.Nombre.localeCompare(b.Nombre))
      .map((grade, index) => ({Número: index + 1, ...grade,  }));
  };

const StudentsReport = () => {

    const { id } = useParams();
  const {
    data: grades,
    error: gradesError,
    isFetching: isGradesFetching,
    isSuccess: isGradesSucess,
    isError: isGradesError,
  } = useGetGradesQuery({academic_period_id:id, limit:15});

  useEffect(() => {
    if (isGradesSucess) {
      console.log(grades);
      const formattedData = formatGradesData(grades.grades); // Formatear los datos
      setFinalData(formattedData); // Establecer los datos formateados
      console.log(formattedData);
    }
    if (isGradesError) {
      console.error(gradesError);
    }
  }, [grades, gradesError, isGradesSucess, isGradesError]);

  //booleano para ver si los datos estan listos para mostrarse
  const [finalData, setFinalData] = useState([]);


  if (isGradesFetching) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  return (
    <ReportTemplate data={finalData} title={"Reporte de calificaciones de estudiante"} filename={"calificaciones_de_estudiantes"}/>
  );
};

export default StudentsReport;
