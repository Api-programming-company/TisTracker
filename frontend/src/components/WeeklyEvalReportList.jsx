import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCompaniesByAcademicPeriodQuery } from "../api/academicPeriodApi";
import AppContext from "../context/AppContext";
import {
  Box,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import BackBtn from "./navigation/BackBtn";

const WeeklyEvalReportList = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, checkUser } = useContext(AppContext);
  const { data, error, isLoading, isError, isSuccess } =
    useGetCompaniesByAcademicPeriodQuery(id, {
      refetchOnMountOrArgChange: true,
    });
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
      if (error.status === 400 || error.status === 403) {
        checkUser();
        navigate("/");
      }
    }
  }, [isSuccess, isError, data, error]);
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
  return (
    <Box>
      <BackBtn url={`/academic-periods/docente-home/${id}`}/>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: 2,
          flexDirection: "column",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Lista de Grupo Empresas
        </Typography>
        <Typography>
          Selecciona una grupo empresa para ver su reporte de evaluaciones
          semanales.
        </Typography>
      </Box>
      <List sx={{ width: "100%", maxWidth: 600, margin: "0 auto", mt: 12 }}>
        {data.companies.length > 0 ? (
          data.companies.map((company) => (
            <ListItem
              key={company.id}
              sx={{
                mb: 2,
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                cursor: "pointer",
                "&:hover": {
                  backgroundColor: "info.gray",
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography variant="h6" component="div">
                    {company.long_name.length > 50
                      ? `${company.long_name.substring(0, 50)}...`
                      : company.long_name}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="textSecondary">
                    {company.short_name}
                  </Typography>
                }
                onClick={() =>
                  navigate(`/academic-period/${id}/company-report/${company?.planning?.id}`)
                }
              />
            </ListItem>
          ))
        ) : (
          <ListItemText
            primary={
              <Typography variant="h6" component="div">
                No hay grupo empresas registradas.
              </Typography>
            }
          />
        )}
      </List>
    </Box>
  );
};

export default WeeklyEvalReportList;
