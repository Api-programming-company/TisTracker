import { Button, TextField } from '@mui/material'
import React from 'react'

const PlanningItem = ({deliverable,index}) => {
  return (
    <>
        <div className="grid-item">
          {index}
        </div>
        <div className="grid-item">{deliverable.name}</div>
        <div className="grid-item">
        <input type="number" placeholder='0' value={0}  min={0} max={100} className='grid-input number'/>
        </div>
        <div className="grid-item">
          <input type="number" placeholder='0' value={0} min={0} max={100} className='grid-input number'/>
        </div>
        <div className="grid-item">
          <textarea name="observations" id="observations" className='grid-input area' ></textarea>
        </div>
        <div className="grid-item">
          <Button>Carry Over</Button>
        </div>

    </>
  )
}

export default PlanningItem
