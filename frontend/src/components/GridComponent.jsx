import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import "../styles/custom_grid.css"


const GridComponent = ({values}) => {
    const n_columns = Object.keys(values[0]).length


    return (
        <div className="custom-grid" style={{gridTemplateColumns: `repeat(${n_columns},auto)`}}>
            {Object.keys(values[0]).map((header,index) => <Box className='custom-grid-header' sx={{backgroundColor: "info.gray"}} key={index}>{header}</Box>)}
            {values.map((row,i) => Object.values(row).map((item,j) => <div className='custom-grid-item'  key={`${i}${j}`}>{item}</div>))}
        </div>
        
      );
    }


export default GridComponent
