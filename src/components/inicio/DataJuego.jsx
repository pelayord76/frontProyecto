import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

export function DataJuego() {
  const [clientes, setClientes] = useState([["Local", "Cantidad Recaudada"]]);

  const options = {
    title: "Distribución ",
    pieHole: 0.4,
    is3D: false,
    colors: [
      "#0000FF",
      "#FFD100",
      "#1515E8",
      "#E6C017",
      "#2626D1",
      "#3F3F8B",
      "#99883D",
      "#3B3BA2",
      "#B39C36",
      "#3333B9",
      "#CCAE29",
      "#33322E",
      "#2A2A33",
      "#333129",
      "#333346",
      "#4D4836",
      "#3B3B5D",
      "#665F3D",
      "#3F3F73",
      "#807440",
    ],
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "http://localhost:4040/cliente/data/juego",
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      // Transforma los datos a la estructura correcta (array de arrays)
      const transformedData = data.map((item) => [
        item.local,
        item.porcentajeDeJuego,
      ]);
      setClientes([["Local", "Porcentaje de juego"], ...transformedData]); // Limpia el estado antes de agregar los nuevos datos para que no se ejecute dos veces el fetch
    };
    fetchData();
  }, []);

  return (
    <Chart
      chartType="Bar"
      width="100%"
      height="400px"
      data={clientes}
      options={options}
    />
  );
}
