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
import BackBtn from "../navigation/BackBtn";

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
  const [newInvitation, setNewInvitation] = useState(null)
  const [shouldRefetch, setShouldRefetch] = useState(false);


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
    refetch: refetchCompany,
  } = useGetCompanyByIdQuery(id);

  const getInvitations = useCallback(() => {
    return companyData?.company?.members?.filter(
      (member) => member.status === "P"
    );
  }, [companyData?.company?.members]);

  useEffect(() => {
    if (isCompanySuccess) {
      console.log("company data: (Fetching)" , companyData?.company?.members);
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
      setNewInvitation({

      })
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
    searchStudent(email.trim());
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddStudent = () => {
    const invitation = {
      company_id: id,
      user_id: data.student.id,
      status: "P",
      permission: "R",
    };
    createInvitation(invitation);
    setNewInvitation(invitation);
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
      setSnackbarMessage("Invitación creada exitosamente");
      setSnackbarOpen(true);
  
      // Cambia el estado para forzar el refetch
      setShouldRefetch(true);
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
  }, [isCreateInvitationSuccess, isCreateInvitationError, createInvitationData, createInvitationError]);
  
  useEffect(() => {
    if (shouldRefetch) {
      console.log("Ejecutando refetch...");
      refetchCompany();
      setShouldRefetch(false); // Resetea el estado para evitar múltiples llamados
    }
  }, [shouldRefetch, refetchCompany]);
  useEffect(() => {
    console.log(invitations,"invitations");
  },[invitations])

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
    <Box className="section-container">
      <BackBtn/>
      <Container maxWidth="md">
        <Box sx={{  padding: 2 }}>
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
            <Typography variant="h6">Invitaciones Aceptadas</Typography>
            {members
              .filter((member) => member.permission === "R")
              .map((member) => (
                <StudentCard key={member.id} student={member.user} />
              ))}
          </Box>
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="h6">Invitaciones Pendientes</Typography>
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
                ¿Estás seguro de que deseas invitar a <b>{data?.student?.first_name + " " + data?.student?.last_name}</b> a la
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
      </Container>
    </Box>
    
  );
};

export default StudentSearch;
