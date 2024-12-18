
import { createContext, useState,useContext, useEffect } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { formatDate } from '../utils/dateFormat';
import { now } from 'moment';

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

  const checkErrors = (end_date) => {
    let isError = false;
    const tis_end_time = new Date(end_date).getTime() + 4*60*60*1000 - 24*60*60*1000;
    const tis_start_time = new Date().getTime()
    console.log(tis_start_time,tis_end_time);
    const updatedMilestones = milestones.map((milestone, index) => {
      const errors = [];
      if (!milestone.name) errors.push({ errorArea: "name", message: "El nombre del hito es requerido" });
      const milestoneNames = milestones.map((milestone) => milestone.name);
      if (milestoneNames.length !== new Set(milestoneNames).size) errors.push({ errorArea: "name", message: "Los nombres de los hitos deben ser unicos" });
      
      if (!milestone.start_date) errors.push({ errorArea: "start_date", message: "La fecha de inicio es requerida" });
      if(milestone.start_date){
        const mil_start_date_time = milestone.start_date ? new Date(milestone.start_date).getTime() : null;
        console.log(mil_start_date_time,"start time");
  
        if (mil_start_date_time < tis_start_time) errors.push({ errorArea: "start_date", message: "La fecha de inicio debe ser mayor que la fecha actual ("
        + new Date( now() + 24 * 60 * 60 * 1000).toLocaleDateString() + ")" });
        
        if (index > 0) {
          const prevMilestone = milestones[index - 1];
          if (!prevMilestone.end_date && mil_start_date_time <= new Date(prevMilestone.end_date).getTime()) {
            errors.push({ errorArea: "start_date", message: `La fecha de inicio debe ser mayor que la fecha de fin del hito anterior` });
          }
        }
      }
      
      
      if (!milestone.end_date) {
        errors.push({ errorArea: "end_date", message: "La fecha de fin es requerida" });
      }else{
        const mil_end_date_time = new Date(milestone.end_date).getTime();
        console.log(mil_end_date_time,"end time");
        if(milestone.start_date){
          if ( mil_end_date_time <= new Date(milestone.start_date).getTime()) errors.push({ errorArea: "end_date", message: "La fecha de fin debe ser mayor que la fecha de inicio" });
        }
        if(tis_end_time){
          if (mil_end_date_time > tis_end_time) errors.push({ errorArea: "end_date", message: "La fecha de fin debe ser menor o igual a la fecha valida indicada en la parte superior. (" 
            + new Date(new Date(end_date).getTime() + 4*60*60*1000 - 24*60*60*1000).toLocaleDateString() +")" });
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
