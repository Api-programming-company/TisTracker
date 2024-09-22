import React, { useState, useContext } from "react";
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
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AppContext from "../context/AppContext";
import logo from "../assets/logo.png";

function AppBarWithMenu({ isDarkMode, toggleDarkMode, userType }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [logoutConfirm, setLogoutConfirm] = useState(false);
  const navigate = useNavigate();
  const { handleLogout } = useContext(AppContext);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    if (path === "/logout") {
      setOpenDialog(true);
    } else {
      navigate(path);
      handleMenuClose();
    }
  };

  const handleConfirmLogout = async () => {
    setOpenDialog(false);
    setLogoutConfirm(true);
    await handleLogout();
    setLogoutConfirm(false);
  };

  const handleCancelLogout = () => {
    setOpenDialog(false);
  };

  const menuOptions = {
    guest: [
      { label: "Iniciar sesión", path: "/login" },
      { label: "Registrarse", path: "/register" },
    ],
    estudiante: [
      { label: "Invitaciones", path: "/company-requests"},
      { label: "Cerrar sesión", path: "/logout"},
    ],
    docente: [
      { label: "Periodos Académicos", path: "/academic-periods" },
      { label: "Cerrar sesión", path: "/logout" },
    ],
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", marginRight: "8px" }}
          />
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

      <Dialog open={openDialog} onClose={handleCancelLogout}>
        <DialogTitle>Confirmar Cierre de Sesión</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que quieres cerrar sesión?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelLogout} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmLogout}
            color="primary"
            autoFocus
            disabled={logoutConfirm}
          >
            {logoutConfirm ? "Cerrando sesión..." : "Cerrar sesión"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AppBarWithMenu;
