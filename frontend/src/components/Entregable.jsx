import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useEffect, useState } from "react";
import Hu from "./Hu";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const Entregable = ({ entregable, onUpdate, onDelete, trigger, setTrigger}) => {
  const [formData, setFormData] = useState({
    id: entregable?.id,
    nombre_hito: entregable?.nombre_hito || "",
    fecha_ini: entregable?.fecha_ini || "",
    fecha_entrega: entregable?.fecha_entrega || "",
    cobro: entregable?.cobro || "",
    hu: entregable?.hu || [],
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
    onUpdate(formData)
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
    let nuevo = [...actual, { id: Date.now(), nombre_hu: "", responsable: "", objetivo: "" }];
    setFormData({ ...formData, [x]: nuevo });
  };

  const handleEliminarHu = (id) => {
    let x = "hu";
    setFormData({ ...formData, [x]: formData.hu.filter(e => e.id !== id) });
  };

  const handleUpdateHu = (updatedData) => {
    let x = "hu"
    let nuevo = formData.hu.map(e =>
      e.id === updatedData.id ? updatedData : e
    )
    setFormData({...formData, [x]: nuevo});
    onUpdate(formData)
  }

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

    if (formData.hu.length === 0){
      setTrigger(false)
    }

    if (hasError) {
      setErrors(newErrors);
      setTrigger(false)
      return;
    }
  };

  useEffect(() => {
    if(trigger){
      handleRegister()
    }
  },[trigger])

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", padding: 2 }}>
      <TextField
        label="Nombre del hito*"
        variant="outlined"
        name="nombre_hito"
        fullWidth
        sx={{ marginBottom: 2 }}
        onChange={handleInputChange}
        value={formData.nombre_hito}
        error={Boolean(errors.nombre_hito)}
        helperText={errors.nombre_hito}
        aria-describedby="nombre_hito-error"
        multiline
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          flexWrap: "wrap",
          "& > *": {
            flex: 1,
            minWidth: { xs: "100%", sm: "auto" },
            boxSizing: "border-box",
          },
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha de inicio*"
            value={formData.fecha_ini ? new Date(formData.fecha_ini) : null}
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
            value={formData.fecha_entrega ? new Date(formData.fecha_entrega) : null}
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

      <TextField
        label="Porcentaje de cobro (%)"
        variant="outlined"
        name="cobro"
        fullWidth
        sx={{ margin: "16px 0" }}
        onChange={handleInputChange}
        value={formData.cobro}
        error={Boolean(errors.cobro)}
        helperText={errors.cobro}
        InputProps={{
          startAdornment: <InputAdornment position="start">%</InputAdornment>,
        }}
        aria-describedby="cobro-error"
      />

      <Typography variant="h4" sx={{ marginY: 2 }}>
        Historias de usuario
      </Typography>
        
      <Stack spacing={2}>
        {formData.hu.map( e => (
          <Hu key={e.id} handleEliminarHu={handleEliminarHu} onUpdate={handleUpdateHu} info={e} trigger={trigger} setTrigger={setTrigger}  />
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
      
        <IconButton
          onClick={onDelete}
          color="error"
          aria-label="Eliminar entregable"
          sx={{ ml: 2 }}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Entregable;
