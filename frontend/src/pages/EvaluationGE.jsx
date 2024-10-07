import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid2,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useCreateCompanyEvaluationMutation } from "../api/evaluationApi";
import DialogMod from "../components/DialogMod";
import Question from "../components/evaluation/Question";
import RadioOption from "../components/evaluation/RadioOption";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import { evaluate } from "../utils/evaluaLikert";

const EvaluationGE = () => {
  const { company_id } = useParams();
  const {
    data: company,
    isSuccess: companySuccess,
    isFetching: companyFetching,
    isError: isCompanyError,
    error: companyError,
  } = useGetCompanyByIdQuery(company_id);

  useEffect(() => {
    if (companySuccess) {
      console.log(company);
    }
    if (isCompanyError) {
      console.log(companyError);
    }
  }, [company, companyFetching, isCompanyError, companyError, companySuccess]);

  const [
    createCompanyEvaluation,
    { data, isSuccess, isError, error, isLoading },
  ] = useCreateCompanyEvaluationMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isSuccess, isError, error, isLoading]);

  const ejemploEvaluacion = {
    evaluation: {
      id: 1,
      title: "Evaluación a una Grupo Empresa",
      description: " ",
      questions: [
        {
          id: 1,
          text: "El código está bien estructurado y es fácil de entender.",
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
          text: "El producto final cumple con todos los requisitos especificados en la documentación del proyecto.",
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
          text: "La documentación técnica es clara y completa, facilitando la comprensión del sistema.",
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
          text: "El código es fácil de mantener y actualizar en el futuro.",
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
          text: "La interfaz de usuario es intuitiva y fácil de navegar.",
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
          text: "El estilo de codificación es consistente a lo largo de todo el proyecto.",
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
          text: "El producto final tiene un número mínimo de errores y bugs.",
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
          text: "El software es compatible con las plataformas y sistemas operativos especificados.",
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
          text: "El código cuenta con comentarios que facilitan su comprensión.",
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
        {
          id: 10,
          text: "El tiempo de carga del producto es aceptable y eficiente.",
          answer_options: [
            {
              id: 40,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 41,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 42,
              text: "Neutral",
              score: "3",
            },
            {
              id: 43,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 44,
              text: "Totalmente de acuerdo",
              score: "5",
            },
          ],
        },
      ],
    },
  };

  const { state, setInitialState, verifyFields, clearState } =
    useContext(EvaluateContext);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearState();
    setInitialState(ejemploEvaluacion.evaluation);
    setLoading(false);
  }, []);

  const handleAccept = () => {
    if (!state.isValid) {
      setOpenSnack(!openSnack);
      setOpen(!setOpen);
      return;
    }

    const finalGrade = evaluate(state.questions);
    console.log({
      company_id: company_id,
      score: parseInt(finalGrade, 10),
    });
    createCompanyEvaluation({
      company_id: company_id,
      score: parseInt(finalGrade, 10),
    });
    //navigate("/");
  };

  if (companyFetching || loading) {
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
          <strong>Grupo Empresa a evaluar: </strong>{" "}
          {company?.company?.short_name}
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
