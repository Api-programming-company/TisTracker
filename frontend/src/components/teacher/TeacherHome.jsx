import React from "react";
import { Container, Typography, Paper, Box } from "@mui/material";

const TeacherHome = () => {
  return (
    <Container>
      <Box
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        gap={3}
      >
        <Box flexBasis={{ xs: "100%", md: "30%" }}>
          <Paper elevation={3} style={{ padding: "16px" }}>
            <Typography variant="h5">Mis periodos academicos</Typography>
            <Typography variant="body1">Content for periodos academicos</Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default TeacherHome;
