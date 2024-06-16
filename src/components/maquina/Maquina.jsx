import { useNavigate } from "react-router-dom";
import { DataMaquina } from "../stats/DataMaquina";
import { ListaMaquina } from "./ListaMaquina";
import "./maquina.css";
import { useAuth } from "../authentication/AuthenticationContext";

export const Maquina = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();

  if (!token) {
    navigate("/iniciarSesion");
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <ListaMaquina />
      <DataMaquina />
    </div>
  );
};
