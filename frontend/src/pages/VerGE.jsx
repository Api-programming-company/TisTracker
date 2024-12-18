

import React, { useEffect, useContext, useState } from "react";
import {
    Box,
    CircularProgress,
    Container,
    Divider,
    Button,
    Stack,
    Snackbar,
    Typography,
} from "@mui/material";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useParams } from "react-router-dom";
import CompanyDetails from "../components/company/CompanyDetails";
import { useUpdateCompanyPlanningByIdMutation } from "../api/companyApi";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import { useLeaveCompanyMutation } from "../api/companyApi";
import DialogMod from "../components/DialogMod";
import { getAcademicPeriodStatus } from "../utils/dateFormat";
import BackBtn from "../components/navigation/BackBtn";

const VerGE = () => {
    const { id } = useParams();
    const { user, setUser } = useContext(AppContext);
    const [openModal, setOpenModal] = useState(false);
    const [openLeaveModal, setOpenLeaveModal] = useState(false);
    const [formData, setFormData] = useState({});
    const [sendData, setSendData] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const period_id = JSON.parse(localStorage.getItem("periodId"));
    console.log(period_id);
    const navigate = useNavigate();
    const acad_period_status = user.user_type === "E" && getAcademicPeriodStatus(user?.academic_period)

    const [
        leaveCompany,
        {
            data: leaveData,
            isSuccess: isLeaveSuccess,
            isError: isLeaveError,
            error: leaveError,
            isLoading: isLeaveLoading,
        },
    ] = useLeaveCompanyMutation();

    useEffect(() => {
        if (isLeaveSuccess) {
            console.log(leaveData);
            navigate("/");
            setUser(leaveData.user);
        }
        if (isLeaveError) {
            console.log(leaveError);
            setSnackbar({
                open: true,
                message: leaveError.data.error,
                severity: "error",
            });
        }
    }, [leaveData, isLeaveSuccess, isLeaveError, leaveError]);

    const { data, error, isSuccess, isLoading, isError, isFetching } =
        useGetCompanyByIdQuery(id);
    const [
        updateCompanyPlanning,
        {
            data: updateData,
            isSuccess: isUpdateSuccess,
            isError: isUpdateError,
            error: updateError,
        },
    ] = useUpdateCompanyPlanningByIdMutation();

    const verGEd = [
        {
            text: "Ver Planificación",
            color: "info",
            onClick: () =>
                data?.company?.planning
                    ? navigate(`/planning/${data.company.planning.id}`)
                    : setOpenModal(true),
        },
        {
            text: "Seguimiento semanal",
            color: "info",
            onClick: () =>
                data?.company?.planning
                    ? navigate(
                          `/weekly_tracking/${data.company.planning.id}`
                      )
                    : setOpenModal(true),
        },
        {
            text: "Validacion de Hito",
            color: "info",
            onClick: () => data?.company?.planning
            ? navigate(
                  `/planning_spreadsheet/${data?.company?.planning.id}`
              )
            : setOpenModal(true), 
        }
    ];

    const verGEe = [
        {
            text: acad_period_status === "project" ? "Ver Seguimiento Semanal" : data?.company?.planning ? "Editar Planificación" : "Crear Planificación",
            color: "info",
            onClick: () =>  {
                if(acad_period_status === "project" || acad_period_status === "evaluation") {
                    if(data?.company?.planning) {
                        navigate(`/planning_spreadsheet/${data.company.planning.id}`)
                    }
                }else{
                    navigate(`/company/${id}/planification`)
                }
            }
        },
        {
            text: "Ver Planificación",
            color: "info",
            onClick: () =>
                data?.company?.planning
                    ? navigate(`/planning/${data.company.planning.id}`)
                    : setOpenModal(true),
        },
        
        {
            text: "Evaluar Empresa",
            color: "info",
            path: `/company-evaluation/${id}`,
        },
        {
            text: "Autoevaluar empresa",
            color: "info",
            path: `/autoevaluation/${id}`,
        },
        {
            text: "Abandonar empresa",
            color: "error",
            onClick: () => {
                setOpenLeaveModal(true);
            },
        },
    ];

    useEffect(() => {
        if (isUpdateSuccess) {
            console.log(updateData);
        }
        if (isUpdateError) {
            console.log(updateError);
        }
    }, [updateData, isUpdateSuccess, isUpdateError, updateError]);

    useEffect(() => {
        if (sendData) {
            setFormData(data);
            updateCompanyPlanning({
                id: formData.planning_id,
                data: { milestones: formData.milestones },
            });
            console.log({
                id: formData.planning_id,
                data: { milestones: formData.milestones },
            });
            setSendData(false);
        }
    }, [sendData]);

    useEffect(() => {
        if (isSuccess) {
            setFormData(data);
        }
        if (isError) {
            console.error("Error fetching company data:", error);
        }
    }, [data, isSuccess, isError, error]);

    if (isLoading || isFetching || isLeaveLoading) {
        return (
            <Container
                maxWidth="sm"
                sx={{
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

    if (isError)
        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <Typography>La empresa que busca no existe.</Typography>
            </Container>
        );

    if (!formData.company) {
        return <div>No hay datos disponibles.</div>;
    }

    return (
        <Box sx={{ maxWidth: 900, margin: "auto", padding: 2, mb: 15 }}>
            <BackBtn url={`/academic-periods/docente-home/${period_id}`}	/>
            <CompanyDetails
                company={formData.company}
                setFormData={setFormData}
            />
            <Divider sx={{ my: 4 }} />

            {/* Modal para mostrar si no hay planificación */}
            <DialogMod
                open={openModal}
                setOpen={setOpenModal}
                title={"Planificación no encontrada"}
                content={"La empresa no tiene una planificación asignada."}
                onAccept={() => setOpenModal(false)}
                showButtonCancel={false}
            />

            {/* Modal para salir de la empresa */}
            <DialogMod
                open={openLeaveModal}
                setOpen={setOpenLeaveModal}
                title={"Confirmación"}
                content={
                    "¿Estás seguro de que deseas abandonar la empresa? Esta acción no se puede deshacer."
                }
                onAccept={() => {
                    console.log("Abandonar empresa", id);
                    leaveCompany({ companyId: id });
                    setOpenLeaveModal(false);
                }}
                showButtonCancel={true}
            />

            {/* Botones de navegación */}
            <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                mt={4}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
            >
                {user?.user_type === "D" && (
                    <Box>
                        {verGEd.map((button, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                color={button.color}
                                sx={{ mb: "12px" }}
                                fullWidth={true} // Asegura que ocupe todo el ancho disponible en pantallas pequeñas
                                onClick={
                                    button.onClick ||
                                    (() => navigate(button.path))
                                }
                            >
                                {button.text}
                            </Button>
                        ))}
                    </Box>
                )}
                {user?.user_type === "E" && (
                    <Box>
                        {verGEe.map((button, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                color={button.color}
                                sx={{ mb: "12px" }}
                                fullWidth={true} // Asegura que ocupe todo el ancho disponible en pantallas pequeñas
                                onClick={
                                    button.onClick ||
                                    (() => navigate(button.path))
                                }
                            >
                                {button.text}
                            </Button>
                        ))}
                    </Box>
                )}
            </Stack>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={10000}
                onClose={() =>
                    setSnackbar({
                        ...snackbar,
                        open: false,
                    })
                }
                message={snackbar.message}
                severity={snackbar.severity}
            />
        </Box>
    );
};

export default VerGE;