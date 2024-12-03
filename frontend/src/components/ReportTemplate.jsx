import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import GridComponent from "./GridComponent";
import { downloadCsv } from "../utils/toCsv";
import generatePDF from "react-to-pdf";
import { getOptions } from "../utils/pdfOptions";

const ReportTemplate = ({ data, title, filename }) => {
    const options = getOptions(filename);
    const targetRef = useRef();

    return (
        <Box
            width="100%"
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
            padding="2rem 5rem"
            gap="2rem"
        >
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                gap="1rem"
                ref={targetRef}
            >
                <Typography variant="h4">{title}</Typography>
                {data.length > 0 && (
                    <GridComponent values={data}></GridComponent>
                )}
                {data.length === 0 && (
                    <Typography variant="h6" color="error">
                        No hay calificaciones para mostrar.
                    </Typography>
                )}
            </Box>
            {data.length > 0 && (
                <Box display="flex" gap="1rem">
                    <Button
                        onClick={() => downloadCsv(data, filename)}
                        sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                        }}
                    >
                        Descargar como csv
                    </Button>
                    <Button
                        onClick={() => generatePDF(targetRef, options)}
                        sx={{
                            backgroundColor: "primary.main",
                            color: "white",
                        }}
                    >
                        Descargar como pdf
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default ReportTemplate;
