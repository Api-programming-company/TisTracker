import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

const GridComponent = ({values}) => {
    const n_columns = Object.keys(values[0]).length
    
    return (
        <div className="custom-grid">
            {Object.keys(values[0]).map((header,index) => <div className='custom-grid-header' key={index}>{header}</div>)}
            {values.map((row,i) => Object.values(row).map((item,j) => <div className='custom-grid-item' key={`${i}${j}`}>{item}</div>))}
        </div>
        
      );
    }


export default GridComponent
