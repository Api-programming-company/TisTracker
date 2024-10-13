import { createSlice } from "@reduxjs/toolkit";
import { data } from "../mock_objects/planificacion";



const initialState = data.planning.milestones;

export const planningSlice = createSlice({
    name: 'planning',
    initialState,
    reducers : {
        setMilestones : (state,action) => {
            return action.payload;
        }
    }
})

export const selectCurrentMilestone = (state) => {
    const today = new Date().toISOString().split('T')[0];
    return state.planning.find(
        (milestone) =>
            milestone.start_date <= today && milestone.end_date >= today
    );
}


export const {setMilestones} = planningSlice.actions;

export default planningSlice.reducer
