import { Button, TextField } from '@mui/material'
import React from 'react'
import { defer } from 'react-router-dom';

const PlanningItem = ({deliverable,index}) => {
  const [inputValue, setInputValue] = React.useState({
    observedResult: 0,
    hopeResult: 0,
    observations: ""
  });
  const [buttonAction, setButtonAction] = React.useState("Carry Over");

  const handleInputChange = (event) => {
    switch (event.target.name) {
      case "observedResult":
        setInputValue((prevState) => ({...prevState, observedResult: parseInt(event.target.value)}));
        break;
      case "hopeResult":
        setInputValue((prevState) => ({...prevState, hopeResult: parseInt(event.target.value)}));
        break;
      case "observations":
        setInputValue((prevState) => ({...prevState, observations: event.target.value}));
        break;
      default:
        console.log("This state doesn't exist")
        break;
    }
  };

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
          <input type="number" placeholder='0' value={inputValue.observedResult} onChange={handleInputChange} name="observedResult" min={0} max={100} className='grid-input number'/>
        </div>
        <div className="grid-item">
          <input type="number" placeholder='0' value={inputValue.hopeResult} onChange={handleInputChange} name="hopeResult" min={0} max={100} className='grid-input number'/>
        </div>
        <div className="grid-item">
          <textarea name="observations" placeholder="Ponga sus observaciones aqui" id="observations" className='grid-input area' value={inputValue.observations} onChange={handleInputChange} ></textarea>
        </div>
        <div className="grid-item">
          <Button onClick={handleActionButton}>{buttonAction}</Button>
        </div>

    </>
  )
}

export default PlanningItem
