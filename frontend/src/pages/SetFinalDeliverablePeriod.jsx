import React from 'react'
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, TextField } from '@mui/material';
import "../styles/set_final_period.css";


const SetFinalDeliverablePeriod = () => {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
  };

  return (
    <div className='container'>
      <div className="section-header">
        <h1>Ajustar periodo de entrega final</h1>
      </div>
      <div className="container-body"> 
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="dates-input-container">
                    <div className="date-item">
                        <DatePicker
                            label="Fecha de inicio"
                            value={startDate}
                            onChange={handleStartDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        
                        />
                        {/* {findError("start_date") && <p className="text-red-300 text-sm">{findError("start_date")}</p>} */}
                        </div>
                        
                    <div className="date-item">
                            <DatePicker
                            label="Fecha de fin"
                            value={endDate}
                            onChange={handleEndDateChange}
                            renderInput={(params) => <TextField {...params}  />}
                            
                        />
                        {/* {findError("end_date") && <p className="text-red-300 text-sm">{findError("end_date")}</p>} */}

                        </div>
                    
                </div>
            </LocalizationProvider>
            <div className="flex-start">
                <Button
                variant="contained"
                color="primary"
                sx={{ 
                    mt: 2, 
                    backgroundColor: "primary.dark",
                    "&:hover": {
                        backgroundColor: "primary.main",
                        color: "primary.contrastText",
                    },
                }}
            >Guardar
            </Button>
            </div>
        
        </div>     
    </div>
  )
}



export default SetFinalDeliverablePeriod
