import React, { useEffect, useState } from 'react'
import { Box, Button } from '@mui/material'
import { generateValues } from '../mock_objects/reporte'
import GridComponent from '../components/GridComponent'
import { downloadCsv } from '../utils/toCsv'
const StudentsReport = () => {
    const {data} = generateValues();
    //booleano para ver si los datos estan listos para mostrarse
    const [finalData,setFinalData] = useState([])
    const [readyToPrint, setReadyToPrint] = useState(false);

    

    useEffect(() => {
        // Agregar los datos: Promedio de evaluacions y Total
        if(!finalData.length){
            setFinalData(data.map((row) => {
                const {autoevaluacion,pares,cruzada,planificacion} = row;
                const totalEvaluations = Math.round((autoevaluacion + pares + cruzada) / 3)
                const total = Math.round((totalEvaluations * 40/100) + (planificacion * 60/100))
                return {...row, evaluaciones : totalEvaluations, total}
            }))
        }
        
    },[data,finalData])


  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginTop={20}>
        {finalData.length && <GridComponent values={finalData}></GridComponent>}   
        <Button onClick={() => downloadCsv(finalData,"reporte_de_estudiantes")}>Descargar</Button>
    </Box>
  )
}

export default StudentsReport
