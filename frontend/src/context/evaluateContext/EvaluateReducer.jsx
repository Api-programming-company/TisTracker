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

    // EvaluationTemplate
    case "updateState":
      return {
        ...state,
        ...payload,
      };
    case "handleTitleChange":
      return {
        ...state,
        title: payload,
      };
    case "addCriteria":
      const criteria = {
        id: Date.now(),
        question_text: "",
        answer_options: [],
      };
      return {
        ...state,
        questions: [...state.questions, criteria],
      };
    case "deleteCriteria":
      const deletedCriteria = state.questions.filter(
        (criteria) => criteria.id !== payload
      );
      return { ...state, questions: deletedCriteria };
    case "handleCriteriaTitleChange":
      const newCriteria = state.questions.map((criteria) =>
        criteria.id === payload.id
          ? { ...criteria, question_text: payload.value }
          : criteria
      );
      return { ...state, questions: newCriteria };
    case "addParameter":
      const answer_option = {
        id: Date.now(),
        option_text: "",
        score: "",
      };
      console.log(payload.id);
      const parameterAdded = state.questions.map((criteria) =>
        criteria.id === payload.id
          ? {
              ...criteria,
              answer_options: [...criteria.answer_options, answer_option],
            }
          : criteria
      );
      return { ...state, questions: parameterAdded };
    case "deleteParameter":
      const parameterDeleted = state.questions.map((criteria) =>
        criteria.id === payload.criteria_id
          ? {
              ...criteria,
              answer_options: criteria.answer_options.filter(
                (option) => option.id !== payload.parameter_id
              ),
            }
          : criteria
      );
      return { ...state, questions: parameterDeleted };
    case "handleParameterChange":
      const parameterChanged = state.questions.map((criteria) =>
        criteria.id === payload.criteria_id
          ? {
              ...criteria,
              answer_options: criteria.answer_options.map((option) =>
                option.id === payload.parameter_id
                  ? { ...option, option_text: payload.value }
                  : option
              ),
            }
          : criteria
      );
      return { ...state, questions: parameterChanged };
    case "handleParameterOrder":
      const parameterOrdered = state.questions.map((criteria) =>
        criteria.id === payload.criteria_id
          ? { ...criteria, answer_options: [...payload.newOrder] }
          : criteria
      );
      return { ...state, questions: parameterOrdered };
  }
};
