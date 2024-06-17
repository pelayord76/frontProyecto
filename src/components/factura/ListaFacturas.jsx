import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
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
import { useAuth } from "../authentication/AuthenticationContext";

export const ListaFacturas = () => {
  const token = useAuth().getToken();
  const [facturas, setFacturas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/factura/add", { replace: true });
  };

  const handleUpdate = (id) => {
    navigate("/factura/edit/" + id, { replace: true });
  };

  const handleDelete = (id) => {
    var data = {
      id: id,
    };
    fetch(`http://localhost:4040/rfsAdmin/factura/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        fetch("http://localhost:4040/rfsAdmin/factura")
          .then((res) => res.json())
          .then((result) => {
            setFacturas(result);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar la factura:", error);
      });
  };

  const handleDownload = (id) => {};

  useEffect(() => {
    if (!token) {
      navigate("/iniciarSesion");
    } else {
      fetch("http://localhost:4040/rfsAdmin/factura")
        .then((res) => res.json())
        .then((result) => {
          setFacturas(result);
        });
    }
  }, [navigate, token]);

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
          Añadir factura
        </Button>
        <TablePagination
          rowsPerPageOptions={[10, 15, 20, 25]}
          count={facturas.length}
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
            <TableCell style={headerCellStyle}>IVA:</TableCell>
            <TableCell style={headerCellStyle}>Fecha de emisión:</TableCell>
            <TableCell style={headerCellStyle}>Cliente:</TableCell>
            <TableCell style={headerCellStyle}>Acción:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {facturas
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((factura) => (
              <TableRow
                key={factura.id}
                style={{
                  backgroundColor: "#2E2E2E",
                }}
              >
                <TableCell style={cellStyle}>
                  <Link
                    to={`/factura/${factura.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {factura.id}
                  </Link>
                </TableCell>

                <TableCell style={cellStyle}>{factura.iva}%</TableCell>

                <TableCell style={cellStyle}>{factura.fechaEmision}</TableCell>

                <TableCell style={cellStyle}>
                  {factura.cliente ? (
                    <Link
                      to={`/cliente/${factura.cliente?.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {factura?.cliente?.local}
                    </Link>
                  ) : (
                    <span>{factura?.cliente?.local || "N/A"}</span>
                  )}
                </TableCell>

                <TableCell style={cellStyle}>
                  <ButtonGroup>
                    <IconButton
                      aria-label="download"
                      color="primary"
                      size="small"
                      onClick={() => handleDownload(factura.id)}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      color="warning"
                      size="small"
                      onClick={() => handleUpdate(factura.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(factura.id)}
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
