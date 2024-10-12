import React, { useEffect } from 'react'
import { useCreateEvaluationTemplateMutation } from '../api/evaluationApi'

const EvaluationTemplate = () => {
  const [createEvaluationTemplate, {data,isSuccess,isError,error,isLoading}] = useCreateEvaluationTemplateMutation()
  
  useEffect(() => {
    if(isSuccess) {
      console.log(data)
    }
    if(isError) {
      console.log(error)
    }
  }, [isSuccess,isError, error, data])
  return (
    <div>EvaluationTemplate</div>
  )
}

export default EvaluationTemplate