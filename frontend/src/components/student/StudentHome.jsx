import React, { useContext } from "react";
import { Container, Typography, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const StudentHome = () => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const menuItems = [
        { label: user.company ? "Mi empresa" : "Crear empresa", path: user.company ? `/vergrupoe/${user.company.company_id}` : "/registroge" },
        { label: "Empresas", path: `/academic-period/${user.academic_period_id}/companies/` },
        { label: "Invitaciones", path: "/company-requests" }
    ];

    return (
        <Container>
            <Box
                display="flex"
                justifyContent="space-between"
                flexWrap="wrap"
                gap={3}
            >
                {user.academic_period_id ? (
                    menuItems.map((item, index) => (
                        <Box key={index} flexBasis={{ xs: "100%", md: "30%" }}>
                            <Paper
                                elevation={3}
                                style={{ padding: "16px", cursor: "pointer" }}
                                onClick={() => handleNavigate(item.path)}
                            >
                                <Typography variant="h5">{item.label}</Typography>
                            </Paper>
                        </Box>
                    ))
                ) : (
                    <Box flexBasis={{ xs: "100%", md: "30%" }}>
                        <Paper
                            elevation={3}
                            style={{ padding: "16px", cursor: "pointer" }}
                            onClick={() => handleNavigate("/enroll-to-ap")}
                        >
                            <Typography variant="h5">Enroll to Academic Period</Typography>
                        </Paper>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default StudentHome;
