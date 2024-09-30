import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  Box,
  FormControl,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Snackbar,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Person } from "@mui/icons-material";
import { format, parseISO } from 'date-fns';

import DialogMod from "../components/DialogMod";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useUpdateInvitationByIdMutation } from "../api/invitationApi";

const EditarListaGE = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: companyData,
    error: companyError,
    isSuccess: isCompanySuccess,
    isError: isCompanyError,
    isLoading: isCompanyLoading,
    isFetching: isCompanyFetching,
  } = useGetCompanyByIdQuery(id);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (isCompanySuccess) {
      console.log(companyData);
      const pending = companyData.company.members.filter((member) => {
        return member.pivot.status === "P";
      });
      setSelectedItems(pending);
    }
    if (isCompanyError) console.log(companyError);
  }, [companyData, companyError, isCompanySuccess, isCompanyError]);

  const [openA, setOpenA] = useState(false);
  const [itemIdToRemove, setItemIdToRemove] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
    setSnackbarMessage("Invitación retirada correctamente");
    setSnackbarOpen(true);
    setOpenA(false)
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isCompanyFetching) {
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

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 12, mb: 10 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: "center" }}
        >
          Invitaciones Pendientes
        </Typography>

        <FormControl fullWidth sx={{ mb: 1 }}>
          <Box
            sx={{
              display: { xs: "block", sm: "flex" },
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <FormControl fullWidth>
              <Typography variant="subtitle1">
                Lista de Invitaciones a Retirar:
              </Typography>
              <List>
                {selectedItems.map((item) => (
                  <ListItem
                    key={item.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => {
                          setItemIdToRemove(item.id);
                          setOpenA(true);
                        }}
                      >
                        <Delete />
                      </IconButton>
                    }
                    sx={{
                      backgroundColor: "info.gray",
                      mb: 0.5,
                    }}
                  >
                    <ListItemIcon>
                      <Avatar>
                        <Person />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.first_name} ${item.last_name}`}
                      secondary={
                        <Box>
                          <Typography variant="body2">
                            Correo: {item.email}
                          </Typography>
                          <Typography variant="body2">
                            Invitación realizada en: {format(parseISO(item.created_at), 'dd/MM/yyyy HH:mm:ss')}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <DialogMod
                open={openA}
                setOpen={setOpenA}
                title={"Confirmar retiro de invitación"}
                content={"¿Estas seguro que deseas retirar esta invitación?"}
                onAccept={() => {
                  if (itemIdToRemove !== null) {
                    handleRemoveItem(itemIdToRemove);
                    setItemIdToRemove(null);
                  }
                }}
              />
            </FormControl>
          </Box>
        </FormControl>

        {/* Snackbar para mensajes */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </Box>
    </Container>
  );
};

export default EditarListaGE;
