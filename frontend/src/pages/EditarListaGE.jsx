import React, { useEffect, useState } from "react";
import {
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
import { format, parseISO } from "date-fns";

import DialogMod from "../components/DialogMod";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../api/companyApi";
import { useDeleteInvitationByIdMutation } from "../api/invitationApi";

const EditarListaGE = () => {
  const { id } = useParams();
  const [itemIdToRemove, setItemIdToRemove] = useState(null);
  const [openA, setOpenA] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [updateInvitation, { data, error, isSuccess, isError, isLoading }] =
    useDeleteInvitationByIdMutation();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
      console.log(itemIdToRemove);

      setSelectedItems((prevItems) =>
        prevItems.filter((member) => member.id !== itemIdToRemove)
      );
      setSnackbarMessage("Invitación retirada correctamente");
      setSnackbarOpen(true);
      setItemIdToRemove(null);
    }
    if (isError) {
      console.log(error);
      setSnackbarMessage(error.data?.message);
      setSnackbarOpen(true);
      setItemIdToRemove(null);
    }
  }, [isSuccess, isError, data, error, itemIdToRemove]);

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
        return member.status === "P";
      });
      setSelectedItems(pending);
    }
    if (isCompanyError) console.log(companyError);
  }, [companyData, companyError, isCompanySuccess, isCompanyError]);

  const handleRemoveItem = () => {
    updateInvitation(itemIdToRemove);
    setOpenA(false);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (isCompanyFetching || isLoading) {
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
                {selectedItems.length === 0 ? (
                  <ListItem>
                    <ListItemText primary="No hay invitaciones a retirar." />
                  </ListItem>
                ) : (
                  selectedItems.map((member) => (
                    <ListItem
                      key={member.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => {
                            setItemIdToRemove(member.id);
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
                        <Avatar
                          sx={{
                            bgcolor: "primary.main",
                            color: "white",
                            width: 56,
                            height: 56,
                            mr: 2,
                          }}
                        >
                          {member.user.first_name[0]}
                          {member.user.last_name[0]}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={`${member.user.first_name} ${member.user.last_name}`}
                        secondary={
                          <Box>
                            <Typography variant="body2">
                              {member.user.email}
                            </Typography>
                            <Typography variant="body2">
                              Invitación realizada en:{" "}
                              {format(
                                parseISO(member.created_at),
                                "dd/MM/yyyy HH:mm:ss"
                              )}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))
                )}
              </List>
              <DialogMod
                open={openA}
                setOpen={setOpenA}
                title={"Confirmar retiro de invitación"}
                content={"¿Estás seguro que deseas retirar esta invitación?"}
                onAccept={() => {
                  handleRemoveItem();
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
