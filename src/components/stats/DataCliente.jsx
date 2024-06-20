import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { useAuth } from "../authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export function DataCliente() {
  const [clientes, setClientes] = useState([["Local", "Cantidad Recaudada"]]);
  const token = useAuth().getToken();
  const navigate = useNavigate();

  const options = {
    title: "Distribución de ingresos por cliente",
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
    backgroundColor: "#000000",
    titleTextStyle: {
      color: "#FFFFFF",
    },
    legend: {
      position: "none",
      textStyle: {
        color: "#FFFFFF",
      },
    },
  };

  useEffect(() => {
    if (!token) {
      navigate("/iniciarSesion");
    } else {
      const fetchData = async () => {
        const response = await fetch(
          "http://localhost:4040/rfsAdmin/cliente/data/ingresos",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        const transformedData = data.data.map((item) => [
          item.local,
          item.cantidadRecaudada,
        ]);
        setClientes([["Local", "Cantidad Recaudada"], ...transformedData]);
      };
      fetchData();
    }
  }, [navigate, token]);

  return (
    <Chart
      chartType="PieChart"
      data={clientes}
      options={options}
      width={"100%"}
      height={"400px"}
      style={{ overflow: "hidden" }}
    />
  );
}
