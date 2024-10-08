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
import { useInvitationDetailsByIdQuery } from "../api/invitationApi";
import { useParams } from "react-router-dom";

const EvaluationGE = () => {
  const { id } = useParams();
  const [createUserEvaluation, { data, error, isError, isLoading, isSuccess }] =
    useCreateUserEvaluationMutation();
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnack, setOpenSnack] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openAlreadyEvaluated, setAlreadyEvaluated] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setSnackbarMessage("Evaluación enviada correctamente.");
      setOpenSnack(true);
      setOpenConfirmModal(true);
    }
    if (isError) {
      console.log(error);
      setSnackbarMessage("Error al enviar la evaluación " || error?.data?.message);
      setAlreadyEvaluated(true)
      setOpenSnack(true);
    }
  }, [data, error, isError, isLoading, isSuccess]);

  const {
    data: invitation,
    error: invitationError,
    isSuccess: isInvitationSucess,
    isError: isInvError,
    isFetching: isInvitationFetching,
  } = useInvitationDetailsByIdQuery(id);

  useEffect(() => {
    if (isInvitationSucess) {
      console.log("data", invitation);
    }
    if (isInvError) {
      console.log("error", invitationError);
    }
  }, [invitation, invitationError, isInvError, isInvitationSucess]);

  const ejemploEvaluacion = {
    evaluation: {
      id: 1,
      title: "Evaluación a Integrantes de Grupo Empresa",
      description: " ",
      questions: [
        {
          id: 1,
          text: "Mi compañero(a) se comunicó de manera efectiva con el equipo a lo largo del proyecto.",
          answer_options: [
            {
              id: 1,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 2,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 3,
              text: "Neutral",
              score: "3",
            },
            {
              id: 4,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 5,
              text: "Totalmente de acuerdo",
              score: "5",
            },
          ],
        },
        {
          id: 2,
          text: "Mi compañero(a) colaboró bien con otros miembros del equipo para alcanzar los objetivos del proyecto.",
          answer_options: [
            {
              id: 6,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 7,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 8,
              text: "Neutral",
              score: "3",
            },
            {
              id: 9,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 10,
              text: "Totalmente de acuerdo",
              score: "5",
            },
          ],
        },
        {
          id: 3,
          text: "Mi compañero(a) asumió la responsabilidad de sus tareas y cumplió con sus compromisos.",
          answer_options: [
            {
              id: 11,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 12,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 13,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 14,
              text: "Totalmente de acuerdo",
              score: "4",
            },
          ],
        },
        {
          id: 4,
          text: "Mi compañero(a) fue proactivo al abordar y resolver problemas que surgieron durante el proyecto.",
          answer_options: [
            {
              id: 15,
              text: "En desacuerdo",
              score: "1",
            },
            {
              id: 16,
              text: "Neutral",
              score: "2",
            },
            {
              id: 17,
              text: "De acuerdo",
              score: "3",
            },
          ],
        },
        {
          id: 5,
          text: "La contribución de mi compañero(a) fue valiosa para el éxito del proyecto.",
          answer_options: [
            {
              id: 18,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 19,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 20,
              text: "Neutral",
              score: "3",
            },
            {
              id: 21,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 22,
              text: "Totalmente de acuerdo",
              score: "5",
            },
          ],
        },
        {
          id: 6,
          text: "Mi compañero(a) cumplió con los plazos establecidos para sus entregas.",
          answer_options: [
            {
              id: 23,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 24,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 25,
              text: "Neutral",
              score: "3",
            },
            {
              id: 26,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 27,
              text: "Totalmente de acuerdo",
              score: "5",
            },
          ],
        },
        {
          id: 7,
          text: "Mi compañero(a) estuvo dispuesto a ayudar a otros miembros del equipo cuando fue necesario.",
          answer_options: [
            {
              id: 28,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 29,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 30,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 31,
              text: "Totalmente de acuerdo",
              score: "4",
            },
          ],
        },
        {
          id: 8,
          text: "Mi compañero(a) fue receptivo a la retroalimentación y mostró disposición para mejorar.",
          answer_options: [
            {
              id: 32,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 33,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 34,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 35,
              text: "Totalmente de acuerdo",
              score: "4",
            },
          ],
        },
        {
          id: 9,
          text: "La calidad del trabajo realizado por mi compañero(a) cumplió con los estándares que hemos establecido.",
          answer_options: [
            {
              id: 36,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 37,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 38,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 39,
              text: "Totalmente de acuerdo",
              score: "4",
            },
          ],
        },
      ],
    },
  };

  const { state, setInitialState, verifyFields, clearState } =
    useContext(EvaluateContext);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearState();
    setInitialState(ejemploEvaluacion.evaluation);
    setLoading(false);
  }, []);

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
    //navigate("/");
  };

  const handleConfirmAccept = () => {
    setOpenConfirmModal(false);
    navigate("/");
  };

  if (isLoading || isInvitationFetching || loading) {
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
        {invitation?.user?.first_name + " " + invitation?.user?.last_name}
      </Typography>

      <Typography
        component="h2"
        sx={{ fontSize: "30px", lineHeight: "1", marginY: 3 }}
      >
        Criterios de Evaluación
      </Typography>

      <Grid2 container spacing={2}>
        {state.questions.map((e, index = 0) => {
          return (
            <>
              <Grid2 size={{ sm: 12, md: 6 }}>
                <Question key={e.id} question={`${index + 1}. ${e.text}`} />
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
          content={"Evaluación enviada correctamente. ¿Desea continuar?"}
          onAccept={handleConfirmAccept}
        />
        <DialogMod 
          open={openAlreadyEvaluated}
          setOpen={setAlreadyEvaluated}
          title={"Error"}
          content={error?.data?.message}
          onAccept={()=>navigate('/')}
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
