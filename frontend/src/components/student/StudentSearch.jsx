import React, { useState, useContext, useEffect } from "react";
import { useLazySearchStudentQuery } from "../../api/studentApi";
import { useUpdateCompanyByIdMutation } from "../../api/companyApi";
import {
  TextField,
  IconButton,
  Box,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import StudentCard from "./StudentCard";
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const StudentSearch = () => {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");

  const [
    updateCompany,
    {
      data: updateCompanyData,
      isSuccess: isUpdateCompanySuccess,
      isLoading: isUpdateCompanyLoading,
      isError: isUpdateCompanyError,
      error: updateCompanyError,
    },
  ] = useUpdateCompanyByIdMutation();

  useEffect(() => {
    if (isUpdateCompanySuccess) {
      console.log("Actualización exitosa:", updateCompanyData);
    }

    if (isUpdateCompanyError) {
      console.error("Error al actualizar la compañía:", updateCompanyError);
    }
  }, [
    isUpdateCompanySuccess,
    isUpdateCompanyError,
    updateCompanyData,
    updateCompanyError,
  ]);

  const [
    searchStudent,
    { data, isFetching, isLoading, isError, isSuccess, error },
  ] = useLazySearchStudentQuery();
  const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal
  const MAX_STUDENTS = 7;

  const handleSearch = () => {
    searchStudent(email);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch(); // Llama a la búsqueda al presionar Enter
    }
  };

  const handleAddStudent = () => {
    if (isSuccess) {
      if (
        members.length < MAX_STUDENTS &&
        !members.some((m) => m.id === data.student.id)
      ) {
        const newMember = {
          ...data.student,
        };
        setMembers((prev) => [...prev, newMember]);
      }
    }
  };

  const handleRemoveStudent = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmSend = () => {
    // Filtrar solo los IDs de los miembros
    const memberIds = members.map((member) => member.id);
    console.log(members);

    // Imprimir la lista de IDs
    console.log("Lista de IDs de miembros:", memberIds);
    updateCompany({id:id, data:{members:memberIds}})
    setOpenModal(false);
  };

  if (isUpdateCompanyLoading) {
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
    <Box sx={{ padding: 2 }}>
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

      {isError && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          {error?.data?.message}
        </Typography>
      )}

      {isSuccess && !isFetching && (
        <Box sx={{ marginTop: 2, display: "flex", alignItems: "center" }}>
          {data.student ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Estudiante encontrado: {data.student.email}
              </Typography>
              <IconButton
                color="primary"
                aria-label="Agregar estudiante"
                onClick={handleAddStudent}
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                  marginLeft: 2,
                }}
                disabled={
                  members.length >= MAX_STUDENTS ||
                  members.some((m) => m.id === data.student.id)
                }
              >
                <AddIcon fontSize="large" />
              </IconButton>
            </>
          ) : (
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Sin resultados
            </Typography>
          )}
        </Box>
      )}

      {members.length >= MAX_STUDENTS && (
        <Typography variant="body1" color="warning" sx={{ marginTop: 2 }}>
          Has alcanzado el límite de {MAX_STUDENTS} integrantes.
        </Typography>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Encargado</Typography>
        <Typography variant="body1">
          <StudentCard key={user.id} student={user} />
        </Typography>
      </Box>

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Integrantes</Typography>
        {members.map((member) => (
          <StudentCard
            key={member.id}
            student={member}
            onRemove={handleRemoveStudent}
          />
        ))}
      </Box>

      {/* Botón para enviar invitaciones */}
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 4 }}
        onClick={handleOpenModal}
        disabled={members.length === 0}
      >
        Enviar Invitaciones
      </Button>

      {/* Modal de confirmación */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirmar Envío</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            ¿Estás seguro de que deseas enviar invitaciones a los siguientes
            miembros?
          </DialogContentText>
          {members.map((member) => (
            <Typography key={member.id}>{member.email}</Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmSend} color="primary">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentSearch;
