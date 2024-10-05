export default (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "clearState":
      return {};
    case "setInitialState":
      return {
        ...state,
        ...payload,
      };
    case "selectAnswer":
      const newQuestions = state.questions.map((e) =>
        e.id === payload.question_id ? { ...e, answer: payload.answer } : e
      );
      return {
        ...state,
        questions: newQuestions,
      };
    case "verifyFields":
      const answersList = state.questions.map((e) => (e.answer ? true : false));
      const isValid = answersList.reduce(
        (acc, current) => acc && current,
        true
      );
      return { ...state, isValid: isValid };
  }
};
