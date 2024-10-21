import React, {  useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PlanningItem from "./PlanningItem";
import { setCurrentMilestone } from "../../reducers/planningSlice";
import { getMilestonesList,getCurrentMilestoneIndex,getPendingMilestoneIndex } from "../../reducers/planningSlice";
import { useSelector } from "react-redux";
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { getStatus } from "../../reducers/planningSlice";
import DialogMod from "../DialogMod"
const MilestoneItem = ({ milestone }) => {

  const list = useSelector(getMilestonesList)
  const status = useSelector(getStatus);
  const [open,setOpen] = useState({state : false,value : 0});
  const dispatch = useDispatch();
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };
  const currentMilestoneIndex = useSelector(getCurrentMilestoneIndex);
  const pendingMilestoneIndex = useSelector(getPendingMilestoneIndex);

  const currentMilestone = () => {
    const today = new Date();
    const startDate = new Date(milestone.start_date);
    const endDate = new Date(milestone.end_date);
    return today >= startDate && today <= endDate;
  }


  const handleChangeListItem = (index) => {
    dispatch(setCurrentMilestone(index));
  }
  const onChangeListItem = (index) => {
    if(status === "E") {
      setOpen({state: true, value: index});
    } else {
      handleChangeListItem(index);
    }
  }

  const handleConfirm = () => {
    setOpen({...open, state : false})
    handleChangeListItem(open.value)
  }


  return (
    <div className="list">
      {status !== "A" && (
        currentMilestoneIndex === pendingMilestoneIndex ? ( 
        new Date() > new Date(milestone.end_date) ? (
          <p className="text-red-500 text-sm">
            {`Validación retrasada por ${Math.ceil(
              Math.abs(new Date(milestone.end_date) - new Date()) /
                (1000 * 60 * 60 * 24)
            )} días.`}
          </p>
        ) : (
          <p className="text-sm text-red-500">
            {`Aun quedan ${Math.ceil(
              Math.abs(new Date(milestone.end_date) - new Date()) /
                (1000 * 60 * 60 * 24)
            )} días para la validación de este hito.`}
          </p>
        )):
        <p className="text-sm text-red-500">Debes validar los hitos anteriores para poder validar este</p>
      )}
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hito</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={list.find((item) => item.selected)}
          label="Hito"
          onChange={(e) => onChangeListItem(list.indexOf(e.target.value))}
        >
          {list.map((item,index) => (
            <MenuItem key={item.id} value={item}>
              {item.name} {item.current && <span className="text-sm text-primary">(actual)</span>}
              {item.pending && <span className="text-sm text-red-500">(pendiente)</span>}
              {index < pendingMilestoneIndex && <span className="text-sm text-success">(validado)</span>}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="list-item2">
          <div className="date-item-card">
            <h4 className="text-neutral-700">Fecha de inicio:</h4>
            <p className="text-neutral-500">
              {formatDate(milestone.start_date)}
            </p>
          </div>

          <div className="date-item-card">
            <h4 className="text-neutral-700">Fecha de fin:</h4>
            <p className="text-neutral-500">{formatDate(milestone.end_date)}</p>
          </div>
        </div>

        <div className="list-item2">
          <div className="date-item-card">
            <h4 className="text-neutral-700">Porcentaje de cobro:</h4>{" "}
            <p className="text-neutral-500">{milestone.billing_percentage}%</p>
          </div>
        </div>

        <div className="deliverables-list">
          <h4 className="text-neutral-700">Entregables:</h4>
          <div className="grid header">
            <div className="grid-item">N</div>
            <div className="grid-item">Entregable</div>
            <div className="grid-item">Resultado Esperado</div>
            <div className="grid-item ">Resultado Observado</div>
            <div className="grid-item">Observaciones</div>
            <div className="grid-item">Carry Over</div>
          </div>
          {milestone.deliverables?.length > 0 ? (
            milestone.deliverables.map((deliverable, index) => (
              <PlanningItem
                deliverable={deliverable}
                index={index}
                key={index}
                milestone_id={milestone.id}
              />
            ))
          ) : (
            <p className="text-neutral-500">No hay entregables asignados</p>
          )}
        </div>
      </LocalizationProvider>
      <DialogMod
          open={open.state}
          title="¿Estás seguro de cambiar de hito ahora?"
          content="Tienes cambios sin confirmar y los perderás al cambiar de hito"
          onAccept={handleConfirm}
          onCancel={() => setOpen({ ...open, state: false })}
        />
    </div>
  );
};

export default MilestoneItem;
