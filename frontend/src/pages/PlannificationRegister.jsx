import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const PlannificationRegister = () => {
    const { id } = useParams();
    return (
        <Box>
            {id}
        </Box>
    );
}

export default PlannificationRegister;
