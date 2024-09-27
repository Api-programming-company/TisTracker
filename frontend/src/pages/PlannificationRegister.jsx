import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import CompanyPlanning from "../components/company/CompanyPlanning";
import { useState } from "react";

const PlannificationRegister = () => {
  const jsonData = {
    message: "Compañía obtenida correctamente.",
    company: {
      id: 1,
      long_name: "api company",
      short_name: "api",
      email: "apiagrile@gmail.com",
      address: "direccion company 1",
      phone: "123456789",
      academic_period_id: 1,
      created_at: "2024-09-19T23:39:17.000000Z",
      updated_at: "2024-09-21T02:37:41.000000Z",
      status: "A",
      members: [],
      planning: {
        id: 2,
        name: "New Planning",
        company_id: 1,
        created_at: "2024-09-22T19:08:30.000000Z",
        updated_at: "2024-09-22T19:08:30.000000Z",
        milestones: [
          {
            id: 1,
            name: "Hito 1 para planificación",
            start_date: "2024-09-25",
            end_date: "2024-10-10",
            billing_percentage: "20.00",
            planning_id: 2,
            created_at: "2024-09-22T19:08:30.000000Z",
            updated_at: "2024-09-24T02:10:02.000000Z",
            deliverables: [
              {
                id: 9,
                name: "Nuevo Entregable",
                responsible: "test",
                objective: "testh",
                milestone_id: 1,
                created_at: "2024-09-23T04:49:29.000000Z",
                updated_at: "2024-09-23T04:55:58.000000Z",
              },
              {
                id: 1,
                name: "Entregable 1",
                responsible: "John Doe",
                objective: "Complete the design",
                milestone_id: 1,
                created_at: "2024-09-22T19:08:31.000000Z",
                updated_at: "2024-09-24T02:10:03.000000Z",
              },
              {
                id: 10,
                name: "Entregable 2",
                responsible: "test",
                objective: "test",
                milestone_id: 1,
                created_at: "2024-09-23T04:49:30.000000Z",
                updated_at: "2024-09-24T02:10:04.000000Z",
              },
            ],
          },
        ],
      },
      academic_period: {
        id: 1,
        name: "gestion boris",
        start_date: "2024-09-01",
        end_date: "2024-12-15",
        description: "cursos de boris",
        user_id: 5,
        created_at: "2024-09-17T03:51:47.000000Z",
        updated_at: "2024-09-17T03:51:47.000000Z",
        creator: {
          id: 5,
          email: "boris@fcyt.umss.edu.bo",
          email_verified_at: "2024-09-17T02:52:42.000000Z",
          created_at: "2024-09-17T02:51:57.000000Z",
          updated_at: "2024-09-17T02:51:57.000000Z",
          user_type: "D",
          first_name: "BORIS MARCELO",
          last_name: "CALANCHA NAVIA",
          academic_period_id: null,
        },
      },
    },
    user_permission: null,
  };
  const { id } = useParams();
  const [formData, setFormData] = useState({
    milestones: [],
  });
  const [sendData, setSendData] = useState({
    milestones: [],
  });
  return (
    <CompanyPlanning
      milestones={jsonData.company.planning.milestones}
      setFormData={setFormData}
      setSendData={setSendData}
    />
  );
};

export default PlannificationRegister;
