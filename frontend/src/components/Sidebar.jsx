import React, { useContext } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Sidebar = ({ open, setOpen, hideSidebar, setHideSidebar }) => {
  const { user } = useContext(AppContext);
  const location = useLocation();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const hideSidebarRoutes = ["/registro"];
  setHideSidebar((user === null) || (user?.user_type === null) || hideSidebarRoutes.includes(location.pathname));

  if (hideSidebar) {
    return null
  }

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const renderUserOptions = () => {
    if (user?.user_type === "estudiante") {
      return (
        <>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/ruta-estudiante">
            <ListItemText primary="Opciones Estudiante" />
          </ListItem>
        </>
      );
    } else if (user?.user_type === "docente") {
      return (
        <>
          <ListItem button component={Link} to="/">
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/ruta-docente">
            <ListItemText primary="Opciones Docente" />
          </ListItem>
        </>
      );
    } else {
      // Opciones para guest (user.user_type === null)
      return (
        <ListItem button component={Link} to="/login">
          <ListItemText primary="Iniciar Sesión" />
        </ListItem>
      );
    }
  };

  return (
    <>
      {isSmallScreen && !hideSidebar && (
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer}
          sx={{ position: "fixed", top: 16, left: 16, zIndex: 1201 }} // Fijo y encima del contenido
        >
          <MenuIcon />
        </IconButton>
      )}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={isSmallScreen ? open : !hideSidebar}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            width: 240,
            flexShrink: 0,
            boxSizing: "border-box",
            position: "fixed", // Fijo para superponerse sobre el contenido
            top: 0,
            left: 0,
            height: "100%",
            overflow: "auto",
            zIndex: 1200, // Asegúrate de que el Sidebar esté encima del contenido
            transition: "transform 0.3s ease", // Transición suave para el movimiento
            transform:
              isSmallScreen && !open ? "translateX(-100%)" : "translateX(0)", // Desplazar fuera de la vista en modo temporal
          },
        }}
      >
        <List>{!hideSidebar && renderUserOptions()}</List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
