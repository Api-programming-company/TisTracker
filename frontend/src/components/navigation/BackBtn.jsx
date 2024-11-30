import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';


const BackBtn = () => {
    const navigate = useNavigate();


    const goBack = () => {
        navigate(-1);
    }

  return (
    <Box className='back-btn-container'>
        <Typography >
            <IoArrowBackCircleOutline className='back-btn' size={42} onClick={goBack} />
        </Typography>
    </Box>
  )
}

export default BackBtn