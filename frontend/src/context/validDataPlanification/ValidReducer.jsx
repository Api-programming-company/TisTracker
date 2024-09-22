export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "validateH":
      return {
        ...state,
        isValidHito: payload,
      };
    case "validateE":
      return {
        ...state,
        isValidEntregable: payload,
      };
    default:
      return state;
  }
};
