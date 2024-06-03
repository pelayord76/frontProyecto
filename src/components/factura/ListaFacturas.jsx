import { useEffect, useState } from "react";

export const ListaFacturas = () => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4040/rfsAdmin/factura", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setFacturas(data);
    };
    fetchData();
  }, []);

  return <div>ListaFacturas</div>;
};
