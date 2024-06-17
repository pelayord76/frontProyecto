import { DataCliente } from "./DataCliente";
import { DataMaquina } from "./DataMaquina";
import { ClientesMasIngresos } from "./ClientesMasIngresos";
import { ClientesMenosIngresos } from "./ClientesMenosIngresos";
import { MaquinasQueVencen } from "./MaquinasQueVencen";
import { ClientesQueVencen } from "./ClientesQueVencen";
import "./stats.css";

export const Stats = () => {
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
