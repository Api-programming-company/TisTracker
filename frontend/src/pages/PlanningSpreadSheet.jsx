import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentMilestone } from '../reducers/planningSlice'

const PlanningSpreadSheet = () => {
    const milestone = useSelector(selectCurrentMilestone);

    useEffect(() => {
        console.log(milestone);
    },[milestone])
  return (
    <div id='planning_spreadsheet' className='container'>
      <div className="section-header">
        <h1>Planilla de Seguimiento Semanal</h1>
      </div>
      <div className="section-body">

      </div>
    </div>
  )
}

export default PlanningSpreadSheet
