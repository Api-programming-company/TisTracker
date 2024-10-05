import React, { useContext, useEffect, useState } from "react";
import { evaluate } from "../utils/evaluaLikert";
import { Box, Button, Container, Grid2, Typography } from "@mui/material";
import Question from "../components/evaluation/Question";
import RadioOption from "../components/evaluation/RadioOption";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";

const Autoevaluation = () => {
  const ejemploEvaluacion = {
    evaluation: {
      id: 1,
      title: "Final Project Evaluation",
      description:
        "Evaluation for the final project submission. Please answer the following questions based on your experience.",
      questions: [
        {
          id: 1,
          text: "How satisfied are you with the project's overall quality?",
          answer_options: [
            {
              id: 1,
              text: "Very satisfied",
              score: "5",
            },
            {
              id: 2,
              text: "Satisfied",
              score: "4",
            },
            {
              id: 3,
              text: "Neutral",
              score: "3",
            },
            {
              id: 4,
              text: "Dissatisfied",
              score: "2",
            },
            {
              id: 5,
              text: "Very dissatisfied",
              score: "1",
            },
          ],
        },
        {
          id: 2,
          text: "How well did the team meet deadlines?",
          answer_options: [
            {
              id: 6,
              text: "Always on time",
              score: "5",
            },
            {
              id: 7,
              text: "Mostly on time",
              score: "4",
            },
            {
              id: 8,
              text: "Sometimes late",
              score: "3",
            },
            {
              id: 9,
              text: "Often late",
              score: "2",
            },
            {
              id: 10,
              text: "Always late",
              score: "1",
            },
          ],
        },
        {
          id: 3,
          text: "How would you rate the team's communication?",
          answer_options: [
            {
              id: 11,
              text: "Excellent",
              score: "4",
            },
            {
              id: 12,
              text: "Good",
              score: "3",
            },
            {
              id: 13,
              text: "Fair",
              score: "2",
            },
            {
              id: 14,
              text: "Poor",
              score: "1",
            },
          ],
        },
        {
          id: 4,
          text: "Was the project scope clearly defined?",
          answer_options: [
            {
              id: 15,
              text: "Yes, very clear",
              score: "3",
            },
            {
              id: 16,
              text: "Somewhat clear",
              score: "2",
            },
            {
              id: 17,
              text: "No, not clear",
              score: "1",
            },
          ],
        },
        {
          id: 5,
          text: "How would you rate the technical quality of the work?",
          answer_options: [
            {
              id: 18,
              text: "Excellent",
              score: "5",
            },
            {
              id: 19,
              text: "Good",
              score: "4",
            },
            {
              id: 20,
              text: "Average",
              score: "3",
            },
            {
              id: 21,
              text: "Poor",
              score: "2",
            },
            {
              id: 22,
              text: "Very poor",
              score: "1",
            },
          ],
        },
        {
          id: 6,
          text: "How likely are you to recommend this project to others?",
          answer_options: [
            {
              id: 23,
              text: "Very likely",
              score: "5",
            },
            {
              id: 24,
              text: "Somewhat likely",
              score: "4",
            },
            {
              id: 25,
              text: "Neutral",
              score: "3",
            },
            {
              id: 26,
              text: "Somewhat unlikely",
              score: "2",
            },
            {
              id: 27,
              text: "Very unlikely",
              score: "1",
            },
          ],
        },
        {
          id: 7,
          text: "How well did the project meet the initial objectives?",
          answer_options: [
            {
              id: 28,
              text: "Exceeded expectations",
              score: "5",
            },
            {
              id: 29,
              text: "Met expectations",
              score: "4",
            },
            {
              id: 30,
              text: "Partially met expectations",
              score: "3",
            },
            {
              id: 31,
              text: "Did not meet expectations",
              score: "1",
            },
          ],
        },
        {
          id: 8,
          text: "How would you rate the team's problem-solving abilities?",
          answer_options: [
            {
              id: 32,
              text: "Excellent",
              score: "4",
            },
            {
              id: 33,
              text: "Good",
              score: "3",
            },
            {
              id: 34,
              text: "Fair",
              score: "2",
            },
            {
              id: 35,
              text: "Poor",
              score: "1",
            },
          ],
        },
        {
          id: 9,
          text: "How would you rate the team's collaboration skills?",
          answer_options: [
            {
              id: 36,
              text: "Excellent",
              score: "4",
            },
            {
              id: 37,
              text: "Good",
              score: "3",
            },
            {
              id: 38,
              text: "Fair",
              score: "2",
            },
            {
              id: 39,
              text: "Poor",
              score: "1",
            },
          ],
        },
        {
          id: 10,
          text: "How satisfied are you with the final product?",
          answer_options: [
            {
              id: 40,
              text: "Very satisfied",
              score: "5",
            },
            {
              id: 41,
              text: "Satisfied",
              score: "4",
            },
            {
              id: 42,
              text: "Neutral",
              score: "3",
            },
            {
              id: 43,
              text: "Dissatisfied",
              score: "2",
            },
            {
              id: 44,
              text: "Very dissatisfied",
              score: "1",
            },
          ],
        },
      ],
    },
  };

  const { state, setInitialState, verifyFields, clearState } =
    useContext(EvaluateContext);
  const [loading, setLoading] = useState(true); // para simular el isloading borrar luego
  useEffect(() => {
    clearState();
    setInitialState(ejemploEvaluacion.evaluation);
    console.log(state);
    setLoading(!loading);
  }, []);

  return (
    !loading && (
      <Container sx={{ paddingY: 1 }} maxWidth="xl">
        <Typography
          component="h1"
          sx={{ color: "black", fontSize: "40px", lineHeight: "1", marginY: 3 }}
        >
          {state.title}
        </Typography>

        <Typography
          component="h3"
          sx={{ color: "black", fontSize: "20px", lineHeight: "1", marginY: 3 }}
        >
          {state.description}
        </Typography>

        <Grid2 container spacing={2}>
          {state.questions.map((e) => {
            return (
              <>
                <Grid2 size={{ sm: 12, md: 6 }}>
                  <Question key={e.id} question={e.text} />
                </Grid2>

                <RadioOption
                  key={e.id}
                  answer_options={e.answer_options}
                  question_id={e.id}
                />
              </>
            );
          })}
        </Grid2>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 5 }}>
          <Button
            variant="contained"
            sx={{ paddingX: 8, paddingY: 1 }}
            onClick={verifyFields}
          >
            Enviar
          </Button>
        </Box>
      </Container>
    )
  );
};

export default Autoevaluation;
