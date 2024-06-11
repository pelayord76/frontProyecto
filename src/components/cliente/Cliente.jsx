import { ListaCliente } from "./ListaCliente";
import { DataCliente } from "../stats/DataCliente";

export const Cliente = () => {
  return (
    <div style={{ maxWidth: "100%" }}>
      <ListaCliente />
      <DataCliente />
    </div>
  );
};
