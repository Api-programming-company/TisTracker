import { TextField } from '@mui/material'
import React from 'react'

const PlanningItem = ({deliverable,index}) => {
  return (
    <>
        <div className="grid-item">
          {index}
        </div>
        <div className="grid-item">{deliverable.name}</div>
        <div className="grid-item">
        <input type="number" placeholder='0' value={0} className='grid-number-input'/>
        </div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>
        <div className="grid-item"></div>

    </>
  )
}

export default PlanningItem
