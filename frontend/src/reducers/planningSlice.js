import { createSlice, current } from "@reduxjs/toolkit";
import { data, planningSpreadsheet } from "../mock_objects/planificacion";

const initialState = planningSpreadsheet.planning.milestones;

export const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setMilestones: (state, action) => {
      const tempMilestones = JSON.parse(JSON.stringify(action.payload));
      tempMilestones.forEach((milestone) => {
        milestone.deliverables.forEach((deliverable) => {
          deliverable.hopeResult = 0;
          deliverable.observedResult = 0;
          deliverable.observations = "";
          deliverable.state = "A";
        });
      });
      return { status: "S", milestones: tempMilestones , currentMilestone : -1 };
    },

    changeDeliverable: (state, action) => {
      const { milestone_id, id, field, value } = action.payload;
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
          .hopeResult
      );
      if (field === "observedResult" && numberValue > numberHopeResult) {
        return { ...currentState };
      }

      return {
        ...currentState,
        status: "E",
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
          },
          ...currentMilestones.slice(milestoneIndex + 1),
        ],
      };
    },
    confirmChanges : (state,action) => {
        console.log("dispatching");
        return{
            ...state,
            status : "C"
        }
    },
    setCurrentMilestone: (state, action) => {
        return {
            ...state,
            currentMilestone: action.payload
        };

    }
  },
});


export const selectCurrentMilestone = (state) => {
  console.log(state);
  if(state.planning.currentMilestone === -1){
      const today = new Date().toISOString().split("T")[0];
    if (state.planning.milestones) {
      return state.planning.milestones.find(
        (milestone) =>
          milestone.start_date <= today && milestone.end_date >= today
      );
    } else {
      return null;
    }
  }else{
    return state.planning.milestones.find(
      (milestone) => milestone.id === state.planning.currentMilestone
    );
  } 
  
};

export const getStatus = (state) => {
    return state.planning.status && state.planning.status;
}

export const getMilestonesList = (state) => {
  
    return state.planning.milestones.map(milestone => ({
      id: milestone.id,
      name: milestone.name,
    }));

}


export const { setMilestones, changeDeliverable,confirmChanges,setCurrentMilestone } = planningSlice.actions;

export default planningSlice.reducer;
