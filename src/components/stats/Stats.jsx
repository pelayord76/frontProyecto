import { DataCliente } from "./DataCliente";
import { DataMaquina } from "./DataMaquina";
import { ClientesMasIngresos } from "./ClientesMasIngresos";
import { ClientesMenosIngresos } from "./ClientesMenosIngresos";
import { MaquinasQueVencen } from "./MaquinasQueVencen";
import { ClientesQueVencen } from "./ClientesQueVencen";

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
      <div
        style={{
          display: "flex",
        }}
      >
        <DataCliente />
        <DataMaquina />
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <ClientesMasIngresos />
        <ClientesMenosIngresos />
      </div>

      <div
        style={{
          display: "flex",
        }}
      >
        <MaquinasQueVencen />
        <ClientesQueVencen />
      </div>
    </div>
  );
};
