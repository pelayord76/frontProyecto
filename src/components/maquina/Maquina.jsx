import { DataMaquina } from "../stats/DataMaquina";
import { ListaMaquina } from "./ListaMaquina";
import "./maquina.css";

export const Maquina = () => {
  return (
    <div style={{ maxWidth: "100%" }}>
      <ListaMaquina />
      <DataMaquina />
    </div>
  );
};
