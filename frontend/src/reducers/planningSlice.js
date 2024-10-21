import { createSlice, current } from "@reduxjs/toolkit";
import { planningSpreadsheet } from "../mock_objects/planificacion";

const initialState = planningSpreadsheet.planning.milestones;

export const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setMilestones: (state, action) => {
      const tempMilestones = JSON.parse(JSON.stringify(action.payload));
      
      tempMilestones.forEach(milestone => {
        milestone.deliverables.forEach(deliverable => {
          if (deliverable.expected_result === null) {
            deliverable.expected_result = 0;
          }
          if (deliverable.actual_result === null) {
            deliverable.actual_result = 0;
          }
        });
      });

      tempMilestones.sort((a,b) => {
        const dateA = new Date(a.end_date);
        const dateB = new Date(b.end_date);
        return dateA - dateB;
      });

      const currentMilestone = tempMilestones.findIndex(
        (milestone) => milestone.status === "P"
      );
      console.log(tempMilestones);
      return { milestones: tempMilestones , currentMilestone, pendingMilestone: currentMilestone };
    },


    changeDeliverable: (state, action) => {
      const { milestone_id, id, field, value } = action.payload;
      console.log(field,value);
      const currentState = current(state);
      const { milestones: currentMilestones } = currentState;
      const milestoneIndex = currentMilestones.findIndex(
        (milestone) => milestone.id === milestone_id
      );
      const deliverableIndex = currentMilestones[
        milestoneIndex
      ].deliverables.findIndex((deliverable) => deliverable.id === id);

      const numberValue = Number(value);
      const numberHopeResult = Number(
        currentMilestones[milestoneIndex].deliverables[deliverableIndex]
          .expected_result
      );
      if (field === "actual_result" && numberValue > numberHopeResult) {
        return { ...currentState };
      }

      return {
        ...currentState,
        milestones: [
          ...currentMilestones.slice(0, milestoneIndex),
          {
            ...currentMilestones[milestoneIndex],
            deliverables: [
              ...currentMilestones[milestoneIndex].deliverables.slice(
                0,
                deliverableIndex
              ),
              {
                ...currentMilestones[milestoneIndex].deliverables[
                  deliverableIndex
                ],
                [field]: value,
              },
              ...currentMilestones[milestoneIndex].deliverables.slice(
                deliverableIndex + 1
              ),
            ],
            status : "E"
          },
          ...currentMilestones.slice(milestoneIndex + 1),
        ],
      };
    },
    confirmChanges : (state,action) => {  
        const currentState = current(state);
        const { milestones: currentMilestones, currentMilestone : milestoneIndex } = currentState;
        const newMilestones = [...currentMilestones];
        newMilestones[milestoneIndex] = {
            ...newMilestones[milestoneIndex],
            status: "A"
        };
        return {
            ...state,
            milestones: newMilestones
        };
    },

    setCurrentMilestone: (state, action) => {
        const currentState = current(state);
        const { milestones: currentMilestones, currentMilestone : milestoneIndex } = currentState;
        
        return currentMilestones[milestoneIndex].status === "E" ? {
            ...state,
            milestones: [
                ...currentMilestones.slice(0, milestoneIndex),
                {
                    ...currentMilestones[milestoneIndex],
                    deliverables: currentMilestones[milestoneIndex].deliverables.map(deliverable => ({
                        ...deliverable,
                        expected_result: 0,
                        actual_result: 0,
                        observations: "",
                        status: "A"
                    })
                  ),
                    status: "P"
                },
                ...currentMilestones.slice(milestoneIndex + 1),
            ],
            currentMilestone: action.payload
        } : {
          ...state, currentMilestone: action.payload
        };

    }
  },
});


export const selectCurrentMilestone = (state) => {
    return state.planning.milestones && state.planning.milestones[state.planning.currentMilestone]
};

export const getPendingMilestoneIndex = (state) => {
  return state.planning.milestones && state.planning.pendingMilestone
}

export const getStatus = (state) => {
  
  const {currentMilestone,milestones} = state.planning;
  return milestones ? milestones[currentMilestone].status : null;
}

export const getMilestonesList = (state) => {
  if(state.planning.milestones){
    return state.planning.milestones.map((milestone,index) => ({
      id: milestone.id,
      name: milestone.name,
      selected : index === state.planning.currentMilestone,
      current: new Date().toISOString().split('T')[0] >= milestone.start_date && new Date().toISOString().split('T')[0] <= milestone.end_date,
      pending: index === state.planning.pendingMilestone,
    }));
  }else{
    return null;
  }
}

export const getCurrentMilestoneIndex = (state) => {
  return state.planning.currentMilestone;
}

export const { setMilestones, changeDeliverable,confirmChanges,setCurrentMilestone } = planningSlice.actions;

export default planningSlice.reducer;
