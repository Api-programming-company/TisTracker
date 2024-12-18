import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetAllEvaluationTemplatesQuery } from "../../api/evaluationApi";

import {
    List,
    ListItem,
    ListItemText,
    CircularProgress,
    Typography,
    Container,
    IconButton,
    Tooltip,
    Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import BackBtn from "../navigation/BackBtn";

const EvaluationTemplateList = () => {
    const location = useLocation()
    const period = location.state?.period;
    const navigate = useNavigate();
    const { data, error, isFetching, isError, isSuccess } =
        useGetAllEvaluationTemplatesQuery();
    useEffect(() => {
        if (isSuccess) {
            console.log(data);
        }
        if (isError) {
            console.log(error);
        }
    }, [isSuccess, isError, data, error]);

    if (isFetching) {
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

    if (isError) {
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
                <Typography variant="h6" color="error">
                    Ocurrio un error al cargar las plantillas de evaluación.
                </Typography>
            </Container>
        );
    }

    const handleItemClick = (id) => {
        navigate(`/evaluation-templates/${id}`);
    };

    const handleEditClick = (id) => {
        navigate(`/evaluation-templates/${id}/update`);
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                alignItems: "center",
                padding: "16px",
                position: "relative"
            }}
        >
            <Box sx={{display:"flex", width:"100%", paddingX: 0, position: "absolute"}}>
                <BackBtn url={`/academic-periods/docente-home/${period.id}`} period={period}/>
            </Box>
            <Typography variant="h4" mt={3} gutterBottom>
                Plantillas de evaluación
            </Typography>
            <List sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
                {data.map((template) => (
                    <ListItem
                        key={template.id}
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
                                <Typography
                                    variant="h6"
                                    component="div"
                                    title={template.title}
                                >
                                    {template.title.length > 50
                                        ? `${template.title.substring(
                                              0,
                                              50
                                          )}...`
                                        : template.title}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    {template.description}
                                </Typography>
                            }
                            onClick={() => handleItemClick(template.id)}
                        />
                        <Tooltip title="Edit Template">
                            <IconButton
                                edge="end"
                                aria-label="editar"
                                onClick={() => handleEditClick(template.id)}
                            >
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                    </ListItem>
                ))}
                {data.length === 0 && (
                    <Container
                        maxWidth="sm"
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Typography variant="h6" color="error">
                            No tiene plantillas de evaluación registradas.
                        </Typography>
                    </Container>
                )}
            </List>
        </Box>
    );
};

export default EvaluationTemplateList;
