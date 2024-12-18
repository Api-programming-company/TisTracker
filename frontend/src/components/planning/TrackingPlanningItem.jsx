import {  TextField } from '@mui/material'
import React from 'react'
import {  changeDeliverableName, removeDeliverable } from '../../reducers/planningSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getStatus,getCurrentMilestoneIndex,getPendingMilestoneIndex } from '../../reducers/planningSlice';
import {Box, Button} from "@mui/material"
import { FaTrash } from "react-icons/fa";


const TrackingPlanningItem = ({deliverable,index,milestone_id}) => {
    const dispatch = useDispatch();
    const status = useSelector(getStatus);
    const currentMilestoneIndex = useSelector(getCurrentMilestoneIndex);
    const pendingMilestoneIndex = useSelector(getPendingMilestoneIndex);
  
  
  
    const handleInputChange = (event) => {
      dispatch(changeDeliverableName({milestone_id: milestone_id, deliverable_id: deliverable.id, name: event.target.value}));
    }
  const editable = (status === "A" || status === "L" || currentMilestoneIndex !== pendingMilestoneIndex) ? false : true;
  
  
    const handleActionButton = () => {
     if(editable) {
        dispatch(removeDeliverable({milestone_index: milestone_id, deliverable_id: deliverable.id}));
     }
      
    };
  
  
    return (
      <>
        <Box className="grid-item">{index}</Box>
          <Box className="grid-item">
            {editable && deliverable.created_by === "D" ? 
             (
              <TextField
                id="outlined-basic"
                variant="outlined"
                size="small"
                sx={{ width: "100%" }}
                value={deliverable.name}
                onChange={handleInputChange}
              />
            )
            :deliverable.name
           
            }
            
          </Box>
          <Box className="grid-item">
            <Box sx={{backgroundColor: deliverable.created_by === "E" ? "info.main" : "success.main"}} className='tracking-type'>
                {deliverable.created_by === "E" ? "Estático" : "Dinámico"}
            </Box>
          </Box>
            <Box className="grid-item "  >
                {deliverable.created_by === "D" && editable && <Button onClick={handleActionButton} className='delete-btn' ><FaTrash size={16}/></Button>
            }
        </Box>
      </>
    )
}

export default TrackingPlanningItem
