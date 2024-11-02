import React, { useEffect, useState } from "react";
import { Container, CircularProgress } from "@mui/material";
import { useGetGradesQuery } from "../api/userApi";
import { useParams } from "react-router-dom";
import ReportTemplate from "../components/ReportTemplate";


const formatGradesData = (grades) => {
    const uniqueGrades = new Map();

    grades.forEach((grade) => {
      const companyId = grade.company.id;
      if (!uniqueGrades.has(companyId)) {
        const autoevaluacion = grade.company.auto_evaluation_score;
        const cruzada = grade.company.cross_evaluation_score;
        const planificacion = grade.company.planning_evaluation_score || Math.floor(Math.random() * 101);

        const totalEvaluations = Math.round(
          (autoevaluacion + cruzada) / 2
        );
        const total = Math.round(
          (totalEvaluations * 40) / 100 + (planificacion * 60) / 100
        );

        uniqueGrades.set(companyId, {
          nombre_largo: grade.company.long_name,
          nombre_corto: grade.company.short_name,
          autoevaluacion,
          cruzada,
          planificacion,
          evaluaciones: totalEvaluations,
          total,
        });
      }
    });

    return Array.from(uniqueGrades.values()).sort((a, b) => a.nombre_corto.localeCompare(b.nombre_largo))
    .map((grade, index) =>{ return {n: index + 1, ...grade}});
  };

const CompanyReport = () => {
    const { id } = useParams();
    const {
      data: grades,
      error: gradesError,
      isFetching: isGradesFetching,
      isSuccess: isGradesSucess,
      isError: isGradesError,
    } = useGetGradesQuery({academic_period_id:id, limit:7});
  
    useEffect(() => {
      if (isGradesSucess) {
        console.log(grades,id);
        const formattedData = formatGradesData(grades.grades); // Formatear los datos
        setFinalData(formattedData); // Establecer los datos formateados
        console.log(formattedData);
      }
      if (isGradesError) {
        console.error(gradesError);
      }
    }, [grades, gradesError, isGradesSucess, isGradesError, id]);
  
    //booleano para ver si los datos estan listos para mostrarse
    const [finalData, setFinalData] = useState([]);
  
    useEffect(() => {
      console.log(grades);
    },[grades])
  
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
      <ReportTemplate data={finalData} title={"Reporte de calificaciones de grupo empresas"} filename={"calificaciones_de_ge"}/>
    );
}

export default CompanyReport
