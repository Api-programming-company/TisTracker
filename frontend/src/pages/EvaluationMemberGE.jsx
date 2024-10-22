import React, { useContext, useEffect, useState } from "react";
import { evaluate } from "../utils/evaluaLikert";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  Snackbar,
  Typography,
  CircularProgress,
} from "@mui/material";
import Question from "../components/evaluation/Question";
import RadioOption from "../components/evaluation/RadioOption";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import { useNavigate } from "react-router-dom";
import DialogMod from "../components/DialogMod";
import { useCreateUserEvaluationMutation } from "../api/evaluationApi";
import { useParams } from "react-router-dom";
import { useGetEvaluationByCompanyUserIdQuery } from "../api/companyApi";

const EvaluationGE = () => {
  const { id } = useParams();
  const [createUserEvaluation, { data, error, isError, isLoading, isSuccess }] =
    useCreateUserEvaluationMutation();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openAlreadyEvaluated, setAlreadyEvaluated] = useState(false);
  const navigate = useNavigate();

  const {
    data: companyQuestions,
    isSuccess: companyQuestionsSuccess,
    isFetching: companyQuestionsFetching,
    isError: isCompanyQuestionsError,
    error: companyQuestionsError,
  } = useGetEvaluationByCompanyUserIdQuery({ id: id });

  useEffect(() => {
    if (companyQuestionsSuccess) {
      console.log(companyQuestions);
      setInitialState(companyQuestions.evaluation);
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

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setSnackbarMessage("Evaluación enviada correctamente.");
      setOpenSnack(true);
      setOpenConfirmModal(true);
    }
    if (isError) {
      console.log(error);
      setOpen(false);
      setSnackbarMessage(
        "Error al enviar la evaluación " || error?.data?.message
      );
      setAlreadyEvaluated(true);
      setOpenSnack(true);
    }
  }, [data, error, isError, isLoading, isSuccess]);

  const { state, setInitialState, verifyFields, clearState } =
    useContext(EvaluateContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAccept = () => {
    if (!state.isValid) {
      setSnackbarMessage("Debe responder a todas las preguntas");
      setOpenSnack(true);
      setOpen(false);
      return;
    }

    const finalGrade = evaluate(state.questions);
    // enviar finalGrade al back
    console.log({
      score: parseInt(finalGrade, 10),
      evaluatee_company_user_id: id,
    });
    createUserEvaluation({
      score: parseInt(finalGrade, 10),
      evaluatee_company_user_id: id,
    });
  };

  const handleConfirmAccept = () => {
    setOpenConfirmModal(false);
    navigate("/");
  };

  if (isLoading || companyQuestionsFetching) {
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

  if (isCompanyQuestionsError) {
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
        <Typography variant="h6" color="error">
          {companyQuestionsError.data?.message ||
            "Error al cargar los datos. Por favor, inténtelo de nuevo más tarde."}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ paddingY: 1 }} maxWidth="xl">
      <Typography
        component="h1"
        sx={{ fontSize: "40px", lineHeight: "1", marginY: 3 }}
      >
        {state.title}
      </Typography>

      <Typography
        component="h3"
        sx={{ fontSize: "20px", lineHeight: "1", marginY: 3 }}
      >
        {state.description}
      </Typography>
      <Typography
        component="h3"
        sx={{ fontSize: "20px", lineHeight: "1", marginY: 3 }}
      >
        <strong>Integrante a evaluar:</strong>{" "}
        {companyQuestions?.evaluatee?.full_name}
      </Typography>

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
      <Box sx={{ display: "flex", justifyContent: "center", margin: 5 }}>
        <Button
          variant="contained"
          sx={{ paddingX: 8, paddingY: 1 }}
          onClick={() => {
            verifyFields();
            setOpen(true);
          }}
        >
          Enviar
        </Button>
        <DialogMod
          open={open}
          setOpen={setOpen}
          title={"Enviar"}
          content={"¿Estás seguro de realizar esta acción?"}
          onAccept={handleAccept}
        />
        <DialogMod
          open={openConfirmModal}
          setOpen={setOpenConfirmModal}
          title={"Confirmación"}
          content={"Evaluación enviada correctamente."}
          onAccept={handleConfirmAccept}
          onCancel={handleConfirmAccept}
          showButtonCancel={false}
        />
        <DialogMod
          open={openAlreadyEvaluated}
          setOpen={setAlreadyEvaluated}
          title={"Error"}
          content={error?.data?.message}
          onAccept={() => navigate("/")}
          onCancel={() => navigate("/")}
          showButtonCancel={false}
        />
        <Snackbar
          open={openSnack}
          autoHideDuration={10000}
          onClose={() => setOpenSnack(false)}
          message={snackbarMessage}
        />
      </Box>
    </Container>
  );
};

export default EvaluationGE;
