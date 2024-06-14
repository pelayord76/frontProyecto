import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EnDesarrollo = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div style={{ marginLeft: "2%", marginTop: "2%" }}>
      <h1>... vaya</h1>
      <h3>Aún estamos trabajando en esto</h3>
      <Button color="primary" onClick={handleBack}>
        Volver
      </Button>
    </div>
  );
};
