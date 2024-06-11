import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ButtonGroup,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const ListaCliente = () => {
  const [clientes, setClientes] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/cliente/add", { replace: true });
  };

  const handleUpdate = (id) => {
    navigate("/cliente/edit/" + id, { replace: true });
  };

  const handleDelete = (id) => {
    var data = {
      id: id,
    };
    fetch(`http://localhost:4040/rfsAdmin/cliente/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        fetch("http://localhost:4040/rfsAdmin/cliente")
          .then((res) => res.json())
          .then((result) => {
            setClientes(result);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar el cliente:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/cliente")
      .then((res) => res.json())
      .then((result) => {
        setClientes(result);
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Button variant="outlined" onClick={handleCreate}>
          Añadir cliente
        </Button>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25]}
          count={clientes.length}
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
            <TableCell style={headerCellStyle}>Local:</TableCell>
            <TableCell style={headerCellStyle}>Dueño:</TableCell>
            <TableCell style={headerCellStyle}>Teléfono:</TableCell>
            <TableCell style={headerCellStyle}>Dirección:</TableCell>
            <TableCell style={headerCellStyle}>CIF:</TableCell>
            <TableCell style={headerCellStyle}>Contrato hasta:</TableCell>
            <TableCell style={headerCellStyle}>Acción:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((cliente) => (
              <TableRow
                key={cliente.id}
                style={{
                  backgroundColor: "#2E2E2E",
                }}
              >
                <TableCell style={cellStyle}>
                  <Link
                    to={`/cliente/${cliente.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {cliente.id}
                  </Link>
                </TableCell>

                <TableCell style={cellStyle}>
                  <Link
                    to={`/cliente/${cliente.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {cliente.local}
                  </Link>
                </TableCell>

                <TableCell style={cellStyle}>{cliente.duenio}</TableCell>

                <TableCell style={cellStyle}>{cliente.telefono}</TableCell>

                <TableCell style={cellStyle}>{cliente.direccion}</TableCell>

                <TableCell style={cellStyle}>{cliente.cif}</TableCell>

                <TableCell style={cellStyle}>
                  {cliente.fechaVencimientoContrato}
                </TableCell>

                <TableCell style={cellStyle}>
                  <ButtonGroup>
                    <IconButton
                      aria-label="edit"
                      color="warning"
                      size="small"
                      onClick={() => handleUpdate(cliente.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(cliente.id)}
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
