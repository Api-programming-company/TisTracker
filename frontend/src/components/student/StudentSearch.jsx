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

const StudentSearch = ({ selectedItems, setSelectedItems }) => {
  const [email, setEmail] = useState("");
  const [searchStudent, { data, isFetching, isLoading, error, isError, isSuccess }] =
    useLazySearchStudentQuery();
  const [encargado, setEncargado] = useState(null);
  const MAX_STUDENTS = 7;

  const handleSearch = () => {
    searchStudent(email);
  };

  const handleAddStudent = () => {
    if (data && data.student) {
      if (selectedItems.length < MAX_STUDENTS && !selectedItems.some(s => s.id === data.student.id)) {
        setSelectedItems(prev => {
          const newSelectedItems = [...prev, data.student];
          // Asignar el primer integrante como encargado
          if (newSelectedItems.length === 1) {
            setEncargado(data.student.id);
          }
          return newSelectedItems;
        });
      }
    }
  };

  const handleRemoveStudent = (id) => {
    setSelectedItems(prev => {
      const newSelectedItems = prev.filter(student => student.id !== id);
      // Resetear el encargado si se elimina
      if (id === encargado) {
        setEncargado(newSelectedItems[0]?.id || null); // Asignar el nuevo primer integrante como encargado
      }
      return newSelectedItems;
    });
  };

  const handleSelectEncargado = (id) => {
    setEncargado(id);
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
          {isLoading || isFetching ? <CircularProgress size={24} /> : <SearchIcon />}
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
                disabled={selectedItems.length >= MAX_STUDENTS || selectedItems.some(s => s.id === data.student.id)}
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

      {selectedItems.length >= MAX_STUDENTS && (
        <Typography variant="body1" color="warning" sx={{ marginTop: 2 }}>
          Has alcanzado el límite de {MAX_STUDENTS} integrantes.
        </Typography>
      )}

      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Integrantes Agregados</Typography>
        {selectedItems.map(student => (
          <StudentCard
            key={student.id}
            student={student}
            onRemove={handleRemoveStudent}
            isEncargado={encargado === student.id}
            onSelectEncargado={() => handleSelectEncargado(student.id)}
          />
        ))}
      </Box>
    </Box>
  );
};

export default StudentSearch;
