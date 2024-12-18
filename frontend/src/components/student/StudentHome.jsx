import React, { useContext, useEffect } from "react";
import {
    Container,
    Typography,
    Paper,
    Box,
    Divider,
    CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { InvitationsHome } from "../../pages";
import AcademicPeriodAbout from "../academicPeriod/AcademicPeriodAbout";
import { useGetAcademicPeriodByIdQuery } from "../../api/academicPeriodApi";

const StudentHome = () => {
    const { user } = useContext(AppContext);
    const {
        data: academicPeriod,
        isSuccess: isAcademicPeriodSuccess,
        isError: isAcademicPeriodError,
        error: academicPeriodError,
        isLoading: isAcademicPeriodLoading,
    } = useGetAcademicPeriodByIdQuery(user.academic_period_id);

    useEffect(() => {
        if (isAcademicPeriodSuccess) {
            console.log(academicPeriod);
        }
        if (isAcademicPeriodError) {
            console.log(academicPeriodError);
        }
    }, [
        isAcademicPeriodError,
        academicPeriodError,
        isAcademicPeriodSuccess,
        academicPeriod,
    ]);

    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const currentDate = new Date();
    const companyCreationStartDate = new Date(
        academicPeriod?.academic_period.company_creation_start_date
    );
    const companyCreationEndDate = new Date(
        academicPeriod?.academic_period.company_creation_end_date
    );

    // Remove hours, minutes, seconds, and milliseconds for comparison
    currentDate.setHours(0, 0, 0, 0);
    companyCreationStartDate.setHours(0, 0, 0, 0);
    companyCreationEndDate.setHours(0, 0, 0, 0);

    // Add 1 day to each date
    companyCreationStartDate.setDate(companyCreationStartDate.getDate() + 1);
    companyCreationEndDate.setDate(companyCreationEndDate.getDate() + 1);

    const isWithinCreationPeriod =
        currentDate >= companyCreationStartDate &&
        currentDate <= companyCreationEndDate;

    console.log("endDate", companyCreationEndDate);
    console.log("startDate", companyCreationStartDate);
    
    console.log(isWithinCreationPeriod);

    const menuItems = [
        {
            label: user.company
                ? "Mi Grupo Empresa"
                : !isWithinCreationPeriod
                ? "El periodo academico esta fuera del rango de creación de empresas"
                : "Crear Grupo Empresa",
            isButton: user.company || isWithinCreationPeriod,
            path: user.company
                ? `/company/${user.company.company_id}`
                : "/registroge",
        },
    ];

    if (isAcademicPeriodLoading) {
        return (
            <Container
                sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ mt: 12 }}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Taller de Ingeniería de Software
                </Typography>
            </Box>
            <Divider sx={{ width: "100%", mb: 4 }} />{" "}
            <Box display="flex" justifyContent="start" flexWrap="wrap" gap={3}>
                {user.academic_period_id ? (
                    <Box sx={{display:"flex", flexDirection:"column"}}>
                        {menuItems.map((item, index) => (
                            <Box
                                key={index}
                                flexBasis={{ xs: "100%", md: "30%" }}
                            >
                                {item.isButton ? (
                                    <Paper
                                        elevation={3}
                                        style={{
                                            padding: "16px",
                                            cursor: "pointer",
                                            paddingTop: "32px",
                                            paddingBottom: "32px",
                                            paddingLeft: "16px",
                                            paddingRight: "16px",
                                            textAlign: "center",
                                        }}
                                        onClick={() =>
                                            handleNavigate(item.path)
                                        }
                                    >
                                        <Typography variant="h5">
                                            {item.label}
                                        </Typography>
                                    </Paper>
                                ) : (
                                    <Typography variant="h5" color="error">
                                        {item.label}
                                    </Typography>
                                )}
                            </Box>
                        ))}

                        {isWithinCreationPeriod ? (
                            <>
                                <InvitationsHome />
                            </>
                        ) : null}
                        <AcademicPeriodAbout />
                    </Box>
                ) : (
                    <Box flexBasis={{ xs: "100%", md: "30%" }}>
                        <Paper
                            elevation={3}
                            style={{ padding: "16px", cursor: "pointer" }}
                            onClick={() => handleNavigate("/enroll-to-ap")}
                        >
                            <Typography variant="h5">
                                Registrarse a un grupo
                            </Typography>
                        </Paper>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default StudentHome;
