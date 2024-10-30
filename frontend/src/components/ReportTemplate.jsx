import React, {useRef} from 'react'
import { Box,Button,Typography } from '@mui/material'
import GridComponent from './GridComponent'
import { downloadCsv } from '../utils/toCsv'
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

const ReportTemplate = ({data,title,filename}) => {

    const targetRef = useRef();


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
        <Typography variant="h4">{title}</Typography>
        {data.length && <GridComponent values={data}></GridComponent>}
    </Box>
        
      <Box display="flex" gap="1rem">
        <Button onClick={() => downloadCsv(data, filename)} sx={{
            backgroundColor:"primary.main",
            color: "white"
        }}>
            Descargar como csv
        </Button>
        <Button onClick={() => generatePDF(targetRef,options, {filename: `${filename}.pdf`})} sx={{
            backgroundColor:"primary.main",
            color: "white"
        }}>
            Descargar como pdf
        </Button>
      </Box>
      
    </Box>
  )
}

export default ReportTemplate
