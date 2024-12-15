import React from 'react'
import { getMilestoneStatus } from '../../utils/dateFormat';

const PlanningInfoMessage = ({status,currentMilestoneIndex,pendingMilestoneIndex,milestone}) => {
    const milestone_status = getMilestoneStatus(milestone.end_date);
    return (
    status !== "A" && (
        currentMilestoneIndex === pendingMilestoneIndex ? ( 
        milestone_status === "late" ? (
          <p className="text-red-500 text-sm">
            {`Validación retrasada por ${Math.ceil(
              Math.abs(new Date(milestone.end_date) - new Date()) /
                (1000 * 60 * 60 * 24)
            )} días.`}
          </p>
        ) : milestone_status === "current" ? (
          <p className="text-sm text-success">Dia de validación</p>
        ):(
          
          <p className="text-sm text-primary-300">
            {`Aun quedan ${Math.ceil(
              Math.abs(new Date(milestone.end_date) - new Date()) /
                (1000 * 60 * 60 * 24)
            )} días para la validación de este hito.`}
          </p>
        )):
        <p className="text-sm text-red-500">Debes validar los hitos anteriores para poder realizar el seguimiento semanal de este hito.</p>
      )
  )
}

export default PlanningInfoMessage
