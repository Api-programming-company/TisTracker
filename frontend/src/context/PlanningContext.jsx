
import { createContext, useState,useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const PlanningContext = createContext();

const PlanningProvider = ({ children }) => {
  const [milestones, setMilestones] = useState([]);
  const [tisGroup, setTisGroup] = useState({}); 

  useEffect(() => {
    const cachedTisGroup = JSON.parse(localStorage.getItem('tisGroup'));
    if (cachedTisGroup && !Object.values(tisGroup).length) {
      setTisGroup(cachedTisGroup);
    }
    console.log(tisGroup,"Tis Group");
  },[tisGroup])

  const addMilestone = () => {
    setMilestones([...milestones, { id: Date.now(), 
      name: '', 
      start_date: '', 
      end_date: '', 
      billing_percentage: 0, 
      deliverables: [], 
      errors: [],
      isNew : true }]);
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
        return { ...milestone, deliverables: [...milestone.deliverables,{ id: Date.now(), name: '', expected_result: 0, actual_result: 0, observations: '', status: 'A', created_by: 'E',isNew: true}] };
      }
      return milestone;
    });
    setMilestones(updatedMilestones);
  };

  const checkErrors = () => {
    let isError = false;
    const updatedMilestones = milestones.map((milestone, index) => {
      const errors = [];
      if (!milestone.name) errors.push({ errorArea: "name", message: "El nombre del hito es requerido" });
      const milestoneNames = milestones.map((milestone) => milestone.name);
      if (milestoneNames.length !== new Set(milestoneNames).size) errors.push({ errorArea: "name", message: "Los nombres de los hitos deben ser unicos" });
      
      if (!milestone.start_date) errors.push({ errorArea: "start_date", message: "La fecha de inicio es requerida" });
      if (milestone.start_date && milestone.start_date < tisGroup.start_date) errors.push({ errorArea: "start_date", message: "La fecha de inicio debe ser mayor o igual que la fecha de inicio del grupo TIS ("
      + format(tisGroup.start_date, 'dd/MM/yyyy') + ")" });
      
      if (index > 0) {
        const prevMilestone = milestones[index - 1];
        if (milestone.start_date <= prevMilestone.end_date) {
          errors.push({ errorArea: "start_date", message: `La fecha de inicio debe ser mayor que la fecha de fin del hito anterior` });
        }
      }
      
      if (!milestone.end_date) {
        errors.push({ errorArea: "end_date", message: "La fecha de fin es requerida" });
      }else{
        if (milestone.end_date <= milestone.start_date) errors.push({ errorArea: "end_date", message: "La fecha de fin debe ser mayor que la fecha de inicio" });
        if (milestone.end_date > tisGroup.end_date) errors.push({ errorArea: "end_date", message: "La fecha de fin debe ser menor o igual que la fecha de fin del grupo TIS (" 
        + format(tisGroup.end_date, 'dd/MM/yyyy') + ")" });
        const endDay = format(milestone.end_date, 'i');
        if (index > 0) {
          const prevMilestone = milestones[index - 1];
          if (endDay !== format(prevMilestone.end_date, 'i')) {
            const endDayName = format(prevMilestone.end_date, 'EEEE', { locale: es });
            errors.push({ errorArea: "end_date", message: `La fecha de fin debe ser el mismo dia que la fecha de fin del hito anterior (${endDayName})` });
          }
        }
      }
      if (!milestone.billing_percentage){
        errors.push({ errorArea: "billing_percentage", message: "El porcentaje de facturacion es requerido" });
      } else{
        if (milestone.billing_percentage < 0 || milestone.billing_percentage > 100) errors.push({ errorArea: "billing_percentage", message: "El porcentaje de facturacion debe estar entre 1 y 100" });
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
          else if (deliverable.name.length < 4 || deliverable.name.length > 64) {
            errors.push({ errorArea: "deliverables", message: "El nombre de cada entregable debe tener entre 4 y 64 caracteres" });
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
                                      setMilestones,
                                      addMilestone, 
                                      addDeliverable,
                                      handleChangeMilestone,
                                      deleteMilestone,
                                      changeDeliverable,
                                      deleteDeliverable,
                                      changeMilestones,
                                      checkErrors,
                                      setTisGroup
                                      }}>
      {children}
    </PlanningContext.Provider>
  );
};


const usePlanningContext = () => {
    return useContext(PlanningContext);
}

export { PlanningContext, usePlanningContext, PlanningProvider };
