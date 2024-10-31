import { Box, Button, Typography,Container,Alert,CircularProgress } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { downloadCsv } from '../utils/toCsv';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { useGetPlanningByCompanyIdQuery } from '../api/planningApi';
import { useParams } from 'react-router-dom';
import { getOptions } from '../utils/pdfOptions';

const PlanningReport = () => {

    const {id} = useParams();
    const { data, isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);
    const options = getOptions("reporte_de_evaluacion_semanal")

    


    const filename = "Reporte de evaluaciones semanales"

    const targetRef = useRef();

     useEffect(() => {
        console.log(data);
     },[data])


    if (isFetching) {
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
    
      if (isError) {
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
            <Alert severity="error">
              Ocurrió un error al cargar la planificación:{" "}
              {error?.data?.message || "Error desconocido"}
            </Alert>
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
        <Typography variant="h4">Reporte de planificacion</Typography>
        {/* {data.length && <GridComponent values={data}></GridComponent>} */}
    </Box>
        
      <Box display="flex" gap="1rem">
        <Button onClick={() => downloadCsv(data, filename)} sx={{
            backgroundColor:"primary.main",
            color: "white"
        }}>
            Descargar como csv
        </Button>
        <Button onClick={() => generatePDF(targetRef,options)} sx={{
            backgroundColor:"primary.main",
            color: "white"
        }}>
            Descargar como pdf
        </Button>
      </Box>
      
    </Box>
  )
}

export default PlanningReport
