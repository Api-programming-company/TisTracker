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

      let currentMilestone = tempMilestones.findIndex(
        (milestone) => milestone.status === "P"
      );
    
      return { milestones: tempMilestones , 
        currentMilestone : currentMilestone === -1 ? 0 : currentMilestone, 
        pendingMilestone: currentMilestone === -1 ? 10000: currentMilestone 
      };
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

      const newDeliverable = {...currentMilestones[milestoneIndex].deliverables[deliverableIndex]};

      const numberValue = Number(value);
      const numberHopeResult = Number(
        currentMilestones[milestoneIndex].deliverables[deliverableIndex]
          .expected_result
      );
      if (field === "actual_result" && numberValue > numberHopeResult) {
        return { ...currentState };
      }

      if (field === "expected_result" && numberValue < newDeliverable.actual_result) {
        newDeliverable.actual_result = value;
      }


      newDeliverable[field] = value;

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
                ...newDeliverable
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
    addDeliverable: (state, action) => {
      console.log("Adding deliverable...",action);
      return{
        ...state,
        milestones: state.milestones.map((milestone, index) =>
          milestone.id === action.payload.milestone_index
            ? {
                ...milestone,
                deliverables: [
                  ...milestone.deliverables,
                  {
                    id: milestone.deliverables.length,
                    name: "",
                    expected_result: 0,
                    actual_result: 0,
                    observations: "",
                    status: "A",
                    created_by: "D", 
                 },
                ],
                status : "E"
              }
            : milestone
        ),
      }
    },

    removeDeliverable: (state, action) => {
      console.log("Removing deliverable...",action);
      return{
        ...state,
        milestones: state.milestones.map((milestone) =>
          milestone.id === action.payload.milestone_index
            ? {
                ...milestone,
                deliverables: milestone.deliverables.filter(
                  (deliverable) => deliverable.id !== action.payload.deliverable_id
                ),
                status : "E"
              }
            : milestone
        ),
      }
    },

    changeDeliverableName: (state, action) => {
      return {
        ...state,
        milestones: state.milestones.map((milestone) =>
          milestone.id === action.payload.milestone_id
            ? {
                ...milestone,
                deliverables: milestone.deliverables.map((deliverable) =>
                  deliverable.id === action.payload.deliverable_id
                    ? {
                        ...deliverable,
                        name: action.payload.name,
                      }
                    : deliverable
                ),
                status : "E"
              }
            : milestone
        ),
      }
    },
    confirmChanges: (state, action) => {
      
        const currentState = current(state);
        const { milestones: currentMilestones, currentMilestone: milestoneIndex } = currentState;
        if(currentMilestones[milestoneIndex].status !== "L"){
          return {
            ...state,
            milestones: currentMilestones.map((milestone, index) =>
              index === milestoneIndex ? { ...milestone, status: "L" } : milestone
            ),
          };
        }
        const newMilestones = [...currentMilestones];
        const milestone = newMilestones[milestoneIndex];
        const deliverablesPending = milestone.deliverables.filter(
          (deliverable) => deliverable.status === "C"
        );
        if (milestoneIndex + 1 < newMilestones.length) {
          const nextMilestone = newMilestones[milestoneIndex + 1];
          const newDeliverables = nextMilestone.deliverables.concat(
            deliverablesPending.map((deliverable,i) => ({
              ...deliverable,
              id: nextMilestone.deliverables.length + i,
              status: "A",
              name : deliverable.name,
              expected_result : 0,
              actual_result : 0,
              observations : "",
            }))
          );
          newMilestones[milestoneIndex + 1] = {
            ...nextMilestone,
            deliverables: newDeliverables,
          };
        }
        newMilestones[milestoneIndex] = {
          ...milestone,
          status: "A",
        };
        return {
          ...state,
          milestones: newMilestones,
          pendingMilestone: state.pendingMilestone+1
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
      pending: index === state.planning.pendingMilestone && milestone.end_date < new Date(),

    }));
  }else{
    return null;
  }
}

export const getCurrentMilestoneIndex = (state) => {
  return state.planning.currentMilestone;
}

export const { setMilestones, changeDeliverable,addDeliverable,removeDeliverable,changeDeliverableName,confirmChanges,setCurrentMilestone } = planningSlice.actions;

export default planningSlice.reducer;
