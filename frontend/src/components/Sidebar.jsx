import React from "react";
import { Drawer, List, ListItem, ListItemText, Divider, IconButton, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

const Sidebar = ({ open, setOpen }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md")); // Ajusta según el breakpoint deseado

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Botón para abrir/cerrar el sidebar en pantallas pequeñas */}
      {isSmallScreen && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ position: 'fixed', top: 16, left: 16, zIndex: 1201 }} // Fijo y encima del contenido
        >
          <MenuIcon />
        </IconButton>
      )}

      {/* Sidebar */}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={isSmallScreen ? open : true}
        onClose={toggleDrawer}
        sx={{
         "& .MuiDrawer-paper": {
            width: 240,
           width: 240,
          flexShrink: 0,
            boxSizing: "border-box",
            position: 'fixed', // Fijo para superponerse sobre el contenido
            top: 0,
            left: 0,
            height: '100%',
            overflow: 'auto',
            zIndex: 1200, // Asegúrate de que el Sidebar esté encima del contenido
            transition: 'transform 0.3s ease', // Transición suave para el movimiento
            transform: isSmallScreen && !open ? 'translateX(-100%)' : 'translateX(0)', // Desplazar fuera de la vista en modo temporal
          },
        }}
      >
        <List>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/registro">
            <ListItemText primary="Registro" />
          </ListItem>
          <ListItem button component={Link} to="/registroperiodoacademico">
            <ListItemText primary="Registro Periodo Académico" />
          </ListItem>
          <ListItem button component={Link} to="/upload">
            <ListItemText primary="Upload" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
