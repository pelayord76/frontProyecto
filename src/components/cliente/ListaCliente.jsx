import { useEffect, useState } from "react";
// import DataGridCliente from "./DataGrid";

export const ListaCliente = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4040/rfsAdmin/cliente", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setClientes(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return <></>/*<DataGridCliente/>*/;
};
