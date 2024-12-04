import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemText,
    Collapse,
    IconButton,
    Button,
    Avatar,
    Container,
    CircularProgress,
	Snackbar
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useRemoveMemberMutation } from "../../api/companyApi";
import { useContext } from "react";
import AppContext from "../../context/AppContext";
import DialogMod from "../DialogMod";

const CompanyDetails = ({ company, setFormData }) => {
    const { user } = useContext(AppContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [openMembers, setOpenMembers] = useState(false);
    const [memberToRemove, setMemberToRemove] = useState(null);
	const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "success",
    });
    const [
        removeMember,
        {
            isLoading: removeMemberIsLoading,
            isSuccess: removeMemberIsSuccess,
            isError: removeMemberIsError,
            error: removeMemberError,
            data: removeMemberData,
        },
    ] = useRemoveMemberMutation();

    const isLeader = company.members.some(
        (member) => member.user.id === user.id && member.permission === "W"
    );
    console.log("El usuario es el encargado?", isLeader);

    useEffect(() => {
        if (removeMemberIsSuccess) {
            console.log(removeMemberData);
            setFormData((prev) => ({
                ...prev,
                company: {
                    ...prev.company,
                    members: prev.company.members.filter(
                        (member) => member.id !== memberToRemove.id
                    ),
                },
            }));
            setMemberToRemove(null);
			setSnackbar({
				open: true,
				message: "Miembro expulsado correctamente",
				severity: "success",
			});
        }
        if (removeMemberIsError) {
            console.log(removeMemberError);
			setMemberToRemove(null);
			setSnackbar({
				open: true,
				message: removeMemberError.data.error,
				severity: "error",
			});
        }
    }, [
        removeMemberData,
        removeMemberError,
        removeMemberIsSuccess,
        removeMemberIsError,
    ]);

    const handleToggle = () => {
        setOpenMembers((prev) => !prev);
    };

    const navigate = useNavigate();
    const getStatusLabel = (status) => {
        switch (status) {
            case "R":
                return "Rechazado";
            case "P":
                return "Pendiente";
            case "A":
                return "Aceptado";
            case "C":
                return "Conformación";
            default:
                return "Desconocido";
        }
    };

    if (removeMemberIsLoading) {
        return (
            <Container
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }
    return (
        <Box sx={{ padding: 2, border: "1px solid #ccc", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                Detalles de la Grupo Empresa
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    mb: 2,
                }}
            >
                <Box sx={{ flex: 1, mr: { sm: 2 }, mb: { xs: 2, sm: 0 } }}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Nombre Completo"
                                secondary={company.long_name}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Nombre Corto"
                                secondary={company.short_name}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Correo Electrónico"
                                secondary={company.email}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Estado"
                                secondary={getStatusLabel(company.status)}
                            />
                        </ListItem>
                    </List>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <List>
                        <ListItem>
                            <ListItemText
                                primary="Dirección"
                                secondary={company.address}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Teléfono"
                                secondary={company.phone}
                            />
                        </ListItem>
                        <ListItem>
                            <ListItemText
                                primary="Fecha de Creación"
                                secondary={new Date(
                                    company.created_at
                                ).toLocaleDateString()}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Box>

            <Box>
                <List>
                    <ListItem button onClick={handleToggle}>
                        <ListItemText primary="Miembros" />
                        <IconButton>
                            {openMembers ? (
                                <ExpandLessIcon />
                            ) : (
                                <ExpandMoreIcon />
                            )}
                        </IconButton>
                    </ListItem>
                    <Collapse in={openMembers} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {company.members.filter(
                                (member) => member.status === "A"
                            ).length > 0 ? (
                                company.members
                                    .filter((member) => member.status === "A")
                                    .map((member) => (
                                        <ListItem
                                            key={member.id}
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: "primary.main",
                                                    color: "white",
                                                    width: 56,
                                                    height: 56,
                                                    mr: 2,
                                                }}
                                            >
                                                {member.user.first_name[0]}
                                                {member.user.last_name[0]}
                                            </Avatar>
                                            <ListItemText
                                                primary={`${member.user.full_name}`}
                                                secondary={
                                                    member.permission === "W"
                                                        ? `${member.user.email} (Encargado)`
                                                        : member.user.email
                                                }
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    navigate(
                                                        `/user-evaluation/${member.id}`
                                                    );
                                                }}
                                            >
                                                Evaluar
                                            </Button>
                                            {isLeader &&
                                                member.user.id !== user.id && (
                                                    <IconButton
                                                        edge="end"
                                                        aria-label="delete"
                                                        onClick={() => {
                                                            setMemberToRemove(
                                                                member
                                                            );
                                                            setOpenDialog(true);
                                                        }}
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                )}
                                        </ListItem>
                                    ))
                            ) : (
                                <Typography>
                                    No hay miembros asignados.
                                </Typography>
                            )}
                        </List>
                    </Collapse>
                </List>
            </Box>

            <DialogMod
                open={openDialog}
                setOpen={setOpenDialog}
                title={"Expulsar miembro de la empresa"}
                content={`¿Estás seguro de que deseas expulsar a ${memberToRemove?.user?.full_name} de la empresa?`}
                onAccept={() => {
                    setOpenDialog(false);
                    console.log(
                        "Expulsar a",
                        memberToRemove.user_id,
                        "de la empresa",
                        company.id
                    );
                    removeMember({
                        companyId: company.id,
                        userId: memberToRemove.user_id,
                    });
                }}
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

export default CompanyDetails;
