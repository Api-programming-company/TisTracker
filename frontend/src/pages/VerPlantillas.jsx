import React, { useContext, useEffect } from "react";
import {
  CircularProgress,
  Container,
  Divider,
  Grid2,
  Typography,
} from "@mui/material";
import Question from "../components/evaluation/Question";
import RadioOption from "../components/evaluation/RadioOption";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import { useParams } from "react-router-dom";
import { useGetCompanyQuestionsByIdQuery } from "../api/evaluationApi";

const VerPlantillas = () => {
  const { evaluation_id } = useParams();

  const {
    data: companyQuestions,
    isSuccess: companyQuestionsSuccess,
    isFetching: companyQuestionsFetching,
    isError: isCompanyQuestionsError,
    error: companyQuestionsError,
  } = useGetCompanyQuestionsByIdQuery(evaluation_id);

  useEffect(() => {
    if (companyQuestionsSuccess) {
      console.log(companyQuestions);
      setInitialState(companyQuestions);
    }
    if (isCompanyQuestionsError) {
      console.log(companyQuestionsError);
    }
  }, [
    companyQuestions,
    companyQuestionsFetching,
    isCompanyQuestionsError,
    companyQuestionsError,
    companyQuestionsSuccess,
  ]);

  const { state, setInitialState } = useContext(EvaluateContext);

  useEffect(() => {
    console.log(state.questions, "estado");
  }, [state]);

  if (companyQuestionsFetching) {
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
    <Container sx={{ paddingY: 1, mb: 6 }} maxWidth="xl">
      <Typography
        component="h1"
        sx={{ fontSize: "40px", lineHeight: "1", marginY: 3 }}
      >
        Planilla de Evaluación: {state.title}
      </Typography>
      <Divider sx={{ width: "100%" }} />{" "}
      <Typography
        component="h2"
        sx={{ fontSize: "30px", lineHeight: "1", marginY: 3 }}
      >
        Criterios de Evaluación
      </Typography>
      <Grid2
        container
        spacing={0}
        sx={{
          "--Grid-columns": 6,
          "--Grid-columnSpacing": "0px",
          "--Grid-rowSpacing": "16px",
        }}
      >
        {state.questions &&
          state.questions.map((e, index = 0) => {
            return (
              <>
                <Grid2 sx={{ width: "100%" }}>
                  <Question
                    key={e.id}
                    question={`${index + 1}. ${e.question_text}`}
                  />
                </Grid2>
                <RadioOption
                  key={e.id}
                  answer_options={e.answer_options}
                  question_id={e.id}
                />
                <Divider sx={{ width: "100%" }} />{" "}
              </>
            );
          })}
      </Grid2>
    </Container>
  );
};

export default VerPlantillas;
