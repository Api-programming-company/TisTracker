import { Person } from '@mui/icons-material'
import { Box, Grid, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'

const Socio = ({primary, secondary}) => { 
  return (
    <Box>
        <Grid item xs={12} md={6}>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={primary}
                    secondary={secondary}
                  />
                </ListItem>,
        </Grid>
    </Box>
  )
}

export default Socio