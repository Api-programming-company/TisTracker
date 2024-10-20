import React, { useEffect } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PlanningItem from "./PlanningItem";
import { setCurrentMilestone } from "../../reducers/planningSlice";
import { getMilestonesList } from "../../reducers/planningSlice";
import { useSelector } from "react-redux";
import { FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { useDispatch } from "react-redux";
import { getStatus } from "../../reducers/planningSlice";
const MilestoneItem = ({ milestone }) => {

  const list = useSelector(getMilestonesList)
  const status = useSelector(getStatus);
  const dispatch = useDispatch();
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };


  const onChangeListItem = (index) => {
    console.log(index);
    dispatch(setCurrentMilestone(index))
  }

  useEffect(() => {
    console.log(list);
  },[list])

  return (
    <div className="list">
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Hito</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={list.find((item) => item.current)}
          label="Hito"
          onChange={(e) => onChangeListItem(list.indexOf(e.target.value))}
        >
          {list.map((item) => (
            <MenuItem key={item.id} value={item}>
              {item.name}
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
    </div>
  );
};

export default MilestoneItem;
