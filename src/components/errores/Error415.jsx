import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Error415 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div style={{ marginLeft: "2%", marginTop: "2%" }}>
      <h1>Error 415</h1>
      <h3>No tienes permisos para realizar esa acción</h3>
      <Button color="primary" onClick={handleBack}>
        Volver
      </Button>
    </div>
  );
};
