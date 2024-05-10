import { useEffect, useState } from "react";

export const ListaCliente = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4040/cliente", {
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

  return <div>ListaCliente</div>;
};
