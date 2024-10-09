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
        return { ...milestone, ...updatedMilestone, errors: [] };
      }
      return { ...milestone, errors: [] };
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
      const milestoneNames = milestones.map((milestone) => milestone.name);
      if (milestoneNames.length !== new Set(milestoneNames).size) errors.push({ errorArea: "name", message: "Los nombres de los hitos deben ser unicos" });
      
      if (!milestone.start_date) errors.push({ errorArea: "start_date", message: "La fecha de inicio es requerida" });
      if (!milestone.end_date) {
        errors.push({ errorArea: "end_date", message: "La fecha de fin es requerida" });
      }else{
        if (milestone.end_date <= milestone.start_date) errors.push({ errorArea: "end_date", message: "La fecha de fin debe ser mayor que la fecha de inicio" });
      }
      if (!milestone.billing_percentage){
        errors.push({ errorArea: "billing_percentage", message: "El porcentaje de facturacion es requerido" });
      } else{
        if (milestone.billing_percentage < 0 || milestone.billing_percentage > 100) errors.push({ errorArea: "billing_percentage", message: "El porcentaje de facturacion debe estar entre 0 y 100" });
      }
      
      if(milestone.deliverables.length < 1) {
        errors.push({ errorArea: "deliverables", message: "Se requiere al menos un entregable" });
      }else{
        const deliverableNames = milestone.deliverables.map((deliverable) => deliverable.name);
        if (deliverableNames.length !== new Set(deliverableNames).size) {
          errors.push({ errorArea: "deliverables", message: "Los nombres de los entregables deben ser únicos" });
        }
        milestone.deliverables.forEach((deliverable) => {
          if (!deliverable.name) errors.push({ errorArea: "deliverables", message: "El nombre de cada entregable es requerido" });
          else if (deliverable.name.length < 4 || deliverable.name.length > 32) {
            errors.push({ errorArea: "deliverables", message: "El nombre de cada entregable debe tener entre 4 y 32 caracteres" });
          }
        });
      }
      
      if (errors.length > 0) {
        isError = true;
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
        return { ...milestone, errors: [],deliverables: milestone.deliverables.map((deliverable) => {
          if (deliverable.id === deliverableId) {
            return { ...deliverable, ...updatedDeliverable };
          }
          return deliverable;
        }) };
      }
      return {...milestone,errors:[]};
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