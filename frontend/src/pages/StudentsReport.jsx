import React, { useEffect } from 'react'
import { Box, Button } from '@mui/material'
import { generateValues } from '../mock_objects/reporte'
const StudentsReport = () => {
    const {data} = generateValues();

    const transformToCSV = () => {
        const headers = Object.keys(data[0]);
        const rows = data.map(row => Object.values(row).join(',')).join('\n');

        return [headers.join(','), rows].join('\n');
    }
    const download = () => {
        const csv = transformToCSV();

        // Crear un Blob con los datos separados por comas en csv
        const blob = new Blob([csv], {type: 'text/csv'});

        // Crear una url para el Blob
        const url = URL.createObjectURL(blob);


        // Crear un anchor para descargar
        const a = document.createElement("a")

        // Definir la url y el attributo para descargar
        a.href = url;
        a.download = 'reporte_de_estudiantes.csv'

        // Lanzar la descarga
        a.click();
    }


  return (
    <Box display="flex" justifyContent="center" alignItems="center" marginTop={20}>
        <Button onClick={download}>Descargar</Button>
    </Box>
  )
}

export default StudentsReport
