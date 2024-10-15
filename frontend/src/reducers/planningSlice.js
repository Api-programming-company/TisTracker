import { createSlice,current } from "@reduxjs/toolkit";
import { data,planningSpreadsheet } from "../mock_objects/planificacion";



const initialState = planningSpreadsheet.planning.milestones;

export const planningSlice = createSlice({
    name: 'planning',
    initialState,
    reducers : {
        setMilestones : (state,action) => {
            console.log(action.payload,"action");
            return action.payload;
        },
       
        changeDeliverable: (state,action) => {
        const {milestone_id,id,field,value} = action.payload;
            const currentState = current(state);
         const milestoneIndex = currentState.findIndex((milestone) => milestone.id === milestone_id);
         const deliverableIndex = currentState[milestoneIndex].deliverables.findIndex((deliverable) => deliverable.id === id);
         return [
             ...currentState.slice(0, milestoneIndex),
             {
                 ...currentState[milestoneIndex],
                 deliverables: [
                     ...currentState[milestoneIndex].deliverables.slice(0, deliverableIndex),
                     {
                         ...currentState[milestoneIndex].deliverables[deliverableIndex],
                         [field]: value
                     },
                     ...currentState[milestoneIndex].deliverables.slice(deliverableIndex + 1),
                 ]
             },
             ...currentState.slice(milestoneIndex + 1),
         ];
        },

    }
})

export const selectCurrentMilestone = (state) => {
    const today = new Date().toISOString().split('T')[0];
    return state.planning.find(
        (milestone) =>
            milestone.start_date <= today && milestone.end_date >= today
    );
}


export const {setMilestones,changeDeliverable} = planningSlice.actions;

export default planningSlice.reducer
