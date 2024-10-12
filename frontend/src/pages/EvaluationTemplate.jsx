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

  // const { state, clearState, setInitialState, handleTitleChange } =
  //   useContext(EvaluateContext);
  // useEffect(() => {
  //   clearState();
  //   setInitialState({
  //     id: Date.now(),
  //     title: "",
  //     description: "",
  //     questions: [
  //       // las questions son los criterios
  //     ],
  //   });
  // }, []);

  const [template, setTemplate] = useState({
    id: Date.now(),
    title: "",
    description: "",
    questions: [
      // las questions son los criterios
    ],
  });

  const handleAddCriteria = () => {
    const newCriteria = {
      id: Date.now(),
      question_text: "",
      answer_options: [],
    };
    setTemplate((prev) => {
      return { ...prev, questions: [...prev.questions, newCriteria] };
    });
    console.log(template);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "title":
        setTemplate((prev) => {
          return { ...prev, title: value };
        });
        console.log(template);
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
        value={template.title}
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
      {template.questions?.length > 0 ? (
        template.questions.map((e) => {
          return <Criteria key={Date.now()} criteria={e} />;
        })
      ) : (
        <p>no hay questions jaja</p>
      )}
      <Button
        variant="contained"
        sx={{ marginX: 3, marginY: 3 }}
        onClick={handleAddCriteria}
      >
        Agregar Criterio
      </Button>
    </Container>
  );
};

export default EvaluationTemplate;
