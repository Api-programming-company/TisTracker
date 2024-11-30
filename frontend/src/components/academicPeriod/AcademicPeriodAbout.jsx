import React, { useContext, useEffect, useState } from "react";
import {
    Typography,
    Box,
    Divider,
    Container,
    Button,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import AppContext from "../../context/AppContext";
import { formatDate2 } from "../../utils/validaciones";
import DialogMod from "../DialogMod";
import { useNavigate } from "react-router-dom";
import { useGetAcademicPeriodByIdQuery } from "../../api/academicPeriodApi";
import { useLeaveAcademicPeriodMutation } from "../../api/userApi";

const AcademicPeriodAbout = () => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AppContext);
    console.log(user)
    const [openDialog, setOpenDialog] = useState(false);
    const [openConfirm, setOpenCofirm] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState("");
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });

    const [
        leaveAcademicPeriod,
        {
            data: leaveData,
            error: leaveError,
            isLoading: leaveIsLoading,
            isSuccess: leaveIsSuccess,
            isError: leaveIsError,
        },
    ] = useLeaveAcademicPeriodMutation();

    useEffect(() => {
        if (leaveIsSuccess) {
            console.log(leaveData);
            setUser(leaveData.user);
            navigate("/");
        }
        if (leaveIsError) {
			setSnackbar({
				open: true,
				message: leaveError.data.message,
				severity: "error",
			});
            console.log(leaveError);
        }
    }, [leaveData, leaveError, leaveIsSuccess, leaveIsError]);

    const { data, error, isFetching, isSuccess, isError } =
        useGetAcademicPeriodByIdQuery(user?.academic_period_id);
    useEffect(() => {
        if (isSuccess) {
            console.log(data);
        }
        if (isError) {
            console.log(error);
        }
    }, [data, error, isSuccess, isError]);

    const APInfo = [
        {
            key: "Descripcion",
            value: data?.academic_period?.description,
        },
        {
            key: "Docente",
            value: data?.academic_period?.creator?.full_name,
        },
        {
            key: "Fecha de inicio",
            value: formatDate2(data?.academic_period?.start_date),
        },
        {
            key: "Fecha de finalización",
            value: formatDate2(data?.academic_period?.end_date),
        },
    ];

    const handleAccept = () => {
        leaveAcademicPeriod();
        setOpenDialog(false);
    };

    if (isFetching || leaveIsLoading) {
        return (
            <Container
                sx={{
                    position: 'absolute',
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
        <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
                Sobre el periodo académico
            </Typography>
            <Divider sx={{ width: "100%", mt: 1, mb: 2 }} />

            <Typography>
                Estas en el periodo académico
                <strong> {user.academic_period?.name}</strong>, cuenta con la
                siguiente información:
            </Typography>
            <Container>
                {APInfo.map((item) => {
                    return (
                        <Typography>
                            <strong>{item.key}:</strong> {item.value}
                        </Typography>
                    );
                })}
            </Container>
            <Box sx={{ marginY: 2 }}>
                <Button onClick={() => setOpenDialog(true)}>
                    Darme de baja
                </Button>
            </Box>
            <DialogMod
                open={openDialog}
                setOpen={setOpenDialog}
                title={"Retirarse del periodo académico"}
                content={
                    "¿Estás seguro de que deseas darte de baja del periodo academico?"
                }
                onAccept={handleAccept}
            />
            <DialogMod
                open={openConfirm}
                setOpen={setOpenCofirm}
                title={"Confirmación"}
                content={confirmMessage}
                onAccept={() => navigate("/")}
                onCancel={() => navigate("/")}
                showButtonCancel={false}
            />
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

export default AcademicPeriodAbout;
