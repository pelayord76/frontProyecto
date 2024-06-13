import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ marginLeft: "2%", marginTop: "2%" }}>
      <h1>Error 404</h1>
      <h3>Ruta no encontrada</h3>
      <p>La ruta que buscabas no existe</p>
      <Button color="primary" onClick={handleBack}>
        Volver al inicio
      </Button>
    </div>
  );
};
