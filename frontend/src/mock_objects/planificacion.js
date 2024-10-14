import { formatDate } from "../utils/validaciones";

const data = {
    planning: {

    milestones: [
    {
        id : 1,
        name: 'Hito 1',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '2022-01-31',
        billing_percentage: 20,
        deliverables: [
            {
                id: 1,
                name: 'Codigo funcional de Ver planificacion'
            },
            {
                id: 2,
                name: 'Script de la base de datos'
            },
            {
                id:3,
                name: "Manual de usuario parcial"
            },
            {
                id: 4,
                name: 'Mockups'
            },
            {
                id: 5,
                name: 'Modelo de la base de datos'
            },
            {
                id: 6,
                name: 'Documento de sprint backlog'
            }
        ]
    },
    {
        id : 2,
        name: 'Hito 2',
        start_date: '2022-01-01',
        end_date: '2022-01-28',
        billing_percentage: 30,
        deliverables: [
            {
                id: 3,
                name: 'Sprint 2'
            },
            {
                id: 4,
                name: 'Documento de sprint 2'
            },
            {
                id: 5,
                name: 'Script de la base de datos'
            },
            {
                id: 6,
                name: 'Entregable 2.2'
            },
        ]
    },
    {
        id : 3,
        name: 'Hito 3',
        start_date: '2022-03-01',
        end_date: '2022-03-31',
        billing_percentage: 40,
        deliverables: [
            {
                id: 5,
                name: 'Entregable 3.1'
            },
            {
                id: 6,
                name: 'Entregable 3.2'
            },
        ]
    },
    {
        id : 4,
        name: 'Hito 4',
        start_date: '2022-04-01',
        end_date: '2022-04-30',
        billing_percentage: 50,
        deliverables: [
            {
                id: 7,
                name: 'Entregable 4.1'
            },
            {
                id: 8,
                name: 'Entregable 4.2'
            },
        ]
    },
    {
        id : 5,
        name: 'Hito 5',
        start_date: '2022-05-01',
        end_date: '2022-05-31',
        billing_percentage: 60,
        deliverables: [
            {
                id: 9,
                name: 'Entregable 5.1'
            },
            {
                id: 10,
                name: 'Entregable 5.2'
            },
        ]
    },
]
}}

const planningSpreadsheet = {
    planning: {

    milestones: [
    {
        id : 1,
        name: 'Hito 1',
        start_date: '2024-07-01',
        end_date: '2024-07-30',
        billing_percentage: 20,
        deliverables: [
            {
                id: 1,
                name: 'Codigo funcional de Ver planificacion',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 2,
                name: 'Script de la base de datos',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id:3,
                name: "Manual de usuario parcial",
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 4,
                name: 'Mockups',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 5,
                name: 'Modelo de la base de datos',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 6,
                name: 'Documento de sprint backlog',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            }
        ]
    },
    {
        id : 2,
        name: 'Hito 2',
        start_date: '2024-08-01',
        end_date: '2024-08-30',
        billing_percentage: 30,
        deliverables: [
            {
                id: 3,
                name: 'Sprint 2',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 4,
                name: 'Documento de sprint 2',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 5,
                name: 'Script de la base de datos',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 6,
                name: 'Entregable 2.2',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
        ]
    },
    {
        id : 3,
        name: 'Hito 3',
        start_date: '2024-09-01',
        end_date: '2024-09-30',
        billing_percentage: 40,
        deliverables: [
            {
                id: 5,
                name: 'Entregable 3.1',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 6,
                name: 'Entregable 3.2',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
        ]
    },
    {
        id : 4,
        name: 'Hito 4',
        start_date: '2024-10-01',
        end_date: '2024-10-30',
        billing_percentage: 50,
        deliverables: [
            {
                id: 7,
                name: 'Entregable 4.1',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 8,
                name: 'Entregable 4.2',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
        ]
    },
    {
        id : 5,
        name: 'Hito 5',
        start_date: '2024-11-01',
        end_date: '2024-11-30',
        billing_percentage: 60,
        deliverables: [
            {
                id: 9,
                name: 'Entregable 5.1',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
            {
                id: 10,
                name: 'Entregable 5.2',
                observedResult: 0,
                hopeResult: 0,
                state: "A"
            },
        ]
    },
]
}
}


export {data,planningSpreadsheet};