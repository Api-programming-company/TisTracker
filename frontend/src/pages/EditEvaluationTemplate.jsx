import React from 'react'
import { useParams } from 'react-router-dom';

const EditEvaluationTemplate = () => {
  const { evaluation_id } = useParams();

    
  return (
    <div>EditEvaluationTemplate</div>
  )
}

export default EditEvaluationTemplate