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
} from "@mui/material";

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
  }, []);

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

  if (data.length === 0) {
    return <Typography>No tiene plantillas de evaluacion.</Typography>;
  }

  return (
    <List sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}>
      {data.map((template) => (
        <ListItem
          button
          key={template.id}
          onClick={() => handleItemClick(template.id)}
          sx={{
            mb: 2,
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "16px",
            cursor: "pointer",
            "&:hover": {
              backgroundColor: "#f5f5f5",
            },
          }}
        >
          <ListItemText
            primary={
              <Typography variant="h6" component="div">
                {template.title}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="textSecondary">
                {template.description}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default EvaluationTemplateList;
