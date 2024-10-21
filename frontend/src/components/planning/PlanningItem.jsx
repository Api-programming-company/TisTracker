import { Button, TextField } from '@mui/material'
import React from 'react'
import { changeDeliverable } from '../../reducers/planningSlice';
import { useDispatch } from 'react-redux';
import { de } from 'date-fns/locale';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { getStatus,getCurrentMilestoneIndex,getPendingMilestoneIndex } from '../../reducers/planningSlice';

const PlanningItem = ({deliverable,index,milestone_id}) => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const currentMilestoneIndex = useSelector(getCurrentMilestoneIndex);
  const pendingMilestoneIndex = useSelector(getPendingMilestoneIndex);



  const handleInputChange = (event) => {
    const change = {};
    switch (event.target.name) {
      case "expected_result":
        change.expected_result = parseInt(event.target.value);
        break;
      case "actual_result":
        change.actual_result = parseInt(event.target.value);
        break;
      case "observations":
        change.observations = event.target.value;
        break;
      default:
        console.log("This state doesn't exist")
        break;
    }
    dispatch(changeDeliverable({id : deliverable.id, field: event.target.name, value: event.target.value,milestone_id}));
    }

  const handleActionButton = () => {
    switch (deliverable.status) {
      case "A":
        dispatch(changeDeliverable({id : deliverable.id, field: "status", value: "C",milestone_id}));
        break;
      case "C" :
        dispatch(changeDeliverable({id : deliverable.id, field: "status", value: "A",milestone_id}));

        break;
        default:
          console.log("This state doesn't exist");
          break;
    }
  };

  const editable = (status === "A" || currentMilestoneIndex !== pendingMilestoneIndex) ? false : true;

  return (
    <div className={`grid ${deliverable.status === "C" ? "bg-red" : ""}`}>
        <div className="grid-item">{index}</div>
        <div className="grid-item">{deliverable.name}</div>
        <div className="grid-item">
          <input type="number" placeholder="0" value={deliverable.expected_result} onChange={handleInputChange} name="expected_result" min={0} max={100} className="grid-input number" readOnly={!editable}/>
        </div>
        <div className="grid-item">
          <input type="number" placeholder="0" value={deliverable.actual_result} onChange={handleInputChange} name="actual_result" min={0} max={100} className="grid-input number" readOnly={!editable}/>
        </div>
        
        <div className="grid-item">
          <textarea name="observations" placeholder="Ponga sus observaciones aqui" id="observations" className="grid-input area" value={deliverable.observations} onChange={handleInputChange} readOnly={!editable} ></textarea>
        </div>
        <div className="grid-item">
          <Checkbox color="primary" name="status" onChange={handleActionButton} disabled={!editable} checked= {deliverable.status === "C"}/>
        </div>

    </div>
  )

}


export default PlanningItem
