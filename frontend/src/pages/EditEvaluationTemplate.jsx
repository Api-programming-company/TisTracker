import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCompanyQuestionsByIdQuery } from "../api/evaluationApi";
import { useUpdateEvaluationTemplateMutation } from "../api/evaluationApi";

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

  const [
    updateEvaluationTemplate,
    { isLoading, data, error, isError, isSuccess },
  ] = useUpdateEvaluationTemplateMutation();
  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
    if (isError) {
      console.log(error);
    }
  }, [data, isLoading, isError, isSuccess]);

  return <div>EditEvaluationTemplate</div>;
};

export default EditEvaluationTemplate;
