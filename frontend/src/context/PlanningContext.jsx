// MilestonesContext.js
import { createContext, useState,useContext } from 'react';

const MilestonesContext = createContext();

const MilestonesProvider = ({ children }) => {
  const [milestones, setMilestones] = useState([]);

  const addMilestone = (milestone) => {
    setMilestones([...milestones, milestone]);
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
    <MilestonesContext.Provider value={{ milestones, addMilestone, addDelivery }}>
      {children}
    </MilestonesContext.Provider>
  );
};


const usePlanningContext = () => {
    return useContext(MilestonesContext);
}
export { MilestonesProvider, MilestonesContext, usePlanningContext };