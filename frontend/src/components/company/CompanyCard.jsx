import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const CompanyCard = ({ company }) => (
  <Card
    sx={{
      mb: 2,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%", // Asegura que todas las tarjetas tengan la misma altura
    }}
  >
    <CardHeader
      title={company.long_name}
      sx={{ textAlign: "center" }} // Centrar el título
    />
    <CardContent>
      <Typography variant="body2" noWrap>
        Nombre corto: {company.short_name}
      </Typography>
      <Typography variant="body2" noWrap>
        Email: {company.email}
      </Typography>
      <Typography variant="body2" noWrap>
        Dirección: {company.address}
      </Typography>
      <Typography variant="body2" noWrap>
        Teléfono: {company.phone}
      </Typography>
    </CardContent>
  </Card>
);

export default CompanyCard;
