import { Button, TextField } from '@mui/material'
import React from 'react'
import { changeDeliverable } from '../../reducers/planningSlice';
import { useDispatch } from 'react-redux';

const PlanningItem = ({deliverable,index,milestone_id}) => {
  const dispatch = useDispatch();

  const [buttonAction, setButtonAction] = React.useState("Carry Over");

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
    switch (buttonAction) {
      case "Carry Over":
        setButtonAction("Saving...");
        //TODO: implement the logic to save the information in the database
        setTimeout(() => {
          setButtonAction("Carry Over");
        }, 2000);
        break;
        default:
          console.log("This state doesn't exist");
          break;
    }
  };

  return (
    <>
        <div className="grid-item">
          {index}
        </div>
        <div className="grid-item">{deliverable.name}</div>
        <div className="grid-item">
          <input type="number" placeholder='0' value={deliverable.observedResult} onChange={handleInputChange} name="observedResult" min={0} max={100} className='grid-input number'/>
        </div>
        <div className="grid-item">
          <input type="number" placeholder='0' value={deliverable.hopeResult} onChange={handleInputChange} name="hopeResult" min={0} max={100} className='grid-input number'/>
        </div>
        <div className="grid-item">
          <textarea name="observations" placeholder="Ponga sus observaciones aqui" id="observations" className='grid-input area' value={deliverable.observations} onChange={handleInputChange} ></textarea>
        </div>
        <div className="grid-item">
          <Button onClick={handleActionButton}>{buttonAction}</Button>
        </div>

    </>
  )
}

export default PlanningItem
