import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  CardActions,
  TextField,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  Slider,
  Switch,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  CircularProgress,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './css/Home.css';

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dropdownValue, setDropdownValue] = useState('');
  const [checked, setChecked] = useState(true);
  const [radioValue, setRadioValue] = useState('option1');

  const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  const handleDropdownChange = (event) => {
      setDropdownValue(event.target.value);
  };

  const handleCheckboxChange = (event) => {
      setChecked(event.target.checked);
  };

  const handleRadioChange = (event) => {
      setRadioValue(event.target.value);
  };

  return (
      <div>
          {/* AppBar Example */}
          <AppBar position="static">
              <Toolbar>
                  <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuOpen}>
                      <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" style={{ flexGrow: 1 }}>
                      Material UI Examples
                  </Typography>
                  <Button color="inherit">Login</Button>
              </Toolbar>
          </AppBar>

          {/* Dropdown Menu */}
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>My account</MenuItem>
              <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>

          {/* Main Container */}
          <Container style={{ marginTop: '20px' }}>
              <Typography variant="h4" gutterBottom>
                  Explore Material UI Components
              </Typography>

              {/* Card Example */}
              <Card style={{ marginBottom: '20px' }}>
                  <CardContent>
                      <Typography variant="h5" component="div">
                          Card Example
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                          This is an example of a card component using Material UI.
                      </Typography>
                  </CardContent>
                  <CardActions>
                      <Button size="small">Learn More</Button>
                      <IconButton color="secondary">
                          <FavoriteIcon />
                      </IconButton>
                  </CardActions>
              </Card>

              {/* Form Examples */}
              <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
                  <TextField fullWidth label="Outlined" variant="outlined" margin="normal" />
                  <TextField fullWidth label="Filled" variant="filled" margin="normal" />
                  <TextField fullWidth label="Standard" variant="standard" margin="normal" />
                  <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                      Submit
                  </Button>
              </Box>

              {/* Select / Dropdown Example */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                  <InputLabel>Select an Option</InputLabel>
                  <Select value={dropdownValue} label="Select an Option" onChange={handleDropdownChange}>
                      <MenuItem value="option1">Option 1</MenuItem>
                      <MenuItem value="option2">Option 2</MenuItem>
                      <MenuItem value="option3">Option 3</MenuItem>
                  </Select>
              </FormControl>

              {/* Checkbox and Radio Example */}
              <FormControlLabel
                  control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
                  label="Check me"
              />

              <FormControl component="fieldset" sx={{ mb: 4 }}>
                  <RadioGroup value={radioValue} onChange={handleRadioChange}>
                      <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
                      <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
                      <FormControlLabel value="option3" control={<Radio />} label="Option 3" />
                  </RadioGroup>
              </FormControl>

              {/* Slider Example */}
              <Typography gutterBottom>Slider Example</Typography>
              <Slider defaultValue={30} aria-label="Default" valueLabelDisplay="auto" sx={{ mb: 4 }} />

              {/* Switch Example */}
              <FormControlLabel control={<Switch checked={checked} onChange={handleCheckboxChange} />} label="Toggle me" />

              {/* Accordion Example */}
              <Accordion sx={{ mb: 4 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      <Typography>Accordion 1</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      <Typography>
                          This is an accordion detail section where you can place any content.
                      </Typography>
                  </AccordionDetails>
              </Accordion>

              {/* Tooltip Example */}
              <Tooltip title="Delete">
                  <IconButton>
                      <FavoriteIcon />
                  </IconButton>
              </Tooltip>

              {/* Circular Progress Example */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <CircularProgress />
              </Box>
          </Container>
      </div>
  );
};

export default Home;