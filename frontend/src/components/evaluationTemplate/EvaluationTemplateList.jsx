import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllEvaluationTemplatesQuery } from "../../api/evaluationApi";

import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Typography,
  Container,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const EvaluationTemplateList = () => {
  const navigate = useNavigate();
  const { data, error, isFetching, isError, isSuccess } =
    useGetAllEvaluationTemplatesQuery();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, data, error]);

  if (isFetching) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Container>
    );
  }
  if (isError)
    return <Typography>Error loading evaluation templates</Typography>;

  const handleItemClick = (id) => {
    navigate(`/evaluation-templates/${id}`);
  };

  const handleEditClick = (id) => {
    navigate(`/evaluation-templates/${id}/update`);
  };

  if (data.length === 0) {
    return <Typography>No tiene plantillas de evaluación.</Typography>;
  }

  return (
    <List sx={{ width: "100%", maxWidth: 600, margin: "0 auto", mt: 12 }}>
      {data.map((template) => (
        <ListItem
          key={template.id}
          sx={{
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "info.gray",
            },
          }}
        >
          <ListItemText
            primary={
              <Typography variant="h6" component="div" title={template.title}>
                {template.title.length > 50
                  ? `${template.title.substring(0, 50)}...`
                  : template.title}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="textSecondary">
                {template.description}
              </Typography>
            }
            onClick={() => handleItemClick(template.id)}
          />
          <Tooltip title="Edit Template">
            <IconButton
              edge="end"
              aria-label="editar"
              onClick={() => handleEditClick(template.id)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      ))}
    </List>
  );
};

export default EvaluationTemplateList;
