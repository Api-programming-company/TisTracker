import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import Hu from "../components/Hu";

const AgregarEntregable = () => {
  const [formData, setFormData] = useState({
    nombre_hito: "",
    fecha_ini: "",
    fecha_entrega: "",
    cobro: "",
    hu: [{ nombre_hu: "", responsable: "", objetivo: "" }],
  });

  const [errors, setErrors] = useState({
    nombre_hito: "",
    fecha_ini: "",
    fecha_entrega: "",
    cobro: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleDateIniChange = (e) => {
    let f = "fecha_ini";
    try {
      const value = new Date(e).toISOString();
      setFormData({ ...formData, [f]: value });
      setErrors({ ...errors, [f]: "" });
    } catch (e) {}
  };

  const handleDateFinChange = (e) => {
    let f = "fecha_entrega";
    try {
      const value = new Date(e).toISOString();
      setFormData({ ...formData, [f]: value });
      setErrors({ ...errors, [f]: "" });
    } catch (e) {}
  };

  const handleAgregarHu = (e) => {
    let x = "hu"
    let actual = formData.hu
    let nuevo = [...actual, { nombre_hu: "", responsable: "", objetivo: "" }]
    setFormData({...formData, [x]: nuevo});
  };

  const handleRegister = () => {
    const { nombre_hito, fecha_ini, fecha_entrega, cobro } = formData;
    let hasError = false;
    const newErrors = {};

    const validations = {
      nombre_hito: {
        condition: !nombre_hito,
        message: "El nombre del producto entregable es obligatorio.",
      },
      fecha_ini: {
        condition: !fecha_ini,
        message: "La fecha de inicio es obligatorio.",
        // additionalCheck: errors.email, aca falta controlar fechas raritas
      },
      fecha_entrega: {
        condition: !fecha_entrega,
        message: "La fecha de entrega es obligatorio.",
        // additionalCheck: errors.email, aca falta controlar fechas raritas
      },
      cobro: {
        condition: !cobro,
        message: "El cobro en porcentaje es obligatorio.",
        // additionalCheck:
        //   !validarContraseña(contraseña) &&
        //   "Debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.",
      },
    };

    for (const [
      field,
      { condition, message, additionalCheck },
    ] of Object.entries(validations)) {
      if (condition || additionalCheck) {
        newErrors[field] = additionalCheck || message;
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Si todo es válido, proceder con el registro
    const dataToSend = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    console.log("Enviando datos:", dataToSend);
    // setIsRegistering(true);
  };

  //   useEffect(()=> {
  //     console.log(formData)
  //   },[formData])

  return (
    <div>
      <Typography variant="h3">
        Agregar producto entregable a planificación
      </Typography>

      <TextField
        label="Nombre del hito"
        variant="outlined"
        name="nombre_hito"
        fullWidth
        style={{ marginBottom: "16px" }}
        onChange={handleInputChange}
        error={Boolean(errors.nombre_hito)}
        helperText={errors.nombre_hito}
      />

      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha de inicio"
          onChange={handleDateIniChange}
          error={Boolean(errors.fecha_ini)}
          slotProps={{
            textField: {
              helperText: errors.fecha_ini,
            },
          }}
        />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Fecha de entrega"
          onChange={handleDateFinChange}
          error={Boolean(errors.fecha_entrega)}
          slotProps={{
            textField: {
              helperText: errors.fecha_entrega,
            },
          }}
        />
      </LocalizationProvider>
      <TextField
        label="Porcentaje de cobro (%)"
        variant="outlined"
        name="cobro"
        fullWidth
        style={{ margin: "16px 0px" }}
        onChange={handleInputChange}
        error={Boolean(errors.cobro)}
        helperText={errors.cobro}
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
          },
        }}
      />

      <Box sx={{ display: "flex" }}>
        <Typography variant="h4">Historias de usuario</Typography>
        <Button
          variant="outlined"
          color="primary"
          style={{ marginRight: "8px", color: "black" }}
          onClick={handleAgregarHu}
        >
          Agregar
        </Button>
      </Box>

      <Stack spacing={2}>
        {formData.hu.map( e => <Hu /> )}
      </Stack>

      <Button
        variant="contained"
        color="primary"
        style={{ marginRight: "8px", color: "black" }}
        onClick={handleRegister}
      >
        Registrar
      </Button>
    </div>
  );
};

export default AgregarEntregable;
