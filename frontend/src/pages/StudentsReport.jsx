import React, { useEffect, useState, useRef } from "react";
import { Box, Button, Container, CircularProgress, Typography } from "@mui/material";
import GridComponent from "../components/GridComponent";
import { downloadCsv } from "../utils/toCsv";
import { useGetGradesQuery } from "../api/userApi";
import { useParams } from "react-router-dom";
import generatePDF, { Resolution, Margin } from 'react-to-pdf';

const options = {
    // default is `save`
    method: 'save',
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.MEDIUM,
    page: {
       // margin is in MM, default is Margin.NONE = 0
       margin: Margin.MEDIUM,
       // default is 'A4'
       format: 'letter',
       // default is 'portrait'
       orientation: 'portrait',
    },
    canvas: {
       // default is 'image/jpeg' for better size performance
       mimeType: 'image/png',
       qualityRatio: 1
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break, 
    // so use with caution.
    overrides: {
       // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
       pdf: {
          compress: true
       },
       // see https://html2canvas.hertzen.com/configuration for more options
       canvas: {
          useCORS: true
       }
    },
 };
const formatGradesData = (grades) => {
    return grades.map((grade) => {
      const autoevaluacion = grade.company.auto_evaluation_score;
      const cruzada = grade.company.cross_evaluation_score;
      const pares = grade.pares;                         
      const planificacion = grade.company.planning_evaluation_score || Math.floor(Math.random() * 101);

      const totalEvaluations = Math.round(
        (autoevaluacion + pares + cruzada) / 3
      );
      const total = Math.round(
        (totalEvaluations * 40) / 100 + (planificacion * 60) / 100
      );
  
      return {
        id: grade.id,
        nombre: grade.nombre,
        apellidos: grade.apellidos,
        autoevaluacion,
        cruzada,
        pares,
        planificacion,
        evaluaciones: totalEvaluations,
        total,
      };
    });
  };

const StudentsReport = () => {

    const targetRef = useRef();
    const { id } = useParams();
  const {
    data: grades,
    error: gradesError,
    isFetching: isGradesFetching,
    isSuccess: isGradesSucess,
    isError: isGradesError,
  } = useGetGradesQuery({academic_period_id:id, limit:5});

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
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="start"
      alignItems="start"
      padding="2rem 5rem"
      gap="2rem"
>
    <Box display="flex" flexDirection="column" gap="1rem" ref={targetRef}>
        <Typography variant="h4">Reporte de calificaciones de estudiantes</Typography>
        {finalData.length && <GridComponent values={finalData}></GridComponent>}
    </Box>
        
      <Box display="flex" gap="1rem">
        <Button onClick={() => downloadCsv(finalData, "reporte_de_estudiantes")} sx={{
            backgroundColor:"primary.main",
            color: "white"
        }}>
            Descargar como csv
        </Button>
        <Button onClick={() => generatePDF(targetRef,options, {filename: 'page.pdf'})} sx={{
            backgroundColor:"primary.main",
            color: "white"
        }}>
            Descargar como pdf
        </Button>
      </Box>
      
    </Box>
  );
};

export default StudentsReport;
