import React, { useReducer } from "react";
import EvaluateReducer from "./EvaluateReducer";
import EvaluateContext from "./EvaluateContext";

const EvaluateProvider = ({ children }) => {
  const initialState = {};
  const [state, dispatch] = useReducer(EvaluateReducer, initialState);

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

  return (
    <EvaluateContext.Provider
      value={{ state, setInitialState, selectAnswer, verifyFields }}
    >
      {children}
    </EvaluateContext.Provider>
  );
};

export default EvaluateProvider;
