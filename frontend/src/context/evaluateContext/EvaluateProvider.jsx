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
  const updateState = (e) => {
    dispatch({
      type: "updateState",
      payload: e,
    });
  };

  const addCriteria = (e) => {
    dispatch({
      type: "addCriteria",
      payload: e,
    });
  };

  const addParameter = (e) => {
    dispatch({
      type: "addParameter",
      payload: e,
    });
  };

  return (
    <EvaluateContext.Provider
      value={{ state, setInitialState, selectAnswer, verifyFields, clearState }}
    >
      {children}
    </EvaluateContext.Provider>
  );
};

export default EvaluateProvider;
