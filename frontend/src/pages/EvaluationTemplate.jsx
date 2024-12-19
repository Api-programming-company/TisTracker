import React, { useContext, useEffect, useState } from "react";
import { useCreateEvaluationTemplateMutation } from "../api/evaluationApi";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import Criteria from "../components/evaluationTemplate/Criteria";
import DialogMod from "../components/DialogMod";
import { useLocation, useNavigate } from "react-router-dom";
import BackBtn from "../components/navigation/BackBtn";

const EvaluationTemplate = () => {
  const location = useLocation();
  const period = location.state?.period;
  const [
    createEvaluationTemplate,
    { data, isSuccess, isError, error, isLoading },
  ] = useCreateEvaluationTemplateMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      setOpenConfirm(true);
    }
    if (isError) {
      console.log(error);
      setShowError(true);
      setSnackbarMessage(error?.data.message);
      setOpenSnackBar(true);
    }
  }, [isSuccess, isError, error, data]);

  const {
    state,
    clearState,
    setInitialState,
    handleTitleChange,
    handleDescriptionChange,
    addCriteria,
    validateErrors,
    handleScore,
  } = useContext(EvaluateContext);
  useEffect(() => {
    clearState();
    setInitialState({
      id: Date.now(),
      title: "",
      description: "",
      questions: [
        // las questions son los criterios
      ],
    });
  }, []);

  const [showError, setShowError] = useState(false);
  const [openCreateTemplate, setOpenCreateTemplate] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShowError(false);
    const { name, value } = e.target;
    switch (name) {
      case "title":
        handleTitleChange(value);
        break;
      case "description":
        handleDescriptionChange(value);
        break;
      default:
        break;
    }
  };

  const handleAddCriteria = () => {
    setShowError(false);
    addCriteria();
  };

  const findError = (field) => {
    const x = state?.errors?.filter((e) => e.from === field);
    if (x?.length >= 1 && showError) {
      return x[0].message;
    }
    return "";
  };

  const titleError = () => {
    if (showError) return error?.data?.errors?.title;
    return "";
  };
  const handleCreateTemplate = () => {
    setOpenCreateTemplate(false);
    if (state?.errors?.length >= 1) {
      setSnackbarMessage("Error, llena el formulario adecuadamente");
      setOpenSnackBar(true);
      setShowError(true);
    } else {
      setShowError(false);
      // quitar el id del state y enviarlo
      const { id, ...templateData } = state;
      const questionsWithoutId = templateData.questions.map(
        ({ id, ...rest }) => ({
          ...rest,
          answer_options: rest.answer_options.map(
            ({ id, ...optionRest }) => optionRest
          ),
        })
      );
      const dataToSend = { ...templateData, questions: questionsWithoutId };
      createEvaluationTemplate(state);
      console.log(state);
    }
  };

  if (isLoading) {
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

  return (
    <>
      <Box sx={{ position: "absolute" }}>
        <BackBtn
          url={`/academic-periods/docente-home/${period.id}`}
          period={period}
        />
      </Box>
      <Container>
        <Typography
          component={"h1"}
          sx={{ fontSize: "40px", lineHeight: "1", mt: 12 }}
        >
          Crear Plantilla de Evaluación
        </Typography>
        <Divider sx={{ width: "100%", marginY: 3 }} />{" "}
        <TextField
          sx={{ marginY: 1 }}
          variant="outlined"
          value={state.title}
          label="Nombre de plantilla*"
          name="title"
          onChange={handleInputChange}
          error={Boolean(error?.data?.errors?.title && showError) || showError}
          helperText={findError("title") || titleError()}
          fullWidth
          multiline
          inputProps={{ maxLength: 255 }}
        />
        <TextField
          sx={{ marginY: 1 }}
          variant="outlined"
          value={state.description}
          label="Descripción*"
          name="description"
          onChange={handleInputChange}
          error={Boolean(findError("description"))}
          helperText={findError("description")}
          fullWidth
          multiline
          inputProps={{ maxLength: 500 }}
        />
        <Typography
          component={"h2"}
          sx={{ fontSize: "30px", lineHeight: "1", marginY: 3 }}
        >
          Criterios de Evaluación
        </Typography>
        <Typography variant="overline">
          Los parámetros de evaluación deben organizarse en orden ascendente,
          partiendo del nivel más bajo hasta alcanzar el nivel más alto.
        </Typography>
        {state.questions?.length > 0 ? (
          state.questions.map((e) => {
            return (
              <Criteria
                key={e.id}
                criteria={e}
                findError={findError}
                setShowError={setShowError}
                showError={showError}
              />
            );
          })
        ) : (
          <p>Ningún criterio ha sido agregado todavía.</p>
        )}
        {findError("questions") && (
          <p className="text-red-300 text-sm ml-1">{findError("questions")}</p>
        )}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ marginX: 3, marginY: 3 }}
            onClick={handleAddCriteria}
          >
            Agregar Criterio
          </Button>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            sx={{ marginX: 3, marginY: 3, display: "block" }}
            onClick={() => {
              validateErrors();
              handleScore();
              setOpenCreateTemplate(true);
              setShowError(false);
            }}
          >
            Crear Plantilla
          </Button>
          <DialogMod
            open={openCreateTemplate}
            setOpen={setOpenCreateTemplate}
            title={"Crear plantilla"}
            content={"¿Estás seguro de realizar esta acción?"}
            onAccept={handleCreateTemplate}
          />

          <DialogMod
            open={openConfirm}
            setOpen={setOpenConfirm}
            title={"Confirmar"}
            content={"Se registró su plantilla con éxito"}
            onAccept={() =>
              navigate(`/academic-periods/docente-home/${period.id}`, {
                state: { period },
              })
            }
            onCancel={() =>
              navigate(`/academic-periods/docente-home/${period.id}`, {
                state: { period },
              })
            }
            showButtonCancel={false}
          />
        </div>
        <Snackbar
          open={openSnackBar}
          autoHideDuration={8000}
          onClose={() => setOpenSnackBar(false)}
          message={snackbarMessage}
          // action={action}
        />
      </Container>
    </>
  );
};

export default EvaluationTemplate;
