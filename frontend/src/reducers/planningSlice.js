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
    return state.planning;
}

export const {setMilestones} = planningSlice.actions;

export default planningSlice.reducer
