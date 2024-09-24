import React, { useState } from "react";
import { useLazySearchStudentQuery } from "../../api/studentApi";
import {
  TextField,
  IconButton,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import StudentCard from "./StudentCard";

const StudentSearch = ({ formData, setFormData, errors, setErrors }) => {
  const [email, setEmail] = useState("");
  const [searchStudent, { data, isFetching, isLoading, isError, isSuccess }] =
    useLazySearchStudentQuery();
  const [selectedId, setSelectedId] = useState(null); // Estado para el estudiante encargado
  const MAX_STUDENTS = 7;

  const handleSearch = () => {
    searchStudent(email);
  };

  const handleAddStudent = () => {
    if (data && data.student) {
      const members = formData.members || [];
      if (
        members.length < MAX_STUDENTS &&
        !members.some((m) => m.id === data.student.id)
      ) {
        const newMember = {
          ...data.student,
          permission: members.length === 0 ? "W" : undefined, // Asigna "W" si es el primer miembro
        };

        setFormData((prev) => ({
          ...prev,
          members: [...members, newMember],
        }));
        // Resetea el id seleccionado
        setSelectedId(null);
      }
    }
  };

  const handleRemoveStudent = (id) => {
    setFormData((prev) => ({
      ...prev,
      members: (prev.members || []).filter((member) => member.id !== id),
    }));

    // Si se elimina el encargado, resetea el id seleccionado
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const handleSelectEncargado = (id) => {
    setSelectedId(id);
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member) => ({
        ...member,
        permission: member.id === id ? "W" : "R", // Asigna "W" al encargado, "R" a los demás
      })),
    }));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          label="Buscar estudiante por correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Estudiante no encontrado en grupo TIS.
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
                  (formData.members || []).length >= MAX_STUDENTS ||
                  (formData.members || []).some((m) => m.id === data.student.id)
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

      {(formData.members || []).length >= MAX_STUDENTS && (
        <Typography variant="body1" color="warning" sx={{ marginTop: 2 }}>
          Has alcanzado el límite de {MAX_STUDENTS} integrantes.
        </Typography>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Integrantes Agregados</Typography>
        {(formData.members || []).map((member) => (
          <StudentCard
            key={member.id}
            student={member}
            onRemove={handleRemoveStudent}
            isEncargado={selectedId === member.id}
            onSelectEncargado={() => handleSelectEncargado(member.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StudentSearch;
