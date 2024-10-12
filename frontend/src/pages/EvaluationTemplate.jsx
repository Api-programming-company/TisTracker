import React, { useContext, useEffect } from "react";
import { useCreateEvaluationTemplateMutation } from "../api/evaluationApi";
import { Container, Divider, TextField, Typography } from "@mui/material";
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

  const { state, clearState, setInitialState } = useContext(EvaluateContext);
  useEffect(() => {
    clearState();
    setInitialState({
      title: "",
      description: "",
      questions: [ // las questions son los criterios
        {
          question_text: "",
          answer_options: [
            {
              option_text: "",
              score: "",
            },
          ],
        },
      ],
    });
  }, []);

  return (
    <Container>
      <Typography
        component={"h1"}
        sx={{ color: "black", fontSize: "40px", lineHeight: "1" }}
      >
        Crear Plantilla de Evaluación
      </Typography>
    
      <Divider sx={{ width: "100%", marginY:3}} />{" "}

      <TextField
        variant="outlined"
        value={state.title}
        label="Nombre de plantilla"
        fullWidth
        multiline
      />

      <Typography
        component={"h2"}
        sx={{ fontSize: "30px", lineHeight: "1", marginY: 3 }}
      >
        Criterios de Evaluación
      </Typography>

      {state.questions ? state.questions.map(e=>{
        return (<Criteria key={new Date().now} criteria={e}/>)
      }) : <p>no hay questions jaja</p>}
    </Container>
  );
};

export default EvaluationTemplate;
