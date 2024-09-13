import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useLazyCheckEmailQuery } from "../api/docenteSlice";

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const VerificarEmail = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [checkEmail, { error: apiError, isFetching, isSuccess }] =
    useLazyCheckEmailQuery();

  useEffect(() => {
    if (apiError) {
      setIsEmailVerified(false);
      setError(
        apiError?.status === 409
          ? apiError?.data?.message
          : "Error al verificar el email"
      );
    } else if (isSuccess) {
      setError("");
      setIsEmailVerified(true);
    }
  }, [apiError, isSuccess]);

  const handleBlur = () => {
    if (!isValidEmail(email)) {
      setError("Ingrese un email válido, ejemplo: ejemplo@test.com");
      return;
    }
    checkEmail(email);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError("");
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
      error={Boolean(error)}
      helperText={error}
      onBlur={handleBlur}
      disabled={isFetching}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              {isFetching ? (
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
