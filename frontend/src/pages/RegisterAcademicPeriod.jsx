import React, { useState, useEffect } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Box,
    FormControl,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useCreateAcademicPeriodMutation } from "../api/academicPeriodApi";
import { useNavigate } from "react-router-dom";
import { differenceInDays } from "date-fns";
import moment from "moment-timezone";

const RegisterAcademicPeriod = () => {
    const MAX_DESCRIPTION_LENGTH = 255;
    const MIN_DAYS_DIFFERENCE = 3;
    const [form, setForm] = useState({
        name: "",
        description: "",
        start_date: null,
        end_date: null,
        company_creation_start_date: null,
        company_creation_end_date: null,
        planning_start_date: null,
        planning_end_date: null,
        evaluation_start_date: null,
        evaluation_end_date: null,
    });
    const [errors, setErrors] = useState({});
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [
        createAcademicPeriod,
        { data, error, isLoading, isError, isSuccess },
    ] = useCreateAcademicPeriodMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            console.log(data);
            navigate("/academic-periods");
        }
        if (isError) {
            console.log(error);
            setSnackbar({
                open: true,
                message: error.data.message,
                severity: "error",
            });
            if (error.data.errors) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    ...error.data.errors,
                }));
            }
        }
    }, [isSuccess, isError, error, data, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleDateChange = (name, date) => {
        setForm((prevForm) => ({
            ...prevForm,
            [name]: date,
            ...(name === "start_date" || name === "end_date"
                ? {
                      company_creation_start_date: null,
                      company_creation_end_date: null,
                      planning_start_date: null,
                      planning_end_date: null,
                  }
                : {}),
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setErrors({});

        const newErrors = {};
        if (!form.name) newErrors.name = "Este campo es obligatorio.";
        if (!form.start_date)
            newErrors.start_date = "Este campo es obligatorio.";
        if (!form.end_date) newErrors.end_date = "Este campo es obligatorio.";
        if (!form.company_creation_end_date)
            newErrors.company_creation_end_date = "Este campo es obligatorio.";
        if (!form.company_creation_start_date)
            newErrors.company_creation_start_date =
                "Este campo es obligatorio.";
        if (!form.planning_end_date)
            newErrors.planning_end_date = "Este campo es obligatorio.";
        if (!form.planning_start_date)
            newErrors.planning_start_date = "Este campo es obligatorio.";
        if (form.description.length > MAX_DESCRIPTION_LENGTH)
            newErrors.description = `La descripción no puede exceder ${MAX_DESCRIPTION_LENGTH} caracteres.`;
        // Validación de fechas
        if (form.start_date && form.end_date) {
            if (form.start_date > form.end_date) {
                newErrors.start_date =
                    "La fecha de inicio no puede ser mayor que la fecha de fin.";
            } else if (
                differenceInDays(form.end_date, form.start_date) <
                MIN_DAYS_DIFFERENCE
            ) {
                newErrors.end_date = `La diferencia mínima debe ser de ${MIN_DAYS_DIFFERENCE} días.`;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setSnackbar({
                open: true,
                message: "Llena el formulario correctamente",
                severity: "error",
            });
            setErrors(newErrors);
            console.log(errors);
            return;
        }

        const clientTimezone = moment.tz.guess();
        console.log("Zona horaria del cliente:", clientTimezone);

        const startDateInClientTZ = moment
            .utc(form.start_date)
            .tz(clientTimezone)
            .format();
        const endDateInClientTZ = moment
            .utc(form.end_date)
            .tz(clientTimezone)
            .format();
        const companyCreationStartDateInClientTZ = moment
            .utc(form.company_creation_start_date)
            .tz(clientTimezone)
            .format();
        const companyCreationEndDateInClientTZ = moment
            .utc(form.company_creation_end_date)
            .tz(clientTimezone)
            .format();
        const planningStartDateInClientTZ = moment
            .utc(form.planning_start_date)
            .tz(clientTimezone)
            .format();
        const planningEndDateInClientTZ = moment
            .utc(form.planning_end_date)
            .tz(clientTimezone)
            .format();
        const evaluationStartDateInClientTZ = moment
            .utc(form.evaluation_start_date)
            .tz(clientTimezone)
            .format();
        const evaluationEndDateInClientTZ = moment
            .utc(form.evaluation_end_date)
            .tz(clientTimezone)
            .format();

        console.log("Registrando periodo académico...", {
            name: form.name,
            start_date: startDateInClientTZ,
            end_date: endDateInClientTZ,
            description: form.description,
        });

        createAcademicPeriod({
            name: form.name,
            start_date: startDateInClientTZ,
            end_date: endDateInClientTZ,
            company_creation_start_date: companyCreationStartDateInClientTZ,
            company_creation_end_date: companyCreationEndDateInClientTZ,
            planning_start_date: planningStartDateInClientTZ,
            planning_end_date: planningEndDateInClientTZ,
            evaluation_start_date: evaluationStartDateInClientTZ,
            evaluation_end_date: evaluationEndDateInClientTZ,
            description: form.description,
        });
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 12 }}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    sx={{ textAlign: "center" }}
                >
                    Registro de Período Académico
                </Typography>

                <form onSubmit={handleSubmit}>
                    {/* Nombre */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            label="Nombre"
                            variant="outlined"
                            name="name"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name || "* Obligatorio"}
                            value={form.name}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </FormControl>

                    {/* Descripción */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            name="description"
                            fullWidth
                            error={!!errors.description}
                            helperText={
                                errors.description ||
                                `Máximo ${MAX_DESCRIPTION_LENGTH} caracteres.`
                            }
                            value={form.description}
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </FormControl>

                    {/* Fecha de Inicio y Fecha Fin */}
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            {/*fecha de inicio y fin*/}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 2,
                                }}
                            >
                                <DatePicker
                                    label="Fecha Inicio"
                                    value={form.start_date}
                                    onChange={(date) =>
                                        handleDateChange("start_date", date)
                                    }
                                    disablePast={true}
                                    slotProps={{
                                        textField: {
                                            error: errors.start_date,
                                            helperText: errors.start_date
                                                ? errors.start_date
                                                : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                    disabled={isLoading}
                                />
                                <DatePicker
                                    label="Fecha Fin"
                                    value={form.end_date}
                                    onChange={(date) =>
                                        handleDateChange("end_date", date)
                                    }
                                    slotProps={{
                                        textField: {
                                            error: errors.end_date,
                                            helperText: errors.end_date
                                                ? errors.end_date
                                                : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                    disabled={isLoading}
                                />
                            </Box>

                            {/*fecha de inicio y fin de empresas*/}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 2,
                                }}
                            >
                                <DatePicker
                                    label="Fecha Inicio Empresas"
                                    value={form.company_creation_start_date}
                                    onChange={(date) =>
                                        handleDateChange(
                                            "company_creation_start_date",
                                            date
                                        )
                                    }
                                    disabled={
                                        !form.start_date ||
                                        !form.end_date ||
                                        isLoading
                                    }
                                    maxDate={form.end_date}
                                    minDate={form.start_date}
                                    slotProps={{
                                        textField: {
                                            error: errors.company_creation_start_date,
                                            helperText:
                                                errors.company_creation_start_date
                                                    ? errors.company_creation_start_date
                                                    : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                />
                                <DatePicker
                                    label="Fecha Fin Empresas"
                                    value={form.company_creation_end_date}
                                    onChange={(date) =>
                                        handleDateChange(
                                            "company_creation_end_date",
                                            date
                                        )
                                    }
                                    disabled={
                                        !form.start_date ||
                                        !form.end_date ||
                                        isLoading
                                    }
                                    maxDate={form.end_date}
                                    minDate={form.start_date}
                                    slotProps={{
                                        textField: {
                                            error: errors.company_creation_end_date,
                                            helperText:
                                                errors.company_creation_end_date
                                                    ? errors.company_creation_end_date
                                                    : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                />
                            </Box>

                            {/*fecha de inicio y fin de planificación*/}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 2,
                                }}
                            >
                                <DatePicker
                                    label="Fecha Inicio Planificación"
                                    value={form.planning_start_date}
                                    onChange={(date) =>
                                        handleDateChange(
                                            "planning_start_date",
                                            date
                                        )
                                    }
                                    slotProps={{
                                        textField: {
                                            error: errors.planning_start_date,
                                            helperText:
                                                errors.planning_start_date
                                                    ? errors.planning_start_date
                                                    : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                    disabled={
                                        !form.start_date ||
                                        !form.end_date ||
                                        isLoading
                                    }
                                    maxDate={form.end_date}
                                    minDate={form.start_date}
                                />
                                <DatePicker
                                    label="Fecha Fin Planificación"
                                    value={form.planning_end_date}
                                    onChange={(date) =>
                                        handleDateChange(
                                            "planning_end_date",
                                            date
                                        )
                                    }
                                    slotProps={{
                                        textField: {
                                            error: errors.planning_end_date,
                                            helperText: errors.planning_end_date
                                                ? errors.planning_end_date
                                                : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                    disabled={
                                        !form.start_date ||
                                        !form.end_date ||
                                        isLoading
                                    }
                                    maxDate={form.end_date}
                                    minDate={form.start_date}
                                />
                            </Box>

                            {/*fecha de inicio y fin de planificación*/}
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    gap: 2,
                                }}
                            >
                                <DatePicker
                                    label="Fecha Inicio Evaluación"
                                    value={form.evaluation_start_date}
                                    onChange={(date) =>
                                        handleDateChange(
                                            "evaluation_start_date",
                                            date
                                        )
                                    }
                                    slotProps={{
                                        textField: {
                                            error: errors.evaluation_start_date,
                                            helperText:
                                                errors.evaluation_start_date
                                                    ? errors.evaluation_start_date
                                                    : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                    disabled={
                                        !form.start_date ||
                                        !form.end_date ||
                                        isLoading
                                    }
                                    maxDate={form.end_date}
                                    minDate={form.start_date}
                                />
                                <DatePicker
                                    label="Fecha Fin Evaluación"
                                    value={form.evaluation_end_date}
                                    onChange={(date) =>
                                        handleDateChange(
                                            "evaluation_end_date",
                                            date
                                        )
                                    }
                                    slotProps={{
                                        textField: {
                                            error: errors.evaluation_end_date,
                                            helperText:
                                                errors.evaluation_end_date
                                                    ? errors.evaluation_end_date
                                                    : "DD/MM/AAAA",
                                        },
                                    }}
                                    format="dd/MM/yyyy"
                                    disabled={
                                        !form.start_date ||
                                        !form.end_date ||
                                        isLoading
                                    }
                                    maxDate={form.end_date}
                                    minDate={form.start_date}
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
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <CircularProgress size={24} />
                        ) : (
                            "Registrar Período"
                        )}
                    </Button>
                </form>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={10000}
                    onClose={() =>
                        setSnackbar({
                            ...snackbar,
                            open: false,
                        })
                    }
                    message={snackbar.message}
                    severity={snackbar.severity}
                />
            </Box>
        </Container>
    );
};

export default RegisterAcademicPeriod;
