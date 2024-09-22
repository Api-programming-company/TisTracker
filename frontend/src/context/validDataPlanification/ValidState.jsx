import React, { useReducer } from "react";
import ValidReducer from "./ValidReducer";
import ValidContext from "./ValidContext";

const ValidStateProvider = ({ children }) => {
  const initialState = {
    isValidHito: true,
    isValidEntregable: true,
  };

  const [state, dispatch] = useReducer(ValidReducer, initialState);

  const validateHito = (e) => {
    dispatch({
      type: "validateH",
      payload: e,
    });
  };

  const validateEntregable = (e) => {
    dispatch({
      type: "validateE",
      payload: e,
    });
  };

  return (
    <ValidContext.Provider
      value={{
        isValidH: state.isValidHito,
        isValidE: state.isValidEntregable,
        validateHito: validateHito,
        validateEntregable: validateEntregable,
      }}
    >
      {children}
    </ValidContext.Provider>
  );
};

export default ValidStateProvider;
