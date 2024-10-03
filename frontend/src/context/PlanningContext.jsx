// MilestonesContext.js
import { is } from 'date-fns/locale';
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

  const checkErrors = () => {
    let isError = false;
    const updatedMilestones = milestones.map((milestone) => {
      const errors = [];
      if (!milestone.name) errors.push({ errorArea: "name", message: "El nombre del hito es requerido" });
      if (!milestone.start_date) errors.push({ errorArea: "start_date", message: "La fecha de inicio es requerida" });
      if (!milestone.end_date) {
        errors.push({ errorArea: "end_date", message: "La fecha de fin es requerida" });
      }else{
        if (milestone.end_date <= milestone.start_date) errors.push({ errorArea: "end_date", message: "La fecha de fin debe ser mayor que la fecha de inicio" });
      }
      if (!milestone.billing_percentage) errors.push({ errorArea: "billing_percentage", message: "El porcentaje de facturacion es requerido" });
      if (errors.length > 0) {
        isError = true;
        console.log(errors);
        return { ...milestone, errors: errors };
        
      }
      return milestone;

    });
    setMilestones(updatedMilestones);
    return isError;
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
                                      changeMilestones,
                                      checkErrors
                                      }}>
      {children}
    </PlanningContext.Provider>
  );
};


const usePlanningContext = () => {
    return useContext(PlanningContext);
}

export { PlanningContext, usePlanningContext, PlanningProvider };