import { useEffect, useState } from "react";
import "react-data-grid/lib/styles.css";
import DataGrid from "react-data-grid";
import "./dataGrid.css"; // Importa el archivo CSS

const columns = [
  { key: "id", name: "ID", headerCellClass: "rdg-header-filter" }, // Agrega la clase para el header filter
  { key: "nombre", name: "Nombre", headerCellClass: "rdg-header-filter" }, // Agrega la clase para el header filter
  {
    key: "fechaVencimientoLicencia",
    name: "Licencia hasta",
    headerCellClass: "rdg-header-filter",
  }, // Agrega la clase para el header filter
  {
    key: "almacenada",
    name: "En almacén",
    headerCellClass: "rdg-header-filter",
  }, // Agrega la clase para el header filter
  {
    key: "fechaAlmacenamiento",
    name: "Desde",
    headerCellClass: "rdg-header-filter",
  }, // Agrega la clase para el header filter
  { key: "tipoMaquina", name: "Tipo", headerCellClass: "rdg-header-filter" }, // Agrega la clase para el header filter
  { key: "local", name: "Cliente", headerCellClass: "rdg-header-filter" }, // Agrega la clase para el header filter
];

export const ListaMaquina = () => {
  const [maquinas, setMaquinas] = useState([]);

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
      console.log(maquinasAplanadas);
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
        rowClass={(row) => "data-grid-row"}
        headerRowHeight={35}
        rowHeight={30}
        style={{ margin: "1%" }}
      />
    </div>
  );
};
