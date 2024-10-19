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
    case "handleDescriptionChange":
      return { ...state, description: payload };
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

    // Validacion de errores
    case "validateErrors":
      const errors = [];
      if (!state.title)
        errors.push({
          from: "title",
          message: "El nombre de la plantilla es obligatorio.",
        });
      if (!state.description)
        errors.push({
          from: "description",
          message: "La descripción es obligatoria.",
        });
      if (state.questions.length < 1) {
        errors.push({
          from: "questions",
          message: "Debe haber por lo menos un criterio de evaluación.",
        });
      }

      const criterias = state.questions.map((e) => e.question_text);
      if (new Set(criterias).size < criterias.length) {
        errors.push({
          from: "questions",
          message: "Los criterios de evaluación no pueden ser repetidos.",
        });
      }

      state.questions.forEach((criteria) => {
        if (!criteria.question_text) {
          errors.push({
            from: "question_text",
            id: criteria.id,
            message: "El criterio de evaluación es obligatorio.",
          });
        }
        // parameters
        if (criteria.answer_options.length < 2) {
          errors.push({
            from: "parameters",
            id: criteria.id,
            message: "Debe haber por lo menos dos parámetros de evaluación.",
          });
        } else {
          if (criteria.answer_options.length > 10) {
            errors.push({
              from: "parameters",
              id: criteria.id,
              message: "La cantidad máxima de parámetros es 10.",
            });
          }
          const parameters = criteria.answer_options.map((e) => e.option_text);
          if (parameters.includes("")) {
            errors.push({
              from: "parameter",
              id: criteria.id,
              message: "Los parámetros de evaluación son obligatorios.",
            });
          }
          if (new Set(parameters).size < parameters.length) {
            errors.push({
              from: "parameter",
              id: criteria.id,
              message: "Los parámetros de evaluación no pueden ser repetidos.",
            });
          }
        }
      });

      if (errors.length > 0) {
        return { ...state, errors: errors };
      }
      delete state?.errors;
      return { ...state };

    case "handleScore":
      const scoreHandled = state.questions.map((criteria) => {
        const newOptions = criteria.answer_options.map((option, index) => {
          return { ...option, score: index };
        });
        return { ...criteria, answer_options: newOptions };
      });
      return { ...state, questions: scoreHandled };
    //------------------------------------------------------------------------------
    case "handleGetDifference":
      //utils
      const head = (list) => list[0];

      // option puede ser question o answer_option,
      const itemById = (id, option, questionId = null) => {
        if (option === "question") {
          return head(payload.questions.filter((e) => e.id === id));
        } else if (option === "answer_option") {
          const question = head(
            payload.questions.filter((e) => e.id === questionId)
          );
          const answer_option = head(
            question.answer_options.filter((e) => e.id === id)
          );
          return answer_option;
        }
      };

      const modified = { questions: [], answer_options: [] };
      const deleted = { questions: [], answer_options: [] };
      const added = { questions: [], answer_options: [] };

      if (state.title !== payload.title) modified["title"] = state.title;
      if (state.description !== payload.description)
        modified["description"] = state.description;

      const initialQuestionIds = payload.questions.map((e) => e.id);
      state.questions.forEach((criteria) => {
        if (initialQuestionIds.includes(criteria.id)) {
          const initialQuestion = itemById(criteria.id, "question");
          // validar si cambia el criterio
          if (initialQuestion.question_text !== criteria.question_text) {
            modified["questions"].push({
              id: criteria.id,
              question_text: criteria.question_text,
            });
          }
          // valiar si cambia sus answer_options
          const initialAnswerOptionsIds = initialQuestion.answer_options.map(
            (e) => e.id
          );
          criteria.answer_options.forEach((option) => {
            if (initialAnswerOptionsIds.includes(option.id)) {
              const initialOption = itemById(
                option.id,
                "answer_option",
                criteria.id
              );
              if (
                initialOption.option_text !== option.option_text ||
                initialOption.score !== option.score
              ) {
                modified["answer_options"].push({
                  question_id: criteria.id,
                  ...option,
                });
              }
            } else {
              //si llega aqui es porque es un parametro nuevo
              added["answer_options"].push({
                question_id: criteria.id,
                ...option,
              });
            }
          });
          //validar si ha eliminado parametros
          const actualAnswerOptionsIds = criteria.answer_options.map(
            (e) => e.id
          );
          initialAnswerOptionsIds.forEach((e) => {
            if (!actualAnswerOptionsIds.includes(e)) {
              const option = itemById(e, "answer_option", criteria.id);
              deleted["answer_options"].push({
                question_id: criteria.id,
                ...option,
              });
            }
          });
        } else {
          //si llega aqui es porque es un criterio nuevo
          added["questions"].push({ ...criteria });
        }
      });
      //validar si ha eliminado criterios
      const actualQuestionIds = state.questions.map((e) => e.id);
      initialQuestionIds.forEach((e) => {
        if (!actualQuestionIds.includes(e)) {
          const question = itemById(e, "question");
          deleted["questions"].push({ ...question });
        }
      });
      return {
        ...state,
        changes: { modified: modified, deleted: deleted, added: added },
      };
  }
};
