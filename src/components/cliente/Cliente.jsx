import { ListaCliente } from "./ListaCliente";
import { DataCliente } from "../stats/DataCliente";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthenticationContext";

export const Cliente = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();

  if (!token) {
    navigate("/iniciarSesion");
  }

  return (
    <div style={{ maxWidth: "100%" }}>
      <ListaCliente />
      <DataCliente />
    </div>
  );
};
