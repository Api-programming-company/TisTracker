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

const AcademicPeriodAbout = () => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [openConfirm, setOpenCofirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const APInfo = [
    { key: "Descripcion", value: user.academic_period?.description },
    { key: "Docente", value: "Nombre del docente" },
    // { key: "Docente", value: user.academic_period?.proffesor },
    {
      key: "Fecha de inicio",
      value: formatDate2(user.academic_period?.start_date),
    },
    {
      key: "Fecha de finalización",
      value: formatDate2(user.academic_period?.end_date),
    },
  ];

  const handleAccept = () => {
    console.log("te has funado");
    setOpenDialog(false);
    // endpoint
  };

  //   useEffect(() => {
  //     if (isSuccess) {
  //       setConfirmMessage(data?.message)
  //       setOpenCofirm(true);
  //     }
  //     if (isError) {
  //       setSnackbar({
  //         open: true,
  //         message: error?.data?.message,
  //         severity: "error",
  //       });
  //     }
  //   }, [data, error, isSuccess, isError]);

  //   if (isFetching || isLoading) {
  //     return (
  //       <Container
  //         maxWidth="sm"
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "80vh",
  //         }}
  //       >
  //         <CircularProgress />
  //       </Container>
  //     );
  //   }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" gutterBottom>
        Sobre el periodo académico
      </Typography>
      <Divider sx={{ width: "100%", mt: 1, mb: 2 }} />

      <Typography>
        Estas en el periodo académico{" "}
        <strong> {user.academic_period?.name} </strong>, cuenta con la siguiente
        información:
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
        <Button onClick={() => setOpenDialog(true)}>Darme de baja</Button>
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
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </Box>
  );
};

export default AcademicPeriodAbout;
