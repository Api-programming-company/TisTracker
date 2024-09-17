import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';

function TransparentAppBar() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: alpha('#000', 0.5),
        backdropFilter: 'blur(10px)',
      }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi Aplicación
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TransparentAppBar;
