import React, { useReducer } from "react";
import EvaluateReducer from "./EvaluateReducer";
import EvaluateContext from "./EvaluateContext";

const EvaluateProvider = ({ children }) => {
  const initialState = {};
  const [state, dispatch] = useReducer(EvaluateReducer, initialState);

  const clearState = () => {
    dispatch({
      type: "clearState",
    });
  };

  const setInitialState = (e) => {
    dispatch({
      type: "setInitialState",
      payload: e,
    });
  };

  const selectAnswer = (e) => {
    dispatch({
      type: "selectAnswer",
      payload: e,
    });
  };

  const verifyFields = () => {
    dispatch({
      type: "verifyFields",
    });
  };

  // EvaluationTemplate

  const handleTitleChange = (e) => {
    dispatch({
      type: "handleTitleChange",
      payload: e,
    });
  };

  const handleDescriptionChange = (e) => {
    dispatch({
      type: "handleDescriptionChange",
      payload: e,
    });
  };

  const addCriteria = () => {
    dispatch({
      type: "addCriteria",
    });
  };

  const deleteCriteria = (e) => {
    dispatch({
      type: "deleteCriteria",
      payload: e,
    });
  };

  const handleCriteriaTitleChange = (e) => {
    dispatch({
      type: "handleCriteriaTitleChange",
      payload: e,
    });
  };

  const addParameter = (e) => {
    dispatch({
      type: "addParameter",
      payload: e,
    });
  };

  const deleteParameter = (e) => {
    dispatch({
      type: "deleteParameter",
      payload: e,
    });
  };

  const handleParameterChange = (e) => {
    dispatch({
      type: "handleParameterChange",
      payload: e,
    });
  };

  const handleParameterOrder = (e) => {
    dispatch({
      type: "handleParameterOrder",
      payload: e,
    });
  };

  const validateErrors = () => {
    dispatch({
      type: "validateErrors",
    });
  };

  const handleScore = () => {
    dispatch({
      type: "handleScore",
    });
  };

  return (
    <EvaluateContext.Provider
      value={{
        state,
        setInitialState,
        selectAnswer,
        verifyFields,
        clearState,
        handleTitleChange,
        addCriteria,
        handleCriteriaTitleChange,
        addParameter,
        deleteCriteria,
        deleteParameter,
        handleParameterChange,
        handleParameterOrder,
        validateErrors,
        handleDescriptionChange,
        handleScore,
      }}
    >
      {children}
    </EvaluateContext.Provider>
  );
};

export default EvaluateProvider;
