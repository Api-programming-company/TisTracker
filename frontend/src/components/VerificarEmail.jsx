import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const VerificarEmail = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = async () => {
    if (!isValidEmail(email)) {
      setErrors("Ingrese un email válido, ejemplo@test.com");
      return;
    }

    setErrors("");
    setIsEmailVerified(false);
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:8000/api/docente/check-email?email=${encodeURIComponent(email)}`
      );
      if (!response.ok) {
        const data = await response.json();
        if (response.status === 409) {
          setErrors(data.message || "Email ya registrado.");
        } else {
          setErrors(data.message || "Error al verificar el email.");
        }
        setIsEmailVerified(false);
      } else {
        setErrors("");
        setIsEmailVerified(true);
      }
    } catch (err) {
      setErrors("Error en la red o servidor.");
      setIsEmailVerified(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    setErrors("");
    setIsEmailVerified(false);
  };

  return (
    <TextField
      label="Email*"
      name="email"
      type="email"
      value={email}
      onChange={handleChange}
      fullWidth
      margin="normal"
      error={Boolean(errors)}
      helperText={errors}
      onBlur={handleBlur}
      disabled={isLoading}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {isLoading ? (
                <CircularProgress size={30} thickness={6} color="primary" />
              ) : isEmailVerified ? (
                <CheckCircle color="primary" />
              ) : null}
            </InputAdornment>
          ),
        },
      }}
    />
  );
};

export default VerificarEmail;
