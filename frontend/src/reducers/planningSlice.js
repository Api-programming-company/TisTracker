import { createSlice, current } from "@reduxjs/toolkit";
import { data, planningSpreadsheet } from "../mock_objects/planificacion";

const initialState = planningSpreadsheet.planning.milestones;

export const planningSlice = createSlice({
  name: "planning",
  initialState,
  reducers: {
    setMilestones: (state, action) => {
      console.log("Setting");
      const tempMilestones = JSON.parse(JSON.stringify(action.payload));
      tempMilestones.forEach((milestone) => {
        milestone.deliverables.forEach((deliverable) => {
          deliverable.hopeResult = 0;
          deliverable.observedResult = 0;
          deliverable.observations = "";
          deliverable.state = "A";
        });
        milestone.status = "P"
      });

      const today = new Date().toISOString().split("T")[0];
      const currentMilestone = tempMilestones.findIndex(
        (milestone) =>
          milestone.start_date <= today && milestone.end_date >= today
      );
      console.log(tempMilestones,currentMilestone);
      return { milestones: tempMilestones , currentMilestone };
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
        const { milestones: currentMilestones } = currentState;
        const milestoneIndex = currentMilestones.findIndex(
            (milestone) => milestone.id === state.currentMilestone
        );
        return {
            ...state,
            milestones: [
                ...currentMilestones.slice(0, milestoneIndex),
                {
                    ...currentMilestones[milestoneIndex],
                    status: "V"
                },
                ...currentMilestones.slice(milestoneIndex + 1),
            ]
        };
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
  console.log(state.planning);
    return state.planning.milestones && state.planning.milestones[state.planning.currentMilestone]
};

export const getStatus = (state) => {
  
  const {currentMilestone,milestones} = state.planning;
  return currentMilestone ? milestones[currentMilestone].status : null;
}

export const getMilestonesList = (state) => {
  if(state.planning.milestones){
    return state.planning.milestones.map((milestone,index) => ({
      id: milestone.id,
      name: milestone.name,
      current : index === state.planning.currentMilestone
    }));
  }else{
    return null;
  }
    

}


export const { setMilestones, changeDeliverable,confirmChanges,setCurrentMilestone } = planningSlice.actions;

export default planningSlice.reducer;
