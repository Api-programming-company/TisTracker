import {
  Divider,
  Box,
  Button,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useParams } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import Socio from "../components/Socio";
import VerHito from "../components/VerHito";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import EditIcon from "@mui/icons-material/Edit";
import DialogMod from "../components/DialogMod";
import ValidContex from "../context/validDataPlanification/ValidContext";
import CompanyDetails from "../components/company/CompanyDetails";

const VerGE = () => {
  const { id } = useParams();
  const { data, error, isSuccess, isLoading, isError, isFetching } =
    useGetCompanyByIdQuery(id);
  const [formData, setFormData] = useState(null);
  const { isValidH, isValidE } = useContext(ValidContex);
  useEffect(() => {
    if (isSuccess) {
      setFormData(data); // Asigna los datos de la empresa al estado
      console.log(data);
      
    }
    if (isError) {
      console.error("Error fetching company data:", error);
    }
  }, [data, isSuccess, isError, error]);

  const [expanded, setExpanded] = useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
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
    if (!isValidE && !isValidH) {
      window.alert("valido");
      //post enviar formData para que guarde los datos modificados
    } else {
      window.alert("no valido");
      setEditar(!editar);
    }
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
    const newPlanificacion = formData.company.plannings[0].filter(
      (e) => e.id !== id
    );
    setFormData({ ...formData, [x]: newPlanificacion });
  };

  const handleUpdateInfo = (infoHito) => {
    setFormData((prevState) => {
      let x = "planificacion";
      let updatedPlanificacion = formData.company.plannings[0].map((e) =>
        e.id === infoHito.id ? infoHito : e
      );
      let newFormData = { ...prevState, [x]: updatedPlanificacion };
      return newFormData;
    });
  };

  const handleAgregarHito = () => {
    let newHito = {
      id: Date.now(),
      nombre_hito: "",
      fecha_ini: "",
      fecha_entrega: "",
      cobro: "",
      hu: [],
    };
    setFormData((prevState) => {
      let x = "planificacion";
      let newFormData = {
        ...prevState,
        [x]: [...prevState.planificacion, newHito],
      };
      return newFormData;
    });
  };

  if (isLoading || isFetching) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }

  // Si hay un error, muestra un mensaje de error
  if (isError) return <div>Error al cargar los datos de la empresa</div>;

  // Si no hay datos, evita que se rompa el renderizado
  if (!formData) return null;

  return (
    <Box sx={{ maxWidth: 900, margin: "auto", padding: 2 }}>
      {/* Información importante destacada */}
      <CompanyDetails company={formData.company} />

      {/* Socios del Grupo */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Socios del Grupo ({formData.company.members.length})
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
            formData.company.members.map((e) => (
              <Socio
                key={e.id}
                primary={`${e.full_name}`}
                secondary={e.permission === "R" ? "Socio" : "Encargado"}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingY: 2,
          }}
        >
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxHeight: expandedPlanificacion ? "none" : 300,
            overflow: "hidden",
          }}
        >
          {formData.milestones.map((milestone) => (
            <VerHito
              key={milestone.id}
              entregable={milestone}
              onDelete={handleEliminarHitoEdit}
              editar={editar}
              setEditar={setEditar}
              onUpdate={handleUpdateInfo}
            />
          ))}
          {formData.milestones.length === 0 ? (
            <Box sx={{ padding: 2 }}>
              {" "}
              <Typography variant="h6">
                Aún no tiene hitos planificados
              </Typography>
            </Box>
          ) : null}
          <Box sx={{ padding: 2 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAgregarHito}
              disabled={editar}
            >
              Agregar hito
            </Button>
          </Box>
        </Box>

        {formData.milestones.length > 0 && (
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
