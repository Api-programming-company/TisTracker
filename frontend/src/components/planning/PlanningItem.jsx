import { Button, TextField } from '@mui/material'
import React from 'react'
import { changeDeliverable } from '../../reducers/planningSlice';
import { useDispatch } from 'react-redux';
import { de } from 'date-fns/locale';
import Checkbox from '@mui/material/Checkbox';


const PlanningItem = ({deliverable,index,milestone_id}) => {
  const dispatch = useDispatch();


  const handleInputChange = (event) => {
    const change = {};
    switch (event.target.name) {
      case "observedResult":
        change.observedResult = parseInt(event.target.value);
        break;
      case "hopeResult":
        change.hopeResult = parseInt(event.target.value);
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
    switch (deliverable.state) {
      case "A":
        dispatch(changeDeliverable({id : deliverable.id, field: "state", value: "C",milestone_id}));
        break;
      case "C" :
        dispatch(changeDeliverable({id : deliverable.id, field: "state", value: "A",milestone_id}));

        break;
        default:
          console.log("This state doesn't exist");
          break;
    }
  };

  return (
    <div className='grid'>
        <div className={`grid-item ${deliverable.state === "C" ? "bg-red" : ""}`}>{index}</div>
        <div className={`grid-item ${deliverable.state === "C" ? "bg-red" : ""}`}>{deliverable.name}</div>
        <div className={`grid-item ${deliverable.state === "C" ? "bg-red" : ""}`}>
          <input type="number" placeholder='0' value={deliverable.observedResult} onChange={handleInputChange} name="observedResult" min={0} max={100} className='grid-input number'/>
        </div>
        <div className={`grid-item ${deliverable.state === "C" ? "bg-red" : ""}`}>
          <input type="number" placeholder='0' value={deliverable.hopeResult} onChange={handleInputChange} name="hopeResult" min={0} max={100} className='grid-input number'/>
        </div>
        <div className={`grid-item ${deliverable.state === "C" ? "bg-red" : ""}`}>
          <textarea name="observations" placeholder="Ponga sus observaciones aqui" id="observations" className='grid-input area' value={deliverable.observations} onChange={handleInputChange} ></textarea>
        </div>
        <div className={`grid-item ${deliverable.state === "C" ? "bg-red" : ""}`}>
          <Checkbox  color="primary" onChange={handleActionButton}/>
        </div>

    </div>
  )
}

export default PlanningItem
