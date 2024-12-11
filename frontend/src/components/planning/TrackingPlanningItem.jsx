import { Button, TextField } from '@mui/material'
import React from 'react'
import { changeDeliverable } from '../../reducers/planningSlice';
import { useDispatch } from 'react-redux';
import { de } from 'date-fns/locale';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from 'react-redux';
import { getStatus,getCurrentMilestoneIndex,getPendingMilestoneIndex } from '../../reducers/planningSlice';
import {Box} from "@mui/material"
import { FaTrash } from "react-icons/fa";


const TrackingPlanningItem = ({deliverable,index,milestone_id}) => {
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
  const editable = (status === "A" || status === "L" || currentMilestoneIndex !== pendingMilestoneIndex) ? false : true;
  
  
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
        <Box className="grid-item">{index}</Box>
          <Box className="grid-item">{deliverable.name}</Box>
          <Box className="grid-item">
            <Box sx={{backgroundColor: deliverable.created_by === "E" ? "info.main" : "success.main"}} className='tracking-type'>
                {deliverable.created_by === "E" ? "Estático" : "Dinámico"}
            </Box>
          </Box>
            <Box className="grid-item "  >
            <i onClick={handleActionButton} className='delete-btn' ><FaTrash /></i>
        </Box>
      </>
    )
}

export default TrackingPlanningItem
