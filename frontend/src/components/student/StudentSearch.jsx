import React, { useState, useContext } from "react";
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
import { useParams } from "react-router-dom";
import AppContext from "../../context/AppContext";

const StudentSearch = () => {
  const { id } = useParams();
  const { user } = useContext(AppContext);
  const [members, setMembers] = useState([]);
  const [email, setEmail] = useState("");
  const [searchStudent, { data, isFetching, isLoading, isError, isSuccess , error}] =
    useLazySearchStudentQuery();
  const MAX_STUDENTS = 7;

  const handleSearch = () => {
    searchStudent(email);
  };

  const handleAddStudent = () => {
    if (data && data.student) {
      if (
        members.length < MAX_STUDENTS &&
        !members.some((m) => m.id === data.student.id)
      ) {
        const newMember = {
          ...data.student,
          permission: members.length === 0 ? "W" : "R", // Asigna "W" si es el primer miembro, "R" en otros casos
        };

        setMembers((prev) => [...prev, newMember]);
      }
    }
  };

  const handleRemoveStudent = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id));
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
          <StudentCard
            key={user.id}
            student={user}
          />
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
    </Box>
  );
};

export default StudentSearch;
