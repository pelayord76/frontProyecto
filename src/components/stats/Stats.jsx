import { DataCliente } from "./DataCliente";
import { DataMaquina } from "./DataMaquina";
import { ClientesMasIngresos } from "./ClientesMasIngresos";
import { ClientesMenosIngresos } from "./ClientesMenosIngresos";
import { MaquinasQueVencen } from "./MaquinasQueVencen";
import { ClientesQueVencen } from "./ClientesQueVencen";
import "./stats.css";
import { useAuth } from "../authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export const Stats = () => {
  const token = useAuth().getToken();
  const navigate = useNavigate();

  if (!token) {
    navigate("/iniciarSesion");
  }

  return (
    <div
      style={{
        marginLeft: "5%",
        marginRight: "5%",
        marginTop: "1%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="charts">
        <DataCliente />
        <DataMaquina />
      </div>

      <div className="clientes">
        <ClientesMasIngresos />
        <ClientesMenosIngresos />
      </div>

      <div className="fechas">
        <MaquinasQueVencen />
        <ClientesQueVencen />
      </div>
    </div>
  );
};
