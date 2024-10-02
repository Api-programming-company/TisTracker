// MilestonesContext.js
import { createContext, useState,useContext } from 'react';

const PlanningContext = createContext();

const PlanningProvider = ({ children }) => {
  const [milestones, setMilestones] = useState([]);

  const addMilestone = (milestone) => {
    setMilestones([...milestones, milestone]);
  };

  const handleChangeMilestone = (milestoneId, updatedMilestone) => {
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, ...updatedMilestone };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  const addDelivery = (milestoneId, delivery) => {
    const updatedMilestones = milestones.map((milestone) => {
      if (milestone.id === milestoneId) {
        return { ...milestone, deliveries: [...milestone.deliveries, delivery] };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  return (
    <PlanningContext.Provider value={{ milestones, addMilestone, addDelivery,test : "test" }}>
      {children}
    </PlanningContext.Provider>
  );
};


const usePlanningContext = () => {
    return useContext(PlanningContext);
}

export { PlanningContext, usePlanningContext, PlanningProvider };