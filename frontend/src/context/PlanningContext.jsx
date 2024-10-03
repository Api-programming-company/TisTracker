// MilestonesContext.js
import { createContext, useState,useContext } from 'react';

const PlanningContext = createContext();

const PlanningProvider = ({ children }) => {
  const [milestones, setMilestones] = useState([]);

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), 
      name: '', 
      start_date: '', 
      end_date: '', 
      billing_percentage: 0, 
      deliverables: [], 
      errors: [] }]);
  };

  //errors Format : {milestoneId: [{errorArea: 'error message'}]}, Ojala usaramos typescript

  const changeMilestones = (updatedMilestones) => {
    updatedMilestones.map((milestone) => {
      return handleChangeMilestone(milestone.id, milestone);
    })
  };

  const handleChangeMilestone = (milestoneId, updatedMilestone) => {
    console.log(milestones);
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, ...updatedMilestone };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  const deleteMilestone = (milestoneId) => {
    const updatedMilestones = milestones.filter((milestone) => milestone.id !== milestoneId);
    setMilestones(updatedMilestones);
  };

  const addDeliverable = (milestoneId) => {
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, deliverables: [...milestone.deliverables,{ id: Date.now(), name: ''}] };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  const changeDeliverable = (milestoneId, deliverableId, updatedDeliverable) => {
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, deliverables: milestone.deliverables.map((deliverable) => {
          if (deliverable.id === deliverableId) {
            return { ...deliverable, ...updatedDeliverable };
          }
          return deliverable;
        }) };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  const deleteDeliverable = (milestoneId, deliverableId) => {
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, deliverables: milestone.deliverables.filter((deliverable) => deliverable.id !== deliverableId) };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  return (
    <PlanningContext.Provider value={{ milestones, 
                                      addMilestone, 
                                      addDeliverable,
                                      handleChangeMilestone,
                                      deleteMilestone,
                                      changeDeliverable,
                                      deleteDeliverable,
                                      changeMilestones
                                      }}>
      {children}
    </PlanningContext.Provider>
  );
};


const usePlanningContext = () => {
    return useContext(PlanningContext);
}

export { PlanningContext, usePlanningContext, PlanningProvider };