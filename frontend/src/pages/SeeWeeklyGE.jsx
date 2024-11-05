import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Divider
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useGetCompaniesByAcademicPeriodQuery} from "../api/academicPeriodApi";
import AppContext from "../context/AppContext";
import CompanyCard2 from "../components/company/CompanyCard2";

const SeeWeeklyGE = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {  checkUser } = useContext(AppContext);
  const { data, error, isLoading, isError, isSuccess } =
    useGetCompaniesByAcademicPeriodQuery(id);

  useEffect(() => {
    if (isSuccess) {
      console.log(data,"");
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
      const upcomingMilestone = company.planning.milestones.find((milestone) => {
        return new Date(milestone.end_date) >= new Date();
      });

      if (upcomingMilestone) {
        const endDate = new Date(upcomingMilestone.end_date);
        const weekDay = endDate.toLocaleString('default', { weekday: 'long' });
        if (!acc[weekDay]) {
          acc[weekDay] = [];
        }
        acc[weekDay].push(company);
      }
    }
    return acc;
  }, { undefined: [] });


  const today = new Date().toLocaleString('default', { weekday: 'long' });
  const daysOrder = [];
  let day = today;
  for (let i = 0; i < 7; i++) {
    daysOrder.push(day);
    day = new Intl.DateTimeFormat('es-ES', { weekday: 'long' }).format(new Date(Date.now() + i * 24 * 60 * 60 * 1000));
  }
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
    <Container maxWidth="lg" sx={{ mt: 12}} >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="h3" gutterBottom>
          Lista de Grupo Empresas
        </Typography>
      </Box>
      {Object.entries(sortedGroupedCompanies).map(([day, companies]) => (
        <Box key={day} sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            {day === 'undefined' ? 'Sin planificación' : `Día: ${day}`}
          </Typography>
          <Divider sx={{ borderColor:"gray", borderWidth:"1", marginBottom:"1rem" }} />
          <Box
            
          >
            {companies.length === 0 ? (
              <Typography variant="h6" color="textSecondary">
                No hay empresas para este grupo.
              </Typography>
            ) : (
                <Box
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)"
                  }}
                  justifyContent="space-between"
                  gap="1rem"
                >
                  {companies.map((company) => (
                    <Box
                      key={company.id}
                      marginBottom="1rem"
                      sx={{
                        backgroundColor: "info.gray"
                      }}
                    >
                      <CompanyCard2 company={company} />
                    </Box>
                  ))}
                </Box>
            )}
          </Box>
        </Box>
      ))}
    </Container>
  );
};

export default SeeWeeklyGE;