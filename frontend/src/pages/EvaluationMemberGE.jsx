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
} from "@mui/material";
import Question from "../components/evaluation/Question";
import RadioOption from "../components/evaluation/RadioOption";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import { useNavigate } from "react-router-dom";
import DialogMod from "../components/DialogMod";

const EvaluationGE = () => {
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
              text: "Totalmente de acuerdo",
              score: "5",
            },
            {
              id: 2,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 3,
              text: "Neutral",
              score: "3",
            },
            {
              id: 4,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 5,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 2,
          text: "Mi compañero(a) colaboró bien con otros miembros del equipo para alcanzar los objetivos del proyecto.",
          answer_options: [
            {
              id: 6,
              text: "Totalmente de acuerdo",
              score: "5",
            },
            {
              id: 7,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 8,
              text: "Neutral",
              score: "3",
            },
            {
              id: 9,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 10,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 3,
          text: "Mi compañero(a) asumió la responsabilidad de sus tareas y cumplió con sus compromisos.",
          answer_options: [
            {
              id: 11,
              text: "Totalmente de acuerdo",
              score: "4",
            },
            {
              id: 12,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 13,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 14,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 4,
          text: "Mi compañero(a) fue proactivo al abordar y resolver problemas que surgieron durante el proyecto.",
          answer_options: [
            {
              id: 15,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 16,
              text: "Neutral",
              score: "2",
            },
            {
              id: 17,
              text: "En desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 5,
          text: "La contribución de mi compañero(a) fue valiosa para el éxito del proyecto.",
          answer_options: [
            {
              id: 18,
              text: "Totalmente de acuerdo",
              score: "5",
            },
            {
              id: 19,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 20,
              text: "Neutral",
              score: "3",
            },
            {
              id: 21,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 22,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 6,
          text: "Mi compañero(a) cumplió con los plazos establecidos para sus entregas.",
          answer_options: [
            {
              id: 23,
              text: "Totalmente de acuerdo",
              score: "5",
            },
            {
              id: 24,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 25,
              text: "Neutral",
              score: "3",
            },
            {
              id: 26,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 27,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 7,
          text: "Mi compañero(a) estuvo dispuesto a ayudar a otros miembros del equipo cuando fue necesario.",
          answer_options: [
            {
              id: 28,
              text: "Totalmente de acuerdo",
              score: "5",
            },
            {
              id: 29,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 30,
              text: "En desacuerdo",
              score: "3",
            },
            {
              id: 31,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 8,
          text: "Mi compañero(a) fue receptivo a la retroalimentación y mostró disposición para mejorar.",
          answer_options: [
            {
              id: 32,
              text: "Totalmente de acuerdo",
              score: "4",
            },
            {
              id: 33,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 34,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 35,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
        {
          id: 9,
          text: "La calidad del trabajo realizado por mi compañero(a) cumplió con los estándares que hemos establecido.",
          answer_options: [
            {
              id: 36,
              text: "Totalmente de acuerdo",
              score: "4",
            },
            {
              id: 37,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 38,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 39,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
          ],
        },
      ],
    },
  };

  const datagrupo = {
    grupoEmpresa: "API",
    integrantes: [
      "Carlos Martinez Avocado",
      "Juan Felipe Montecinos Ruma",
      "Ana Garnica Peredo",
      "Maria Gonzalez Macias",
      "Luciana Paredes Torrico",
    ],
  };

  const { state, setInitialState, verifyFields, clearState } =
    useContext(EvaluateContext);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // para simular el isloading borrar luego

  useEffect(() => {
    clearState();
    setInitialState(ejemploEvaluacion.evaluation);
    setLoading(!loading);
  }, []);

  const handleAccept = () => {
    if (!state.isValid) {
      setOpenSnack(!openSnack);
      setOpen(!setOpen);
      return;
    }

    const finalGrade = evaluate(state.questions);
    // enviar finalGrade al back
    console.log(finalGrade);
    navigate("/");
  };

  return (
    !loading && (
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
          <strong>Integrante a evaluar:</strong> {datagrupo.integrantes[0]}
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
          <Snackbar
            open={openSnack}
            autoHideDuration={10000}
            onClose={() => setOpenSnack(!openSnack)}
            message="Debe responder a todas las preguntas"
          />
        </Box>
      </Container>
    )
  );
};

export default EvaluationGE;
