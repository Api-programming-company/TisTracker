import React, { useEffect } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import "../styles/custom_grid.css"

const GridComponent = ({values}) => {
    const n_columns = Object.keys(values[0]).length
    
    useEffect(() => {
        console.log(localStorage.getItem("darkMode"));
    },[])


    return (
        <div className="custom-grid" style={{gridTemplateColumns: `repeat(${n_columns},1fr)`}}>
            {Object.keys(values[0]).map((header,index) => <div className='custom-grid-header' style={{backgroundColor: localStorage.getItem('darkMode') ? '#555' : '#dadada'}} key={index}>{header}</div>)}
            {values.map((row,i) => Object.values(row).map((item,j) => <div className='custom-grid-item'  key={`${i}${j}`}>{item}</div>))}
        </div>
        
      );
    }


export default GridComponent
