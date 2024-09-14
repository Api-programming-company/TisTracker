import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
  Menu,
  MenuItem,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  MenuItem as SelectMenuItem,
  Slider,
  Divider,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { blue, red, green, teal } from '@mui/material/colors';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Example = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(30);
  const [selectValue, setSelectValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000); // Simulate loading
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSelectChange = (event) => {
    setSelectValue(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      {/* AppBar */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            MUI Example
          </Typography>
          <Button color="inherit" onClick={handleDialogOpen}>Open Dialog</Button>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button onClick={() => alert('Item 1 Clicked')}>
            <ListItemText primary="Item 1" />
          </ListItem>
          <ListItem button onClick={() => alert('Item 2 Clicked')}>
            <ListItemText primary="Item 2" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main Content */}
      <main style={{ padding: '16px' }}>
        <Typography variant="h4" gutterBottom>
          Welcome to MUI Example
        </Typography>
        <TextField 
          label="Name" 
          variant="outlined" 
          fullWidth 
          style={{ marginBottom: '16px' }}
          value={inputValue}
          onChange={handleInputChange}
        />
        <TextField 
          label="Email" 
          type="email" 
          variant="outlined" 
          fullWidth 
          style={{ marginBottom: '16px' }} 
        />

        {/* Input with Adornment */}
        <TextField
          label="Amount"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '16px' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        {/* Select Input */}
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectValue}
            onChange={handleSelectChange}
            label="Category"
          >
            <SelectMenuItem value="category1">Category 1</SelectMenuItem>
            <SelectMenuItem value="category2">Category 2</SelectMenuItem>
            <SelectMenuItem value="category3">Category 3</SelectMenuItem>
          </Select>
        </FormControl>

        {/* Slider */}
        <Typography gutterBottom>Slider</Typography>
        <Slider
          value={value}
          onChange={handleSliderChange}
          aria-labelledby="continuous-slider"
          valueLabelDisplay="auto"
          style={{ marginBottom: '16px' }}
        />

        {/* Buttons */}
        <div style={{ marginBottom: '16px' }}>
          <Button variant="contained" color="primary" style={{ marginRight: '8px' }}>Contained</Button>
          <Button variant="outlined" color="secondary" style={{ marginRight: '8px' }}>Outlined</Button>
          <Button variant="text" color="success">Text</Button>
          <Tooltip title="Icon Button" arrow>
            <IconButton color="info">I</IconButton>
          </Tooltip>
        </div>

        {/* Snackbar */}
        <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
            Form submitted successfully!
          </Alert>
        </Snackbar>

        {/* Card */}
        <Card style={{ marginBottom: '16px' }}>
          <CardMedia
            component="img"
            height="140"
            image="https://via.placeholder.com/150"
            alt="Placeholder"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Card Title
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a card with some example text. It contains an image and text content.
            </Typography>
          </CardContent>
        </Card>

        {/* Checkbox */}
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
          label="Check me"
        />
        
        {/* Switch */}
        <FormControlLabel
          control={<Switch checked={checked} onChange={handleCheckboxChange} />}
          label="Switch me"
        />

        {/* Circular Progress */}
        <div style={{ textAlign: 'center', margin: '16px' }}>
          <Button variant="contained" color="primary" onClick={handleLoading}>
            Start Loading
          </Button>
          {loading && <CircularProgress style={{ marginLeft: '16px' }} />}
        </div>

        {/* Grid */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6">Paper Component 1</Typography>
              <Button variant="contained" color="primary">Button 1</Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper style={{ padding: '16px', textAlign: 'center' }}>
              <Typography variant="h6">Paper Component 2</Typography>
              <Button variant="contained" color="secondary">Button 2</Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Chip */}
        <div style={{ marginTop: '16px' }}>
          <Chip label="Chip Example" color="primary" style={{ marginRight: '8px' }} />
          <Chip label="Clickable Chip" clickable onClick={() => alert('Chip clicked!')} color="secondary" />
        </div>

        {/* Carousel */}
        <Carousel>
          <div>
            <img src="https://via.placeholder.com/600x400" alt="Slide 1" />
            <p className="legend">Slide 1</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/600x400" alt="Slide 2" />
            <p className="legend">Slide 2</p>
          </div>
          <div>
            <img src="https://via.placeholder.com/600x400" alt="Slide 3" />
            <p className="legend">Slide 3</p>
          </div>
        </Carousel>

        {/* Divider */}
        <Divider style={{ margin: '16px 0' }} />

        {/* Switch for Time */}
        <FormControlLabel
          control={<Switch />}
          label="Enable feature"
        />
      </main>

      {/* Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Dialog Title</DialogTitle>
        <DialogContent>
          <Typography variant="body1">This is a dialog content example.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Example;
