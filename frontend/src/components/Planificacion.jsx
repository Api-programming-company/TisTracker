import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Entregable from "./Entregable";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

const Planificacion = () => {
  const [entregables, setEntregables] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const navigate = useNavigate()

  const handleAgregarEntregable = () => {
    setEntregables([
      ...entregables,
      { id: Date.now(), nombre_hito: "", fecha_ini: "", fecha_entrega: "", cobro: "", hu: [] }
    ]);
  };

  const handleEliminarEntregable = (id) => {
    setEntregables(entregables.filter(entregable => entregable.id !== id));
  };

  const handleUpdateEntregable = (updatedData) => {
    setEntregables(
      entregables.map(entregable =>
        entregable.id === updatedData.id ? updatedData : entregable
      )
    );
  };



  const handleRegistrarPlan = () =>{
    setTrigger(true) 
    // console.log(entregables)
    // aun hay un error, estan en estado false, y luego llenando todo
    //correctamente sigue dando un false y al siguiente click recien true,
    // no estoy seguro si es por lo del asincronismo 

    trigger ? console.log("valido") : console.log("no valido")
    
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", padding: 2 }}>
      <Typography variant="h4" sx={{ marginY: 2 }}>
        Planificación de Hitos
      </Typography>

      <Stack spacing={2}>
        {entregables.map((entregable) => (
          <Box key={entregable.id} sx={{ border: '1px solid #ddd', padding: 2, borderRadius: 1, position: 'relative' }}>
            <Entregable
              entregable={entregable}
              onUpdate={handleUpdateEntregable}
              onDelete={() => handleEliminarEntregable(entregable.id)}
              trigger={trigger}
              setTrigger={setTrigger}
            />
          </Box>
        ))}
        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAgregarEntregable}
          >
            Agregar hito
          </Button>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", marginY: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleRegistrarPlan}
          >
            Guardar planificación
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default Planificacion;
