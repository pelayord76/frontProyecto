import { useEffect, useState } from "react";

export const ListaRecaudaciones = () => {
  const [recaudaciones, setRecaudaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:4040/rfsAdmin/recaudacion",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setRecaudaciones(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return <div>ListaRecaudaciones</div>;
};
