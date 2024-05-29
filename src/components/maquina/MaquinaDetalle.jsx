import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const MaquinaDetalle = () => {
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:4040/rfsAdmin/maquina/${id}`)
      .then((res) => res.json())
      .then((maquina) => {
        console.log(maquina);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la máquina:", error);
      });
  }, [id]);

  return <div>MaquinaDetalle</div>;
};
