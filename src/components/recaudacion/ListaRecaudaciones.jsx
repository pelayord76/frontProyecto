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

export const ListaRecaudaciones = () => {
  const [recaudaciones, setRecaudaciones] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4040/rfsAdmin/recaudacion`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setRecaudaciones(data);
    };
    fetchData();
  }, []);

  const handleCreateRecaudacion = () => {
    navigate(`/recaudacion/add`, { replace: true });
  };

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
    <div>
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
          <Button variant="outlined" onClick={handleCreateRecaudacion}>
            Añadir recaudación
          </Button>
          <TablePagination
            rowsPerPageOptions={[10, 15, 20, 25]}
            count={recaudaciones.length}
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
              <TableCell style={headerCellStyle}>Total Recaudado:</TableCell>
              <TableCell style={headerCellStyle}>Pasos de entrada:</TableCell>
              <TableCell style={headerCellStyle}>Pasos de salida:</TableCell>
              <TableCell style={headerCellStyle}>% de juego:</TableCell>
              <TableCell style={headerCellStyle}>Tasa:</TableCell>
              <TableCell style={headerCellStyle}>Fecha:</TableCell>
              <TableCell style={headerCellStyle}>Máquina:</TableCell>
              <TableCell style={headerCellStyle}>Local:</TableCell>
              <TableCell style={headerCellStyle}>Acción:</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recaudaciones
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((recaudacion) => (
                <TableRow
                  key={recaudacion.id}
                  style={{
                    backgroundColor: "#2E2E2E",
                  }}
                >
                  <TableCell style={cellStyle}>
                    <Link
                      to={`/recaudacion/${recaudacion.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {recaudacion.id}
                    </Link>
                  </TableCell>
                  <TableCell style={cellStyle}>
                    {recaudacion.cantidadRecaudada}€
                  </TableCell>
                  <TableCell style={cellStyle}>
                    {recaudacion.pasosEntrada}
                  </TableCell>
                  <TableCell style={cellStyle}>
                    {recaudacion.pasosSalida}
                  </TableCell>
                  <TableCell style={cellStyle}>
                    {recaudacion.porcentajeJuego}%
                  </TableCell>
                  <TableCell style={cellStyle}>
                    {recaudacion.tasaRecaudacion}€
                  </TableCell>
                  <TableCell style={cellStyle}>{recaudacion.fecha}</TableCell>

                  <TableCell style={cellStyle}>
                    {recaudacion.maquina ? (
                      <Link
                        to={`/maquina/${recaudacion.maquina.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {recaudacion.maquina.nombre}
                      </Link>
                    ) : (
                      <span>{recaudacion.maquina.cliente?.local || "N/A"}</span>
                    )}
                  </TableCell>

                  <TableCell style={cellStyle}>
                    {recaudacion.maquina.cliente ? (
                      <Link
                        to={`/cliente/${recaudacion.maquina.cliente.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {recaudacion.maquina.cliente.local}
                      </Link>
                    ) : (
                      <span>{recaudacion.maquina.cliente?.local || "N/A"}</span>
                    )}
                  </TableCell>

                  <TableCell style={cellStyle}>
                    <ButtonGroup>
                      <IconButton
                        aria-label="edit"
                        color="warning"
                        size="small"
                        onClick={() => handleCreateRecaudacion}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        size="small"
                        onClick={() => handleCreateRecaudacion}
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
    </div>
  );
};
