import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    Box, 
    FormControl,
    CircularProgress
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useCreateAcademicPeriodMutation } from '../api/academicPeriodApi';
import { useNavigate } from 'react-router-dom';

const RegistroPeriodoAcademico = () => {
    const [name, setName] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [description, setDescription] = useState('');
    
    const [createAcademicPeriod, { isLoading, error }] = useCreateAcademicPeriodMutation();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifica que todos los campos obligatorios estén llenos
        if (!name || !startDate || !endDate) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        try {
            await createAcademicPeriod({
                name,
                start_date: startDate,
                end_date: endDate,
                description
            }).unwrap();
            // Redirige a la lista de períodos académicos después de registrar
            navigate('/academic-periods');
        } catch (err) {
            // Maneja el error
            alert(`Error: ${err.message}`);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Registro de Período Académico
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                            label="Nombre" 
                            variant="outlined" 
                            fullWidth 
                            required 
                            helperText="* Obligatorio"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    {/* Descripción (Opcional) */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                            label="Descripción (Opcional)" 
                            variant="outlined" 
                            fullWidth 
                            helperText="Opcional"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </FormControl>

                    {/* Fecha de Inicio y Fecha Fin */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                                <DatePicker
                                    label="Fecha Inicio"
                                    value={startDate}
                                    onChange={(newValue) => setStartDate(newValue)}
                                    renderInput={(params) => <TextField {...params} helperText="* Obligatorio" fullWidth />}
                                />
                                <DatePicker
                                    label="Fecha Fin"
                                    value={endDate}
                                    onChange={(newValue) => setEndDate(newValue)}
                                    renderInput={(params) => <TextField {...params} helperText="* Obligatorio" fullWidth />}
                                />
                            </Box>
                        </LocalizationProvider>
                    </FormControl>

                    {/* Botón de Registro */}
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        sx={{ mt: 2 }}
                        disabled={isLoading} // Deshabilita el botón durante la carga
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Registrar Período"}
                    </Button>
                    
                    {error && (
                        <Typography color="error" sx={{ mt: 2 }}>
                            Error: {error.message}
                        </Typography>
                    )}
                </form>
            </Box>
        </Container>
    );
};

export default RegistroPeriodoAcademico;
