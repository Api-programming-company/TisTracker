import React, { useContext, useEffect, useState } from "react";
import { evaluate } from "../utils/evaluaLikert";
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
import Question from "../components/evaluation/Question";
import RadioOption from "../components/evaluation/RadioOption";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import { useNavigate } from "react-router-dom";
import DialogMod from "../components/DialogMod";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useCreateCompanyEvaluationMutation } from "../api/evaluationApi";
import { useParams } from "react-router-dom";

const Autoevaluation = () => {
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
      setOpen(false)
      setSnackbarMessage("Evaluación enviada correctamente.");
      setOpenSnack(true);
      setOpenConfirmModal(true);
    }
    if (isError) {
      console.log(error);
      setOpen(false)
      setSnackbarMessage("Error al enviar la evaluación " || error?.data?.message);
      setOpenSnack(true);
      setAlreadyEvaluated(true)
    }
  }, [data, isSuccess, isError, error, isLoading]);

  const ejemploEvaluacion = {
    evaluation: {
      id: 1,
      title: "Autoevaluación de Grupo Empresa",
      description: " ",
      questions: [
        {
          id: 1,
          text: "Me siento seguro utilizando las tecnologías y herramientas requeridas para mi trabajo.",
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
          text: "Tengo la capacidad de resolver problemas técnicos de manera eficiente.",
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
          text: "Estoy al tanto de las mejores prácticas y patrones de diseño en desarrollo de software.",
          answer_options: [
            {
              id: 11,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 13,
              text: "Neutral",
              score: "2",
            },
            {
              id: 15,
              text: "Totalmente de acuerdo",
              score: "3",
            },
          ],
        },
        {
          id: 4,
          text: "Me comunico de manera clara y efectiva con los miembros de mi equipo.",
          answer_options: [
            {
              id: 21,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 22,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 24,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 25,
              text: "Totalmente de acuerdo",
              score: "4",
            },
          ],
        },
        {
          id: 5,
          text: "Siento que puedo colaborar fácilmente con otros en tareas y proyectos.",
          answer_options: [
            {
              id: 31,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 32,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 33,
              text: "Neutral",
              score: "3",
            },
            {
              id: 34,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 35,
              text: "Totalmente de acuerdo",
              score: "5",
            },
          ],
        },
        {
          id: 6,
          text: "Recibo retroalimentación útil de mis compañeros y la utilizo para mejorar mi trabajo.",
          answer_options: [
            {
              id: 41,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 42,
              text: "En desacuerdo",
              score: "2",
            },
            {
              id: 43,
              text: "Neutral",
              score: "3",
            },
            {
              id: 44,
              text: "De acuerdo",
              score: "4",
            },
            {
              id: 45,
              text: "Totalmente de acuerdo",
              score: "5",
            },
          ],
        },
        {
          id: 7,
          text: "Soy capaz de gestionar mi tiempo de manera efectiva para cumplir con los plazos.",
          answer_options: [
            {
              id: 51,
              text: "Totalmente en desacuerdo",
              score: "1",
            },
            {
              id: 53,
              text: "Neutral",
              score: "2",
            },
            {
              id: 55,
              text: "Totalmente de acuerdo",
              score: "3",
            },
          ],
        },
        {
          id: 8,
          text: "Mi código cumple con los estándares de calidad establecidos por el equipo.",
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
          id: 9,
          text: "Tomo en cuenta las recomendaciones de otros desarrolladores durante las revisiones de código.",
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
          id: 10,
          text: "Estoy satisfecho con las herramientas de desarrollo y colaboración que utilizamos.",
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
              id: 4,
              text: "De acuerdo",
              score: "3",
            },
            {
              id: 5,
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
  const [openSnack, setOpenSnack] = useState(false);
  const [openAlreadyEvaluated, setAlreadyEvaluated] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
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
      type: "autoevaluation",
    });
    createCompanyEvaluation({
      company_id: company_id,
      score: parseInt(finalGrade, 10),
      type: "autoevaluation",
    });
    //navigate("/");
  };

  const handleConfirmAccept = () => {
    setOpenConfirmModal(false);
    navigate("/");
  };

  if (companyFetching || loading || isLoading ) {
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
          sx={{ color: "black", fontSize: "40px", lineHeight: "1", marginY: 3 }}
        >
          {state.title}
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
        </Box>
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
          showButtonCancel={false}
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
          onClose={() => setOpenSnack(!openSnack)}
          message={snackbarMessage}
        />
      </Container>
    )
  );
};

export default Autoevaluation;
