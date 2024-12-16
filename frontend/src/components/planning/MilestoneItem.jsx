import React, {  useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import PlanningItem from "./PlanningItem";
import { setCurrentMilestone } from "../../reducers/planningSlice";
import { getMilestonesList,getCurrentMilestoneIndex,getPendingMilestoneIndex } from "../../reducers/planningSlice";
import { useSelector } from "react-redux";
import { FormControl,InputLabel,Select,MenuItem,Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { getStatus } from "../../reducers/planningSlice";
import DialogMod from "../DialogMod"
import { MdAssignmentLate } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import PlanningInfoMessage from "./PlanningInfoMessage";
import { formatDate } from "../../utils/dateFormat";


const headers = ["N","Entregable","Tipo","Resultado Esperado", "Resultado Observado","Observaciones", "Carry Over"]
const MilestoneItem = ({ milestone }) => {
  const navigate = useNavigate();
  const params = useParams();
  const list = useSelector(getMilestonesList)
  const status = useSelector(getStatus);
  const [open,setOpen] = useState({state : false,value : 0});
  const dispatch = useDispatch();

  const currentMilestoneIndex = useSelector(getCurrentMilestoneIndex);
  const pendingMilestoneIndex = useSelector(getPendingMilestoneIndex);



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


  const handleNavigate = () => {
    navigate(`/weekly_tracking/${params.id}`);
  }



  return (
    <div className="list">
      <PlanningInfoMessage status={status} currentMilestoneIndex={currentMilestoneIndex} pendingMilestoneIndex={pendingMilestoneIndex} milestone={milestone}/>
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
              {index === pendingMilestoneIndex  && <span className={`text-sm ${item.pending ? "text-primary" : "text-red-500"}`}>
                { "(pendiente)"}
                </span>}
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
          {milestone.deliverables?.length > 0 && milestone.deliverables.findIndex((deliverable) => deliverable.created_by === "D") !== -1 ? (
          <div className="planning-grid">
            {headers.map((header,index) => <Box key={index} className="grid-item" sx={{backgroundColor: "info.gray"}}>{header}</Box>)}
            {milestone.deliverables.filter((deliverable) => deliverable.created_by === "D").map((deliverable, index) => (
              <PlanningItem
                deliverable={deliverable}
                index={index}
                key={index}
                milestone_id={milestone.id}
              />))}
            </div>
          ) :(
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '1rem' }}>
              <i><MdAssignmentLate size={48} color="gray" /></i>
              <p className="text-neutral-500"> Al parecer aún no se realizó un seguimiento semanal de este hito.</p>
              <Button variant="contained" disabled={currentMilestoneIndex !== pendingMilestoneIndex} onClick={handleNavigate}>Realizar seguimiento semanal</Button>
            </Box>
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