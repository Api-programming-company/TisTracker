import React, { useEffect, useState } from "react";
import { useGetCompaniesQuery } from "../api/companyApi";
import {
  Typography,
  IconButton,
  Collapse,
  List,
  ListItem,
  Grid2 as Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Container,
  Box,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Test = () => {
  const { data, error, isError, isFetching, isSuccess } =
    useGetCompaniesQuery();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, error, isError, isSuccess]);

  if (isFetching) return <p>Loading...</p>;
  if (isError) return <p>Error loading companies.</p>;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigate = (id) => {
    navigate(`/company/${id}`);
  };

  return (
    <Container>
      <Box item xs={12} display="flex" alignItems="center">
        <Typography variant="h6">Companies</Typography>
        <IconButton onClick={handleToggle}>
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
          {data &&
            data.companies?.map((company) => (
              <ListItem key={company.id}>
                <Card>
                  <CardContent>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12}>
                        <Typography variant="h5" component="div">
                          {company.long_name}
                        </Typography>
                        <Typography color="textSecondary">
                          {company.short_name}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} mb={2}>
                      <Grid item xs={12}>
                        <Typography variant="body2" component="p">
                          Email: {company.email}
                        </Typography>
                        <Typography variant="body2" component="p">
                          Address: {company.address}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body2" component="p">
                          Phone: {company.phone}
                        </Typography>
                        <Typography variant="body2" component="p">
                          Status: {company.status}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => handleNavigate(company.id)}
                    >
                      Ver más
                    </Button>
                  </CardActions>
                </Card>
              </ListItem>
            ))}
        </List>
      </Collapse>
    </Container>
  );
};

export default Test;
