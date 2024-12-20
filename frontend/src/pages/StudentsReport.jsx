import React, { useEffect, useState } from "react";
import { Container, CircularProgress,Box } from "@mui/material";
import { useGetGradesQuery } from "../api/userApi";
import { useParams } from "react-router-dom";
import ReportTemplate from "../components/ReportTemplate";
import BackBtn from "../components/navigation/BackBtn";

const formatGradesData = (grades) => {
    return grades
        .map((grade) => {
            const autoevaluacion = parseInt(grade.company.auto_evaluation_score, 10);
            const cruzada = parseInt(grade.company.cross_evaluation_score, 10);
            const pares = parseInt(grade.pares, 10);
            const planificacion = parseInt(grade.company.planning_score, 10);

            const totalEvaluations = Math.round(
                (autoevaluacion + pares + cruzada) / 3
            );
            const total = Math.round(
                (totalEvaluations * 40) / 100 + (planificacion * 60) / 100
            );

            return {
                Apellidos: grade.apellidos,
                Nombre: grade.nombre,
                "Grupo Empresa": grade.company.short_name,
                Autoevaluación: autoevaluacion,
                Cruzada: cruzada,
                Pares: pares,
                Planificación: planificacion,
                Evaluaciones: totalEvaluations,
                Total: total,
            };
        })
        .sort(
            (a, b) =>
                a.Apellidos.localeCompare(b.Apellidos) ||
                a.Nombre.localeCompare(b.Nombre)
        )
        .map((grade, index) => ({ Número: index + 1, ...grade }));
};

const StudentsReport = () => {
    const { id } = useParams();
    const {
        data: grades,
        error: gradesError,
        isFetching: isGradesFetching,
        isSuccess: isGradesSucess,
        isError: isGradesError,
    } = useGetGradesQuery({ academic_period_id: id, limit: 15 });

    useEffect(() => {
        if (isGradesSucess) {
            console.log(grades);
            const formattedData = formatGradesData(grades.grades); // Formatear los datos
            setFinalData(formattedData); // Establecer los datos formateados
            console.log(formattedData);
        }
        if (isGradesError) {
            console.error(gradesError);
        }
    }, [grades, gradesError, isGradesSucess, isGradesError]);

    const [finalData, setFinalData] = useState([]);

    if (isGradesFetching) {
        return (
            <Container
                maxWidth="sm"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh",
                }}
            >
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Box>
            <BackBtn url={`/academic-periods/docente-home/${id}`}/>
            < ReportTemplate
            data={finalData}
            title={"Reporte de calificaciones de estudiante"}
            filename={"calificaciones_de_estudiantes"}
        />
        </Box>
        
    );
};

export default StudentsReport;
