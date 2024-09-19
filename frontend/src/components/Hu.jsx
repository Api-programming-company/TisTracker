import { Box, TextField, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";
import DialogMod from "./DialogMod";

const Hu = ({
  handleEliminarHu,
  onUpdate,
  info,
  trigger,
  setTrigger,
  toEdit = false,
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const [huData, setHuData] = useState({
    id: info?.id,
    nombre_hu: info?.nombre_hu || "",
    responsable: info?.responsable || "",
    objetivo: info?.objetivo || "",
  });

  const [errors, setErrors] = useState({
    nombre_hu: "",
    responsable: "",
    objetivo: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHuData({ ...huData, [name]: value });
    setErrors({ ...errors, [name]: "" });
    onUpdate(huData);
  };

  const handleRegisterHu = () => {
    const { nombre_hu, responsable, objetivo } = huData;
    let hasError = false;
    const newErrors = {};

    const validations = {
      nombre_hu: {
        condition: !nombre_hu,
        message: "El nombre de la historia de usuario es obligatorio.",
      },
      responsable: {
        condition: !responsable,
        message: "El nombre del responsable es obligatorio.",
      },
      objetivo: {
        condition: !objetivo,
        message: "El objetivo de la historia de usuario es obligatorio.",
      },
    };

    for (const [field, { condition, message }] of Object.entries(validations)) {
      if (condition) {
        newErrors[field] = message;
        hasError = true;
      }
    }

    if (hasError) {
      setErrors(newErrors);
      setTrigger(false);
      return;
    }
  };

  useEffect(() => {
    if (trigger) {
      handleRegisterHu();
    }
  }, [trigger]);

  return (
    <Box
      sx={{
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
        gap: theme.spacing(2),
        padding: theme.spacing(2),
        alignItems: "center",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box>
        <TextField
          label="Nombre del entregable*"
          name="nombre_hu"
          variant="outlined"
          value={huData.nombre_hu}
          fullWidth
          sx={{ mb: 2 }}
          onChange={handleInputChange}
          error={Boolean(errors.nombre_hu)}
          helperText={errors.nombre_hu}
          multiline
          slotProps={{
            input: {
              readOnly: toEdit,
            },
          }}
        />
        <TextField
          label="Responsable"
          name="responsable"
          variant="outlined"
          value={huData.responsable}
          fullWidth
          sx={{ mb: 2 }}
          onChange={handleInputChange}
          error={Boolean(errors.responsable)}
          helperText={errors.responsable}
          multiline
          slotProps={{
            input: {
              readOnly: toEdit,
            },
          }}
        />

        <TextField
          label="Objetivo"
          name="objetivo"
          variant="outlined"
          value={huData.objetivo}
          fullWidth
          sx={{ gridColumn: { xs: "1", sm: "1/3" } }}
          onChange={handleInputChange}
          error={Boolean(errors.objetivo)}
          helperText={errors.objetivo}
          multiline
          slotProps={{
            input: {
              readOnly: toEdit,
            },
          }}
        />
      </Box>

      <IconButton
        onClick={() => setOpen(true)} //() => handleEliminarHu(huData.id)
        color="error"
        aria-label="Eliminar hito"
        sx={{ justifySelf: "center" }}
        disabled={toEdit}
      >
        <DeleteIcon />
      </IconButton>
      <DialogMod
        open={open}
        setOpen={setOpen}
        title={"Eliminar entregable"}
        content={"¿Estás seguro de que deseas eliminar el entregable?"}
        onAccept={handleEliminarHu}
        paramsAccept={huData.id}
      />
    </Box>
  );
};

export default Hu;
