import {
  Divider,
  Box,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import Socio from "../components/Socio";
import VerHito from "../components/VerHito";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DialogMod from "../components/DialogMod";

const VerGE = () => {
  const getInfo = {
    nombre_largo: "Vamos equipo S.R.L.",
    nombre_corto: "Vamo",
    correo: "vamos_equipo@vamos.com",
    direccion: "Av. Petrolera",
    telefono: "4444444",
    consultor_tis: "L.B.",
    gestion: "Gestion I-2024",
    integrantes: [
      { id: 1, nombre: "Roberto", apellidos: "Calorias" },
      { id: 2, nombre: "Redondinho", apellidos: "Laicas" },
      { id: 3, nombre: "David", apellidos: "Bacon" },
      { id: 4, nombre: "Lola", apellidos: "Mento" },
      { id: 5, nombre: "Jacky", apellidos: "Sieras" },
      { id: 6, nombre: "Susana", apellidos: "Horia" },
    ],
    planificacion: [
      {
        id: 1,
        nombre_hito: "Hito 1",
        fecha_ini: "12/09/2024",
        fecha_entrega: "16/09/2024",
        cobro: "10",
        hu: [
          {
            id: 1,
            nombre_hu: "Documentacion Parte A",
            responsable: "Susana Horia",
            objetivo:
              "Redactar la parte B de la documentacionRedactar la parte B de la documentacionRedactar la parte B de la documentacion",
          },
          {
            id: 2,
            nombre_hu: "Documentacion Parte B",
            responsable: "David Bacon",
            objetivo: "Redactar la parte B de la documentacion",
          },
        ],
      },
      {
        id: 2,
        nombre_hito: "Hito 2",
        fecha_ini: "22/09/2024",
        fecha_entrega: "26/09/2024",
        cobro: "15",
        hu: [
          {
            id: 1,
            nombre_hu: "Documento de especificacion de requerimientos",
            responsable: "Jacky Sieras",
            objetivo: "Analizar los requerimientos del sistema",
          },
          {
            id: 2,
            nombre_hu: "Documentación de arquitectura de software",
            responsable: "Lola Mento",
            objetivo: "Diseñar la arquitectura de software",
          },
        ],
      },
    ],
  };
  const [formData, setFormData] = useState(getInfo);
  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const navigate = useNavigate();
  const [expandedSocios, setExpandedSocios] = useState(false);
  const [expandedPlanificacion, setExpandedPlanificacion] = useState(false);
  const [editar, setEditar] = useState(true);
  // para dialog------------------
  const [open, setOpen] = useState(false);
  const handleCancelarGuardado = () => {
    setEditar(!editar);
    setOpen(false);
  };
  const handleAceptarGuardado = () => {
    //post enviar formData para que guarde los datos modificados
    console.log(formData);
    setOpen(false);
  };
  //----------------------------
  const handleClickButton = () => {
    if (!editar) {
      setOpen(true);
    }
    setEditar(!editar);
  };

  const handleEliminarHitoEdit = (id) => {
    let x = "planificacion";
    const newPlanificacion = formData.planificacion.filter((e) => e.id !== id);
    setFormData({ ...formData, [x]: newPlanificacion });
  };

  const handleUpdateInfo = (infoHito) => {
    setFormData((prevState) => {
      let x = "planificacion";
      let updatedPlanificacion = formData.planificacion.map((e) =>
        e.id === infoHito.id ? infoHito : e
      );
      let newFormData = { ...prevState, [x]: updatedPlanificacion };
      return newFormData;
    });
  };

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 2 }}>
      {/* Información importante destacada */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4">
          {formData.nombre_largo} ({formData.nombre_corto})
        </Typography>
        <Typography variant="h6" color="textSecondary">
          {formData.correo} | {formData.telefono} | {formData.direccion}
        </Typography>
      </Box>

      {/* Detalles del Grupo Empresa */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Detalles del Grupo Empresa
        </Typography>
        <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Consultor TIS</Typography>
            <Typography>{formData.consultor_tis}</Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">Gestión</Typography>
            <Typography>{formData.gestion}</Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Socios del Grupo */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Socios del Grupo ({formData.integrantes.length})
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            maxHeight: expandedSocios ? "none" : 200,
            overflow: "hidden",
            transition: "max-height 0.3s ease",
          }}
        >
          {expandedSocios &&
            formData.integrantes.map((e) => (
              <Socio
                key={e.id}
                primary={`${e.nombre} ${e.apellidos}`}
                secondary={"Socio"}
              />
            ))}
        </Box>
        <Button
          variant="text"
          onClick={() => setExpandedSocios(!expandedSocios)}
          startIcon={expandedSocios ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          sx={{ marginTop: 2 }}
        >
          {expandedSocios ? "Ver menos" : "Ver más"}
        </Button>
      </Box>

      <Divider sx={{ my: 4 }} />

      {/* Planificación */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography variant="h5" gutterBottom>
            Planificación
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            onClick={handleClickButton}
          >
            {editar ? "Editar planificación" : "Guardar"}
          </Button>
          <DialogMod
            open={open}
            setOpen={setOpen}
            title={"Guardar cambios"}
            content={
              "¿Estás seguro de que deseas guardar los cambios realizados?"
            }
            onCancel={handleCancelarGuardado}
            onAccept={handleAceptarGuardado}
          />
        </Box>
        {formData.planificacion.length === 0 ? (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/registerplan")}
          >
            Agregar planificación
          </Button>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxHeight: expandedPlanificacion ? "none" : 300,
              overflow: "hidden",
            }}
          >
            {formData.planificacion.map((e) => (
              <VerHito
                key={e.id}
                entregable={e}
                onDelete={handleEliminarHitoEdit}
                editar={editar}
                setEditar={setEditar}
                onUpdate={handleUpdateInfo}
              />
            ))}
          </Box>
        )}
        {formData.planificacion.length > 0 && (
          <Button
            variant="text"
            onClick={() => setExpandedPlanificacion(!expandedPlanificacion)}
            startIcon={
              expandedPlanificacion ? <ExpandLessIcon /> : <ExpandMoreIcon />
            }
            sx={{ marginTop: 2 }}
          >
            {expandedPlanificacion ? "Ver menos" : "Ver más"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default VerGE;
