import { useEffect, useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import "../../dataGrid.css"; // Importa el archivo CSS
import { useNavigate } from "react-router-dom";
import { ActionButtons } from "../botones/ActionButtons";

export const ListaMaquina = () => {
  const [maquinas, setMaquinas] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    console.log("Editar", id);
    navigate("/maquina/" + id, { replace: true });
  };

  const handleDelete = (id) => {
    console.log("Borrar", id);
    // Implementar la lógica de borrado aquí
  };

  const columns = [
    { key: "id", name: "ID:" },
    { key: "nombre", name: "Nombre:" },
    { key: "fechaVencimientoLicencia", name: "Licencia hasta:" },
    { key: "almacenada", name: "En almacén?" },
    { key: "fechaAlmacenamiento", name: "En almacén desde:" },
    { key: "tipoMaquina", name: "Tipo:" },
    { key: "local", name: "Cliente:" },
    {
      key: "accion",
      name: "Acciones:",
      formatter: ({ row }) => (
        <ActionButtons row={row} onEdit={handleEdit} onDelete={handleDelete} />
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4040/rfsAdmin/maquina", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();

      // Aplanar la estructura del JSON y agregar un ID
      const maquinasAplanadas = data.map((maquina, index) => ({
        id: index + 1, // Asignar un ID basado en el índice
        nombre: maquina.nombre,
        fechaVencimientoLicencia: maquina.fechaVencimientoLicencia,
        almacenada: maquina.almacenada ? "Sí" : "No", // Convertir booleano a texto
        fechaAlmacenamiento: maquina.fechaAlmacenamiento || "N/A", // Mostrar "N/A" si es null
        tipoMaquina: maquina.tipoMaquina,
        local: maquina.cliente.local,
      }));

      setMaquinas(maquinasAplanadas);
    };
    fetchData();
  }, []);

  return (
    <div className="data-grid-container">
      <DataGrid
        className="data-grid"
        columns={columns}
        rows={maquinas}
        direction={"ltr"}
        rowClass={() => "data-grid-row"}
        headerRowHeight={40}
        rowHeight={35}
        style={{ margin: "1%", height: "50%" }} // Ajustar ancho mínimo y total
      />
    </div>
  );
};
