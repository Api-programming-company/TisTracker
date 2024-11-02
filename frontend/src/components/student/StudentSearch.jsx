import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../../api/companyApi";
import { useLazySearchStudentQuery } from "../../api/studentApi";
import AppContext from "../../context/AppContext";
import StudentCard from "./StudentCard";
import { useCreateInvitationMutation } from "../../api/invitationApi";
import { useDispatch } from "react-redux";
import studentApi from "../../api/studentApi";

const StudentSearch = () => {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const [members, setMembers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [email, setEmail] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [openNoStudentModal, setOpenNoStudentModal] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const dispatch = useDispatch();

  const [
    createInvitation,
    {
      data: createInvitationData,
      isSuccess: isCreateInvitationSuccess,
      isLoading: isCreateInvitationLoading,
      isError: isCreateInvitationError,
      error: createInvitationError,
    },
  ] = useCreateInvitationMutation();

  const {
    data: companyData,
    isSuccess: isCompanySuccess,
    isLoading: isCompanyLoading,
    isError: isCompanyError,
    error: companyError,
  } = useGetCompanyByIdQuery(id, { refetchOnMountOrArgChange: true });

  const getInvitations = useCallback(() => {
    return companyData?.company?.members?.filter(
      (member) => member.status === "P"
    );
  }, [companyData?.company?.members]);

  useEffect(() => {
    if (isCompanySuccess) {
      console.log("company data:", companyData?.company?.members);
      setInvitations(
        companyData?.company?.members?.filter((member) => member.status === "P")
      );
      setMembers(
        companyData?.company?.members.filter((member) => member.status === "A")
      );
      console.log("company obtenida:", companyData);
    }

    if (isCompanyError) {
      console.error("company error:", companyError);
      setSnackbarMessage("Error al obtener la compañía");
      setSnackbarOpen(true);
    }
  }, [
    isCompanySuccess,
    isCompanyError,
    companyData,
    companyError,
    getInvitations,
  ]);

  let [
    searchStudent,
    { data, isFetching, isLoading, isError, isSuccess, error, isRefetching },
  ] = useLazySearchStudentQuery();

  useEffect(() => {
    console.log(isFetching, "fetching");
    if (isSuccess && !isFetching) {
      setOpenModal(true);
      console.log("Estudiante encontrado:", data);
    }

    if (isError) {
      setOpenNoStudentModal(true);
      console.error("Error al buscar el estudiante:", error);
      setSnackbarMessage("Error al buscar el estudiante");
      setSnackbarOpen(true);
    }
  }, [isSuccess, isError, data, error, isRefetching, isFetching]);

  const MAX_STUDENTS = 6;

  const handleSearch = () => {
    searchStudent(email);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddStudent = () => {
    console.log("data", {
      company_id: id,
      user_id: data.student.id,
      status: "P",
      permission: "R",
    });
    createInvitation({
      company_id: id,
      user_id: data.student.id,
      status: "P",
      permission: "R",
    });

    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEmail("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (isCreateInvitationSuccess) {
      console.log("Invitación creada exitosamente:", createInvitationData);

      const tempInvitations = companyData?.company?.members?.filter(
        (member) => member.status === "P"
      );
      setInvitations(tempInvitations);
      setMembers(
        companyData?.company?.members.filter((member) => member.status === "A")
      );
      setSnackbarMessage("Invitación creada exitosamente");
      setSnackbarOpen(true);
    }

    if (isCreateInvitationError) {
      console.error(
        "Error al crear la invitación:",
        createInvitationError?.data?.message
      );
      setSnackbarMessage(
        createInvitationError?.data?.message || "Error al crear la invitación"
      );
      setSnackbarOpen(true);
    }
  }, [
    isCreateInvitationSuccess,
    isCreateInvitationError,
    createInvitationData,
    createInvitationError,
    companyData?.company?.members,
  ]);

  if (isCreateInvitationLoading || isCompanyLoading) {
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
    <Box sx={{ mt: 12, padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Invitar estudiantes a Grupo Empresa
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Buscar estudiante por correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          sx={{ flexGrow: 1 }}
          disabled={isFetching || isLoading}
        />
        <IconButton
          color="primary"
          aria-label="Buscar estudiante"
          onClick={handleSearch}
          sx={{ marginLeft: 2 }}
        >
          {isLoading || isFetching ? (
            <CircularProgress size={24} />
          ) : (
            <SearchIcon />
          )}
        </IconButton>
      </Box>

      {invitations.length + members.length >= MAX_STUDENTS && (
        <Typography variant="body1" color="red" sx={{ marginTop: 2 }}>
          Has alcanzado el límite de {MAX_STUDENTS + 1} integrantes.
        </Typography>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Encargado</Typography>
        <Typography variant="body1">
          <StudentCard
            key={user.id}
            student={
              companyData.company.members.find(
                (member) => member.permission === "W"
              ).user
            }
          />
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Integrantes</Typography>
        {members
          .filter((member) => member.permission === "R")
          .map((member) => (
            <StudentCard key={member.id} student={member.user} />
          ))}
      </Box>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Invitaciones</Typography>
        {invitations
          .filter((member) => member.permission === "R")
          .map((member) => (
            <StudentCard key={member.id} student={member.user} />
          ))}
      </Box>

      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Estudiante encontrado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas invitar a {data?.student?.email} a la
            empresa?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAddStudent} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openNoStudentModal}
        onClose={() => setOpenNoStudentModal(false)}
      >
        <DialogTitle>Estudiante no encontrado</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {error?.data?.message ||
              "Ocurrio un error al buscar el estudiante."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenNoStudentModal(false);
              setEmail("");
            }}
            color="primary"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default StudentSearch;
