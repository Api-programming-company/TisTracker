import {
  Container,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useGetCompaniesByAcademicPeriodQuery} from "../api/academicPeriodApi";
import AppContext from "../context/AppContext";
import { CompanyCard } from "../components";

const SeeWeeklyGE = () => {
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
  }, [isSuccess, isError, data, error, checkUser, navigate]);

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

  const groupedCompanies = data?.companies?.reduce((acc, company) => {
    if (!company.planning || !company.planning.milestones) {
      acc.undefined.push(company);
    } else {
      company.planning.milestones.forEach((milestone) => {
        const endDate = new Date(milestone.end_date);
        const weekDay = endDate.toLocaleString('default', { weekday: 'long' });
        if (!acc[weekDay]) {
          acc[weekDay] = [];
        }
        acc[weekDay].push(company);
      });
    }
    return acc;
  }, { undefined: [] });

  const daysOrder = ['domingo', 'lunes', 'martes', 'miércoles','jueves', 'viernes', 'sábado'];
  const sortedGroupedCompanies = Object.keys(groupedCompanies)
    .sort((a, b) => {
      if (a === 'undefined') {
        return 1;
      } else if (b === 'undefined') {
        return -1;
      } else {
        return daysOrder.indexOf(a) - daysOrder.indexOf(b);
      }
    })

    
    .reduce((acc, day) => {

      acc[day] = groupedCompanies[day];
      return acc;
    }, {});

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" gutterBottom>
          Lista de Grupo Empresas
        </Typography>
      </Box>
      {Object.entries(sortedGroupedCompanies).map(([day, companies]) => (
        <Box key={day} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {day === 'undefined' ? 'Sin actividades' : `Día: ${day}`}
          </Typography>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="flex-start"
            sx={{ gap: 2, mb: 2 }}
          >
            {companies.length === 0 ? (
              <Typography variant="h6" color="textSecondary">
                No hay empresas para este grupo.
              </Typography>
            ) : (
              companies.map((company) => (
                <Box
                  key={company.id}
                  flexBasis={{
                    xs: "100%",
                    sm: "48%",
                    md: "30%",
                  }}
                  sx={{ minWidth: 0 }}
                >
                  <CompanyCard company={company} />
                </Box>
              ))
            )}
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default SeeWeeklyGE;