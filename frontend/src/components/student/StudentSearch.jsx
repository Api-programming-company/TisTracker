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
  const [searchStudent, { data, isFetching, isLoading }] =
    useLazySearchStudentQuery();
  const [addedStudents, setAddedStudents] = useState([]);

  const handleSearch = () => {
    searchStudent(email);
  };

  const handleAddStudent = () => {
    if (data && data.student) {
      setAddedStudents((prev) => [...prev, data.student]);
    }
  };

  const handleRemoveStudent = (id) => {
    setAddedStudents((prev) => prev.filter((student) => student.id !== id));
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
          {isLoading ? (
            <CircularProgress size={24} sx={{ position: "absolute" }} />
          ) : (
            "Buscar"
          )}
        </Button>
      </Box>

      {data && data.message && !isLoading && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">{data.message}</Typography>
          <Typography variant="body1">Correo: {data.student.email}</Typography>
          <Button
            variant="outlined"
            onClick={handleAddStudent}
            disabled={isFetching || isLoading} // Deshabilitar el botón mientras se carga
            sx={{ marginTop: 1 }}
          >
            Agregar
          </Button>
        </Box>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Integrantes Agregados</Typography>
        {addedStudents.map((student) => (
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
