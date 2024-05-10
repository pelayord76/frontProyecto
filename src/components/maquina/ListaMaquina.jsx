import { useEffect, useState } from "react";

export const ListaMaquina = () => {

const [maquinas, setMaquinas] = useState([]);

useEffect(() => {
  const fetchData = async () => {
    const response = await fetch("http://localhost:4040/maquina", {
      headers: {
        Accept: "application/json",
      },
    });
    const data = await response.json();
    setMaquinas(data);
    console.log(data);
  };
  fetchData();
}, []);

  return (
    <div>ListaMaquina</div>
  )
}
