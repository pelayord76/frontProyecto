import { DataMaquina } from "../stats/DataMaquina";
import { ListaMaquina } from "./ListaMaquina";
import "./maquina.css";

export const Maquina = () => {
  return (
    <>
      <ListaMaquina />
      <DataMaquina />
    </>
  );
};
