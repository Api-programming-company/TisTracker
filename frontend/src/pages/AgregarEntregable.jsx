import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useState } from "react";
import Hu from "../components/Hu";
import AddIcon from "@mui/icons-material/Add"; // Importar el icono de agregar
import DeleteIcon from "@mui/icons-material/Delete"; // Importar el icono de eliminar

const AgregarEntregable = () => {
  const [formData, setFormData] = useState({
    nombre_hito: "",
    fecha_ini: "",
    fecha_entrega: "",
    cobro: "",
    hu: [],
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

  const handleAgregarHu = () => {
    let x = "hu";
    let actual = formData.hu;
    let nuevo = [...actual, { nombre_hu: "", responsable: "", objetivo: "" }];
    setFormData({ ...formData, [x]: nuevo });
  };

  const handleEliminarHu = (index) => {
    let x = "hu";
    let actual = formData.hu.filter((_, i) => i !== index);
    setFormData({ ...formData, [x]: actual });
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
        message: "La fecha de inicio es obligatoria.",
      },
      fecha_entrega: {
        condition: !fecha_entrega,
        message: "La fecha de entrega es obligatoria.",
      },
      cobro: {
        condition: !cobro,
        message: "El cobro en porcentaje es obligatorio.",
      },
    };

    for (const [field, { condition, message }] of Object.entries(validations)) {
      if (condition) {
        newErrors[field] = message;
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
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <Typography variant="h3" gutterBottom>
        Agregar producto entregable a planificación
      </Typography>

      <TextField
        label="Nombre del hito*"
        variant="outlined"
        name="nombre_hito"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={handleInputChange}
        error={Boolean(errors.nombre_hito)}
        helperText={errors.nombre_hito}
        aria-describedby="nombre_hito-error"
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          flexWrap: "wrap", // Permite que los elementos se ajusten en pantallas más pequeñas
          "& > *": {
            flex: 1, // Hace que los elementos de fecha ocupen el espacio disponible
            minWidth: { xs: "100%", sm: "auto" }, // Asegura que en pantallas pequeñas ocupen el 100% del ancho
            boxSizing: "border-box", // Asegura que padding y border no afecten el ancho total
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha de inicio*"
            onChange={handleDateIniChange}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.fecha_ini)}
                helperText={errors.fecha_ini}
                aria-describedby="fecha_ini-error"
              />
            )}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha de entrega*"
            onChange={handleDateFinChange}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.fecha_entrega)}
                helperText={errors.fecha_entrega}
                aria-describedby="fecha_entrega-error"
              />
            )}
          />
        </LocalizationProvider>
      </Box>

      <Typography variant="h4" sx={{ marginY: 2 }}>
        Historias de usuario
      </Typography>

      <Stack spacing={2}>
        {formData.hu.map((e, index) => (
          <Hu key={index} index={index} handleEliminarHu={handleEliminarHu} />
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAgregarHu}
          >
            Agregar historia de usuario
          </Button>
        </Box>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "200px" }} // Ajusta el ancho según sea necesario
          onClick={handleRegister}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
};

export default AgregarEntregable;
