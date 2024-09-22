import {
  Box,
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  IconButton,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useContext, useEffect, useState } from "react";
import Hu from "./Hu";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogMod from "./DialogMod";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ValidContex from "../context/validDataPlanification/ValidContext";

const Entregable = ({ entregable, onUpdate, onDelete, toEdit = false }) => {
  const { validateEntregable } = useContext(ValidContex);
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

  // para dialog -----------------
  const [open, setOpen] = useState(false);

  const handleAceptarDelete = () => {
    onDelete(formData.id);
    //post del id del hito para que lo elimine de la DB
    console.log(formData);
    setOpen(false);
  };
  // ----------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newFormData = { ...prevState, [name]: value };
      setErrors({ ...errors, [name]: "" });
      onUpdate(newFormData);
      return newFormData;
    });
  };

  const handleDateIniChange = (e) => {
    let f = "fecha_ini";
    try {
      const value = new Date(e).toISOString();
      setFormData((prevState) => {
        const newFormData = { ...prevState, [f]: value };
        setErrors({ ...errors, [f]: "" });
        onUpdate(newFormData);
        return newFormData;
      });
    } catch (error) {
      console.error("Error al manejar la fecha:", error);
    }
  };

  const handleDateFinChange = (e) => {
    let f = "fecha_entrega";
    try {
      const value = new Date(e).toISOString();
      setFormData((prevState) => {
        const newFormData = { ...prevState, [f]: value };
        setErrors({ ...errors, [f]: "" });
        onUpdate(newFormData);
        return newFormData;
      });
    } catch (error) {
      console.error("Error al manejar la fecha:", error);
    }
  };

  const handleAgregarHu = () => {
    setFormData((prevState) => {
      let x = "hu";
      let newHu = [
        ...prevState.hu,
        {
          id: Date.now(),
          nombre_hu: "Entregable",
          responsable: "",
          objetivo: "",
        },
      ];
      let newFormData = { ...prevState, [x]: newHu };
      onUpdate(newFormData);
      return newFormData;
    });
  };

  const handleEliminarHu = (id) => {
    setFormData((prevState) => {
      let x = "hu";
      let newHu = prevState.hu.filter((e) => e.id !== id);
      let newFormData = { ...prevState, [x]: newHu };
      onUpdate(newFormData);
      return newFormData;
    });
  };

  const handleUpdateHu = (updatedData) => {
    let x = "hu";
    let nuevo = formData.hu.map((e) =>
      e.id === updatedData.id ? updatedData : e
    );

    // Actualiza el estado y luego llama a onUpdate con el valor nuevo
    const updatedFormData = { ...formData, [x]: nuevo };
    setFormData(updatedFormData);
    onUpdate(updatedFormData); // Pasamos el valor actualizado a onUpdate
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

    validateEntregable(hasError);

    if (formData.hu.length === 0) {
      return;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }
  };

  useEffect(() => {
    handleRegister();
  }, [formData]);

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
        slotProps={{
          input: {
            readOnly: toEdit,
          },
        }}
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
            label="Fecha de inicio MM/DD/YYYY*"
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
            readOnly={toEdit}
            format="dd/MM/yyyy"
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Fecha de entrega MM/DD/YYYY*"
            value={
              formData.fecha_entrega ? new Date(formData.fecha_entrega) : null
            }
            onChange={handleDateFinChange}
            renderInput={(params) => (
              <TextField
                {...params}
                error={Boolean(errors.fecha_entrega)}
                helperText={errors.fecha_entrega}
                aria-describedby="fecha_entrega-error"
              />
            )}
            readOnly={toEdit}
            format="dd/MM/yyyy"
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
        aria-describedby="cobro-error"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">%</InputAdornment>,
            readOnly: toEdit,
          },
        }}
      />

      <Typography variant="h4" sx={{ marginY: 2 }}>
        Entregables
      </Typography>

      <Stack spacing={2}>
        {formData.hu.map((e) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ backgroundColor: "whitesmoke" }}
            >
              <Typography>{e.nombre_hu}</Typography>
            </AccordionSummary>

            <AccordionDetails sx={{ backgroundColor: "whitesmoke" }}>
              <Box sx={{ backgroundColor: "whitesmoke" }}>
                <Hu
                  key={e.id}
                  handleEliminarHu={handleEliminarHu}
                  onUpdate={handleUpdateHu}
                  info={e}
                  toEdit={toEdit}
                />
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAgregarHu}
            disabled={toEdit}
          >
            Agregar entregable
          </Button>
        </Box>
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <IconButton
          onClick={() => setOpen(true)}
          color="error"
          aria-label="Eliminar entregable"
          sx={{ ml: 2 }}
          disabled={toEdit}
        >
          <DeleteIcon /> Quitar hito
        </IconButton>
        <DialogMod
          open={open}
          setOpen={setOpen}
          title={"Eliminar hito"}
          content={"¿Estás seguro de que deseas eliminar el hito?"}
          onAccept={handleAceptarDelete}
        />
      </Box>
    </Box>
  );
};

export default Entregable;
