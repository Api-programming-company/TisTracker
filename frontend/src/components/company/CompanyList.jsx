import {
  Container,
  Box,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import React, { useContext, useEffect } from "react";
import { useGetCompaniesByAcademicPeriodQuery } from "../../api/academicPeriodApi";
import AppContext from "../../context/AppContext";
import { CompanyCard } from "../";

const CompanyList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, removeUserFromLocalStorage } = useContext(AppContext);
  const { data, error, isLoading, isError, isSuccess } =
    useGetCompaniesByAcademicPeriodQuery(id);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      if (error.status === 400) {
        console.log(error.message);
        removeUserFromLocalStorage();
        navigate("/enroll-to-ap");
      }
    }
  }, [isSuccess, isError, data, error]);

  const handleAddCompany = () => {
    navigate("/registroge");
  };

  if (isLoading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          mt: 5,
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

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Typography variant="h6" color="error">
          {error?.message}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          Lista de Empresas
        </Typography>
        <IconButton
          color="primary"
          aria-label="Agregar empresa"
          onClick={handleAddCompany}
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          <AddIcon fontSize="large" />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{ mt: 2 }}
      >
        {data.companies.map((company) => (
          <Box
            key={company.id}
            flexBasis={{
              xs: "100%", // 100% width for extra small screens
              sm: "48%", // Two items per row for small screens
              md: "30%", // Three items per row for medium screens
            }}
            mb={2}
          >
            <CompanyCard company={company} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default CompanyList;
