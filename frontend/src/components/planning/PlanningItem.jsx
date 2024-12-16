import { Button, TextField } from '@mui/material'
import React from 'react'
import { changeDeliverable } from '../../reducers/planningSlice';
import { useDispatch } from 'react-redux';
import { de } from 'date-fns/locale';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { getStatus,getCurrentMilestoneIndex,getPendingMilestoneIndex } from '../../reducers/planningSlice';
import {Box} from "@mui/material"
const PlanningItem = ({deliverable,index,milestone_id}) => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus);
  const currentMilestoneIndex = useSelector(getCurrentMilestoneIndex);
  const pendingMilestoneIndex = useSelector(getPendingMilestoneIndex);



  const handleInputChange = (event) => {
    const change = {};

    const {name,value} = event.target;    
    
    if(name === "expected_result" || name === "actual_result"){
      if(isNaN(value) || value < 0 || value > 100 || value === ""){
        return;
      }
    }

    switch (name) {
      
        case "expected_result":
            change[name] = parseInt(value);
            dispatch(changeDeliverable({id : deliverable.id, field: name, value: parseInt(value), milestone_id}));
        break;
        case "actual_result":
                change[name] = parseInt(value);
                dispatch(changeDeliverable({id : deliverable.id, field: name, value: parseInt(value), milestone_id}));

            break;
        case "observations":
            change.observations = value;
            dispatch(changeDeliverable({id : deliverable.id, field: name, value, milestone_id}));

            break;
        default:
            console.log("This state doesn't exist");
            break;
    }
    
}
const editable = (status === "A" || status === "L" || currentMilestoneIndex !== pendingMilestoneIndex || deliverable.created_by === "E") ? false : true;


  const handleActionButton = () => {
   if(editable) {
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
   }
    
  };


  return (
    <>
    <Box sx={{backgroundColor: `${deliverable.status === "C" && "error.main"}`}}className="grid-item">{index}</Box>
        <Box sx={{backgroundColor: `${deliverable.status === "C" && "error.main"}`}}className="grid-item">{deliverable.name}</Box>
        <Box sx={{backgroundColor: `${deliverable.status === "C" && "error.main"}`}}className="grid-item">
            <Box sx={{backgroundColor: deliverable.created_by === "E" ? "info.main" : "success.main"}} className='tracking-type'>
                {deliverable.created_by === "E" ? "Estático" : "Dinámico"}
            </Box>        </Box>
        <Box sx={{backgroundColor: `${deliverable.status === "C" && "error.main"}`}}  className="grid-item">
          <input type="number" placeholder="0" value={deliverable.expected_result} onChange={handleInputChange} name="expected_result" min={0} max={100} className="grid-input number" readOnly={!editable}/>
        </Box>
        <Box sx={{backgroundColor: `${deliverable.status === "C" && "error.main"}`}}  className="grid-item">
          <input type="number" placeholder="0" value={deliverable.actual_result} onChange={handleInputChange} name="actual_result" min={0} max={100} className="grid-input number" readOnly={!editable}/>
        </Box>
        
        <Box sx={{backgroundColor: `${deliverable.status === "C" && "error.main"}`}}className="grid-item">
          <textarea name="observations" placeholder="Ponga sus observaciones aqui" id="observations" className="grid-input area" value={deliverable.observations} onChange={handleInputChange} readOnly={!editable} ></textarea>
        </Box>
          <Box sx={{backgroundColor: `${deliverable.status === "C" && "error.main"}`}}className="grid-item " onClick={handleActionButton} >
            <Checkbox color="primary" name="status" disabled={!editable} checked= {deliverable.status === "C"}  />
          </Box>
    </>
  )

}


export default PlanningItem
