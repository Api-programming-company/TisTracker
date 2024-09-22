import React, { useState } from "react";
import { useLazySearchStudentQuery } from "../../api/studentApi";
import {
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import StudentCard from "./StudentCard"; // Asegúrate de importar el componente

const StudentSearch = () => {
  const [email, setEmail] = useState("");
  const [searchStudent, { data, isFetching, isLoading, error, isError, isSuccess }] =
    useLazySearchStudentQuery();
  const [addedStudents, setAddedStudents] = useState([]); // Lista de estudiantes agregados
  const MAX_STUDENTS = 3; // Límite de estudiantes

  const handleSearch = () => {
    searchStudent(email);
  };

  const handleAddStudent = () => {
    if (data && data.student) {
      // Verificar si el estudiante ya está en la lista
      if (addedStudents.length < MAX_STUDENTS && !addedStudents.some(s => s.id === data.student.id)) {
        setAddedStudents(prev => [...prev, data.student]);
      }
    }
  };

  const handleRemoveStudent = (id) => {
    setAddedStudents(prev => prev.filter(student => student.id !== id));
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
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          disabled={isFetching || isLoading}
          sx={{ marginLeft: 2, position: "relative" }}
        >
          {isLoading || isFetching ? <CircularProgress size={24} /> : "Buscar"}
        </Button>
      </Box>

      {isError && (
        <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
          Estudiante no encontrado en grupo TIS.
        </Typography>
      )}

      {isSuccess && !isError && (
        <Box sx={{ marginTop: 2, display: "flex", alignItems: "center" }}>
          {data.student ? (
            <>
              <Typography variant="body1" sx={{ marginRight: 2 }}>
                Estudiante encontrado: {data.student.email}
              </Typography>
              <Button
                variant="outlined"
                onClick={handleAddStudent}
                disabled={addedStudents.length >= MAX_STUDENTS || addedStudents.some(s => s.id === data.student.id)} // Deshabilitar si se alcanza el límite o ya está agregado
              >
                Agregar
              </Button>
            </>
          ) : (
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Sin resultados
            </Typography>
          )}
        </Box>
      )}

      {addedStudents.length >= MAX_STUDENTS && (
        <Typography variant="body1" color="warning" sx={{ marginTop: 2 }}>
          Has alcanzado el límite de {MAX_STUDENTS} integrantes.
        </Typography>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Integrantes Agregados</Typography>
        {addedStudents.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onRemove={handleRemoveStudent}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StudentSearch;
