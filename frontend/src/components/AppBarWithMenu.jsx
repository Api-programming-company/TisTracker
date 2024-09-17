import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

function AppBarWithMenu({ isDarkMode, toggleDarkMode, userType }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const menuOptions = {
    guest: [
      { label: "Iniciar sesión", path: "/login" },
      { label: "Registrarse", path: "/register" },
    ],
    estudiante: [
      { label: "Perfil", path: "/profile" },
      { label: "Mis cursos", path: "/courses" },
      { label: "Cerrar sesión", path: "/logout" },
    ],
    docente: [
      { label: "Perfil", path: "/profile" },
      { label: "Mis clases", path: "/classes" },
      { label: "Cerrar sesión", path: "/logout" },
    ],
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          TisTracker
        </Typography>
        <IconButton color="inherit" onClick={toggleDarkMode}>
          {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {menuOptions[userType]?.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleNavigation(option.path)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default AppBarWithMenu;
