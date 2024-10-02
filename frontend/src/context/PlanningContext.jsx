// MilestonesContext.js
import { createContext, useState,useContext } from 'react';

const PlanningContext = createContext();

const PlanningProvider = ({ children }) => {
  const [milestones, setMilestones] = useState([]);

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), name: '', start_date: '', end_date: '', billing_percentage: 0, deliverables: [] }]);
  };

  const handleChangeMilestone = (milestoneId, updatedMilestone) => {
    console.log(updatedMilestone,milestoneId);
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, ...updatedMilestone };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  const addDeliverable = (milestoneId, deliverable) => {
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, deliverables: [...milestone.deliverables, deliverable] };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  return (
    <PlanningContext.Provider value={{ milestones, addMilestone, addDeliverable,handleChangeMilestone}}>
      {children}
    </PlanningContext.Provider>
  );
};


const usePlanningContext = () => {
    return useContext(PlanningContext);
}

export { PlanningContext, usePlanningContext, PlanningProvider };