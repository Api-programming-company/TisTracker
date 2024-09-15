import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, CircularProgress } from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useLazyCheckEmailQuery } from "../api/userApi";
import { validarEmailDocente, validarEmailEstudiante } from "../utils";

// Variable para activar/desactivar la validación de email
const useEmailValidation = false;

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

const VerificarEmail = ({
  email,
  onEmailChange,
  setErrors,
  errors,
  isEmailVerified,
  setIsEmailVerified,
  userType,
}) => {
  const [checkEmail, { error: apiError, data, isFetching, isSuccess }] =
    useLazyCheckEmailQuery();

  useEffect(() => {
    if (isSuccess) {
      if (data?.exists) {
        setIsEmailVerified(false);
        setErrors("El correo electrónico no está registrado.");
      } else {
        setIsEmailVerified(true);
        setErrors("");
      }
    } else if (apiError) {
      console.log("Error API:", apiError);
      setIsEmailVerified(false);
      setErrors(
        apiError?.status === 409
          ? apiError?.data?.message ||
              "El correo electrónico ya está registrado."
          : "Error al verificar el email"
      );
    }
  }, [apiError, isSuccess, setErrors]);

  const handleBlur = () => {
    setIsEmailVerified(false);
    if (!useEmailValidation) {
      if (!isValidEmail(email)) {
        setErrors("Ingrese un email válido, ejemplo: ejemplo@test.com");
        return;
      }
    } else {
      if (userType === "docente") {
        if (!validarEmailDocente(email)) {
          setErrors(
            "Ingrese un email válido, ejemplo: ejemplo@fcyt.umss.edu.bo"
          );
          return;
        }
      } else {
        if (!validarEmailEstudiante(email)) {
          setErrors("Ingrese un email válido, ejemplo: ejemplo@est.umss.edu");
          return;
        }
      }
    }

    checkEmail(email);
  };

  return (
    <TextField
      label="Email*"
      name="email"
      type="email"
      value={email}
      onChange={onEmailChange}
      fullWidth
      margin="normal"
      error={Boolean(errors)}
      helperText={errors}
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
