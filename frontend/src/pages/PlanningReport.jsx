import { Box, Button, Typography,Container,Alert,CircularProgress } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { downloadCsv } from '../utils/toCsv';
import generatePDF, { Resolution, Margin } from 'react-to-pdf';
import { useGetPlanningByCompanyIdQuery } from '../api/planningApi';
import { useParams } from 'react-router-dom';
import { getOptions } from '../utils/pdfOptions';

const PlanningReport = () => {

    const {id} = useParams();
    const [finalData, setFinalData] = useState([]);
    const { data, isSuccess, isFetching, isError, error } =
    useGetPlanningByCompanyIdQuery(id);
    const options = getOptions("reporte_de_evaluacion_semanal")

    const headers = ["Hito","Fecha de inicio", "Fecha de fin", "% de Cobro", "Entregables","Resultado Observado", "Resultado Esperado", "Observaciones","Estado"]

    const filename = "Reporte de evaluaciones semanales"

    const targetRef = useRef();


    const generateGrid = () => {
        let n_row = 2;// Constant to know in which row print the values

        return data.planning.milestones.map((milestone) => {
            const {name,start_date,end_date,billing_percentage,deliverables} = milestone
            console.log("hito",n_row,n_row + deliverables.length);
            return (
                <>
                    {Object.keys({name,start_date,end_date,billing_percentage}).map((value,index) => {
                        return <div className="planning-grid-item" 
                            key={index}
                            style={{gridRow: `${n_row}/${n_row + deliverables.length}`,
                            gridColumn:`${index + 1}/${index + 2}`}}
                            >
                                <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                                    <Typography fontSize={12}>{milestone[value]}</Typography>
                                </Box>
                            
                        </div>
                    })}
                    {deliverables.map((deliverable, j) => {
                        // Obtener las variables necesarias del deliverable
                        const {name , actual_result,expected_result,observations,status } = deliverable
                        // Aumentar la variable para saber en que fila acoumodar los hitos
                        n_row++;
                        
                        return (
                            <>
                            {
                                Object.keys({name, actual_result,expected_result,observations,status}).map((value,index) => {
                                    return <div className='planning-grid-item' key={index}>
                                            <Box width="100%" 
                                            backgroundColor={status === "C" ? "error.main" : milestone.status === "A" && "success.main"} 
                                            display="flex" alignItems="center" justifyContent="center"  paddingY={1.2}>
                                                <Typography fontSize={12} >
                                                  {/* Verificar el estado del entregable */}

                                                  {/* Verificar que el campo sea el de status */}
                                                    {value!=="status" ? deliverable[value] 
                                                    : deliverable[value] === "C" ? "C": milestone.status === "P" ? "P" : "V"}
                                                </Typography>
                                            </Box>
                                        </div>
                                })
                            }
                            </>
                        );
                    } )}
                </>
            )
        })


    }

     useEffect(() => {
        if (isSuccess) {
            // Poner en un formato para poder descargar un csv
            setFinalData()
        }
     },[data, isSuccess])


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
        <div className="planning-grid">
            {headers.map((header) => <div className='planning-grid-item'>
                <Box width="100%" sx={{backgroundColor: "info.gray"}} paddingX={2} paddingY={1}>
                    <Typography textAlign="center" fontSize={13} fontWeight="bold">{header}</Typography>
                </Box></div>)}
            {generateGrid()}
        </div>
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
