import React, { useContext, useEffect } from "react";
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

  const { state, clearState, setInitialState, handleTitleChange, addCriteria } =
    useContext(EvaluateContext);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        handleTitleChange(value);
        break;
      default:
        break;
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
        variant="outlined"
        value={state.title}
        label="Nombre de plantilla"
        name="title"
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
          return <Criteria key={e.id} criteria={e} />;
        })
      ) : (
        <p>no hay questions jaja</p>
      )}
      <Button
        variant="contained"
        sx={{ marginX: 3, marginY: 3 }}
        onClick={addCriteria}
      >
        Agregar Criterio
      </Button>
    </Container>
  );
};

export default EvaluationTemplate;
