import React, { useContext, useEffect, useState } from "react";
import { useCreateEvaluationTemplateMutation } from "../api/evaluationApi";
import {
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import Criteria from "../components/evaluationTemplate/Criteria";

const EvaluationTemplate = () => {
  const [
    createEvaluationTemplate,
    { data, isSuccess, isError, error, isLoading },
  ] = useCreateEvaluationTemplateMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
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

  const handleCreateTemplate = () => {
    validateErrors();
    if (state?.errors?.length >= 1) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  };

  return (
    <Container>
      <Typography
        component={"h1"}
        sx={{ color: "black", fontSize: "40px", lineHeight: "1" }}
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
        error={showError}
        helperText={findError("title")}
        fullWidth
        multiline
      />
      <TextField
        sx={{ marginY: 1 }}
        variant="outlined"
        value={state.description}
        label="Descripción (opcional)"
        name="description"
        onChange={handleInputChange}
        fullWidth
        multiline
      />
      <Typography
        component={"h2"}
        sx={{ fontSize: "30px", lineHeight: "1", marginY: 3 }}
      >
        Criterios de Evaluación
      </Typography>
      {state.questions?.length > 0 ? (
        state.questions.map((e) => {
          return (
            <Criteria
              key={e.id}
              criteria={e}
              findError={findError}
              setShowError={setShowError}
            />
          );
        })
      ) : (
        <p>no hay questions jaja</p>
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
          onClick={handleCreateTemplate}
        >
          Crear Plantilla
        </Button>
      </div>
    </Container>
  );
};

export default EvaluationTemplate;
