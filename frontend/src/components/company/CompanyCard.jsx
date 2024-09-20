import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";

const CompanyCard = ({ company }) => (
  <Card sx={{ mb: 2 }}>
    <CardHeader title={company.long_name} />
    <CardContent>
      <Typography variant="body2">
        Nombre corto: {company.short_name}
      </Typography>
      <Typography variant="body2">Email: {company.email}</Typography>
      <Typography variant="body2">Dirección: {company.address}</Typography>
      <Typography variant="body2">Teléfono: {company.phone}</Typography>
    </CardContent>
  </Card>
);

export default CompanyCard;
