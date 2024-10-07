import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useNavigate } from "react-router-dom";

const CompanyDetails = ({ company }) => {
  const [openMembers, setOpenMembers] = useState(false);

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
              <ListItemText primary="Dirección" secondary={company.address} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Teléfono" secondary={company.phone} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Fecha de Creación"
                secondary={new Date(company.created_at).toLocaleDateString()}
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
              {openMembers ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </ListItem>
          <Collapse in={openMembers} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {company.members.length > 0 ? (
                company.members.map((member) => (
                  <ListItem
                    key={member.id}
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <ListItemText
                      primary={`${member.first_name} ${member.last_name}`}
                      secondary={
                        member.pivot.permission === "W"
                          ? `${member.email} (Encargado)`
                          : member.email
                      }
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        navigate(`/user-evaluation/${member?.pivot?.id}`);
                      }}
                    >
                      Evaluar
                    </Button>
                  </ListItem>
                ))
              ) : (
                <Typography>No hay miembros asignados.</Typography>
              )}
            </List>
          </Collapse>
        </List>
      </Box>
    </Box>
  );
};

export default CompanyDetails;
