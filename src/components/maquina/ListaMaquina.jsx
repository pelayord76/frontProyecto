import { useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const ListaMaquina = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/create/", { replace: true });
  };

  const handleUpdate = (id) => {
    navigate("/update/" + id, { replace: true });
  };

  const handleDelete = (id) => {
    var data = {
      id: id,
    };
    fetch("http://localhost:4040/rfsAdmin/maquina/delete", {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/maquina")
      .then((res) => res.json())
      .then((result) => {
        setMaquinas(result);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const cellStyle = {
    color: "#FFFFFF",
    textAlign: "center",
    verticalAlign: "middle",
  };

  const headerCellStyle = {
    ...cellStyle,
    fontWeight: "bold",
  };

  return (
    <TableContainer
      style={{
        margin: "2%",
        maxWidth: "96%",
        overflowX: "auto",
      }}
    >
      <Button variant="outlined" onClick={handleCreate}>
        Añadir Maquina
      </Button>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25]}
          count={maquinas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          labelRowsPerPage="Filas por página"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
          color="#FFFFFF"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          style={{ color: "#FFFFFF" }}
        />
      </div>
      <Table
        style={{
          fontFamily: "sans-serif",
          color: "#FFFFFF",
          width: "100%",
          tableLayout: "fixed",
        }}
      >
        <TableHead>
          <TableRow style={{ backgroundColor: "#1E1E1E" }}>
            <TableCell style={headerCellStyle}>ID:</TableCell>
            <TableCell style={headerCellStyle}>Nombre:</TableCell>
            <TableCell style={headerCellStyle}>Licencia hasta:</TableCell>
            <TableCell style={headerCellStyle}>En almacén?</TableCell>
            <TableCell style={headerCellStyle}>En almacén desde:</TableCell>
            <TableCell style={headerCellStyle}>Tipo:</TableCell>
            <TableCell style={headerCellStyle}>Cliente:</TableCell>
            <TableCell style={headerCellStyle}>Acción:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maquinas
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((maquina) => (
              <TableRow
                key={maquina.id}
                style={{
                  backgroundColor: "#2E2E2E",
                }}
              >
                <TableCell style={cellStyle}>{maquina.id}</TableCell>
                <TableCell style={cellStyle}>{maquina.nombre}</TableCell>
                <TableCell style={cellStyle}>
                  {maquina.fechaVencimientoLicencia || "N/A"}
                </TableCell>
                <TableCell style={cellStyle}>
                  {maquina.almacenada ? "Sí" : "No"}
                </TableCell>
                <TableCell style={cellStyle}>
                  {maquina.fechaAlmacenamiento || "N/A"}
                </TableCell>
                <TableCell style={cellStyle}>{maquina.tipoMaquina}</TableCell>
                <TableCell style={cellStyle}>
                  {maquina.cliente?.local || "N/A"}
                </TableCell>
                <TableCell style={cellStyle}>
                  <ButtonGroup>
                    <IconButton
                      aria-label="edit"
                      color="warning"
                      size="small"
                      onClick={() => handleUpdate(maquina.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(maquina.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ButtonGroup>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
