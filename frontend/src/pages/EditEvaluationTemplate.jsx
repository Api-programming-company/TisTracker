import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCompanyQuestionsByIdQuery } from "../api/evaluationApi";

const EditEvaluationTemplate = () => {
  const { evaluation_id } = useParams();

  const {
    data: companyQuestions,
    isSuccess: companyQuestionsSuccess,
    isFetching: companyQuestionsFetching,
    isError: isCompanyQuestionsError,
    error: companyQuestionsError,
  } = useGetCompanyQuestionsByIdQuery(evaluation_id);
  useEffect(() => {
    if (companyQuestionsSuccess) {
      console.log(companyQuestions);
    //   setInitialState(companyQuestions);
    }
    if (isCompanyQuestionsError) {
      console.log(companyQuestionsError);
    }
  }, [
    companyQuestions,
    companyQuestionsFetching,
    isCompanyQuestionsError,
    companyQuestionsError,
    companyQuestionsSuccess,
  ]);
  return <div>EditEvaluationTemplate</div>;
};

export default EditEvaluationTemplate;
