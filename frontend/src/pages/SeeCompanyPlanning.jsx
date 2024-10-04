import React from 'react'
import {data} from "../mock_objects/planificacion";	
import SeeMilestone from "../components/planning/SeeMilestone";

const SeeCompanyPlanning = () => {
  return (
    <div className='container' id='conpanyPlanning'>
        <div className="section-header">
            <h1>Planificación de grupo empresa</h1>
            <h4 className='text-neutral-500'>Agile programming Innovators</h4>
        </div>
        <div className="planning-body">
            <div className="milestones">
                {data.map((milestone) => (
                    <SeeMilestone key={milestone.id} milestone={milestone} />
                ))}
            </div>   
        </div>
    </div>
  )
}

export default SeeCompanyPlanning
