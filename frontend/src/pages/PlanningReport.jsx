import { Box, Button, Typography,Container,Alert,CircularProgress } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import { downloadCsv } from '../utils/toCsv';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { useGetPlanningByCompanyIdQuery } from '../api/planningApi';
import { useParams } from 'react-router-dom';


const PlanningReport = () => {

    const {id} = useParams();
    const { data, isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);

    const options = {
        filename: `Reporte_de_evaluacion_semanal.pdf`,
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
