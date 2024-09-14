import React, { useState } from 'react';
import { 
    TextField, 
    Button, 
    Container, 
    Typography, 
    Box, 
    FormControl 
} from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const RegistroPeriodoAcademico = () => {
    const [fechaEvaluaciones, setFechaEvaluaciones] = useState(null);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Registro de Período Académico
                </Typography>

                <form>
                    {/* Nombre */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                            label="Nombre" 
                            variant="outlined" 
                            fullWidth 
                            required 
                            helperText="* Obligatorio"
                        />
                    </FormControl>

                    {/* Descripción (Opcional) */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField 
                            label="Descripción (Opcional)" 
                            variant="outlined" 
                            fullWidth 
                            helperText="Opcional"
                        />
                    </FormControl>

                    {/* Fecha de Evaluaciones */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Fecha de Evaluaciones"
                                value={fechaEvaluaciones}
                                onChange={(newValue) => setFechaEvaluaciones(newValue)}
                                renderInput={(params) => <TextField {...params} helperText="* Obligatorio" />}
                            />
                        </LocalizationProvider>
                    </FormControl>

                    {/* Duración (Fecha Inicio y Fecha Fin) */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                                <DatePicker
                                    label="Fecha Inicio"
                                    value={fechaInicio}
                                    onChange={(newValue) => setFechaInicio(newValue)}
                                    renderInput={(params) => <TextField {...params} helperText="* Obligatorio" fullWidth />}
                                />
                                <DatePicker
                                    label="Fecha Fin"
                                    value={fechaFin}
                                    onChange={(newValue) => setFechaFin(newValue)}
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
                    >
                        Registrar Período
                    </Button>
                </form>
            </Box>
        </Container>
    );
};

export default RegistroPeriodoAcademico;
