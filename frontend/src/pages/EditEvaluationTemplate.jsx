import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompanyQuestionsByIdQuery } from "../api/evaluationApi";
import { useUpdateEvaluationTemplateMutation } from "../api/evaluationApi";
import EvaluateContext from "../context/evaluateContext/EvaluateContext";
import {
  Button,
  CircularProgress,
  Container,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import DialogMod from "../components/DialogMod";
import Criteria from "../components/evaluationTemplate/Criteria";

const EditEvaluationTemplate = () => {
  const { evaluation_id } = useParams();
  const [initialStateCopy, setInitialStateCopy] = useState();
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
      setInitialStateCopy(companyQuestions);
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

  const [
    updateEvaluationTemplate,
    { isLoading, data, error, isError, isSuccess },
  ] = useUpdateEvaluationTemplateMutation();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isLoading, isError, isSuccess]);

  const {
    state,
    clearState,
    setInitialState,
    handleTitleChange,
    handleDescriptionChange,
    addCriteria,
    validateErrors,
    handleScore,
    handleGetDifference,
  } = useContext(EvaluateContext);
  useEffect(() => {
    clearState();
  }, []);

  const [showError, setShowError] = useState(false);
  const [openCreateTemplate, setOpenCreateTemplate] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openConfirm, setOpenConfirm] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShowError(false);
    const { name, value } = e.target;
    switch (name) {
      case "title":
        handleTitleChange(value);
        break;
      case "description":
        handleDescriptionChange(value);
        break;
      default:
        break;
    }
  };

  const handleAddCriteria = () => {
    setShowError(false);
    addCriteria();
  };

  const findError = (field) => {
    const x = state?.errors?.filter((e) => e.from === field);
    if (x?.length >= 1 && showError) {
      return x[0].message;
    }
    return "";
  };

  const handleCreateTemplate = () => {
    setOpenCreateTemplate(false);
    if (state?.errors?.length >= 1) {
      setSnackbarMessage("Error, llena el formulario adecuadamente");
      setOpenSnackBar(true);
      setShowError(true);
    } else {
      setShowError(false);
      // quitar el id del state y enviarlo
      const { id, ...templateData } = state;
      const questionsWithoutId = templateData.questions.map(
        ({ id, ...rest }) => ({
          ...rest,
          answer_options: rest.answer_options.map(
            ({ id, ...optionRest }) => optionRest
          ),
        })
      );
      const dataToSend = { ...templateData, questions: questionsWithoutId };
      // createEvaluationTemplate(state);
      console.log(state);
      // console.log(initialStateCopy);
    }
  };

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
    <Container>
      <Typography
        component={"h1"}
        sx={{ fontSize: "40px", lineHeight: "1", mt: 12 }}
      >
        Crear Plantilla de Evaluación
      </Typography>
      <Divider sx={{ width: "100%", marginY: 3 }} />{" "}
      <TextField
        sx={{ marginY: 1 }}
        variant="outlined"
        value={state.title}
        label="Nombre de plantilla*"
        name="title"
        onChange={handleInputChange}
        error={Boolean(error?.data?.errors?.title)}
        helperText={findError("title") || error?.data?.errors?.title}
        fullWidth
        multiline
      />
      <TextField
        sx={{ marginY: 1 }}
        variant="outlined"
        value={state.description}
        label="Descripción*"
        name="description"
        onChange={handleInputChange}
        error={Boolean(findError("description"))}
        helperText={findError("description")}
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
          return (
            <Criteria
              key={e.id}
              criteria={e}
              findError={findError}
              setShowError={setShowError}
              showError={showError}
            />
          );
        })
      ) : (
        <p>Ningún criterio ha sido agregado todavía.</p>
      )}
      {findError("questions") && (
        <p className="text-red-300 text-sm ml-1">{findError("questions")}</p>
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ marginX: 3, marginY: 3 }}
          onClick={handleAddCriteria}
        >
          Agregar Criterio
        </Button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ marginX: 3, marginY: 3, display: "block" }}
          onClick={() => {
            validateErrors();
            handleScore();
            handleGetDifference(initialStateCopy)
            setOpenCreateTemplate(true);
          }}
        >
          Guardar
        </Button>
        <DialogMod
          open={openCreateTemplate}
          setOpen={setOpenCreateTemplate}
          title={"Crear plantilla"}
          content={"¿Estás seguro de realizar esta acción?"}
          onAccept={handleCreateTemplate}
        />

        <DialogMod
          open={openConfirm}
          setOpen={setOpenConfirm}
          title={"Confirmar"}
          content={"Se registró su plantilla con exito"}
          onAccept={() => navigate("/")}
          onCancel={() => navigate("/")}
          showButtonCancel={false}
        />
      </div>
      <Snackbar
        open={openSnackBar}
        autoHideDuration={8000}
        onClose={() => setOpenSnackBar(false)}
        message={snackbarMessage}
        // action={action}
      />
    </Container>
  );
};

export default EditEvaluationTemplate;
