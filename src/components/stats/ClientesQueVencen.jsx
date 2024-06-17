import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Button,
} from "@mui/material";

export const ClientesQueVencen = () => {
  const [clientes, setClientes] = useState([]);
  const [anio, setAnio] = useState("");

  const getclientes = () => {
    fetch(`http://localhost:4040/rfsAdmin/cliente/contrato/${anio}`)
      .then((res) => res.json())
      .then((result) => {
        setClientes(result);
      });
  };

  const handleClick = () => {
    getclientes();
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
        <Typography>Clientes que vencen contrato (introducir año)</Typography>
        <div style={{ display: "flex", alignItems: "center" }}>
          <TextField
            label="Año"
            size="small"
            variant="outlined"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            margin="normal"
            focused
            InputProps={{
              style: { color: "#FFFFFF", marginRight: "2%" },
            }}
          />

          <Button variant="contained" color="primary" onClick={handleClick}>
            Buscar
          </Button>
        </div>
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
            <TableCell style={headerCellStyle}>Cliente (local):</TableCell>
            <TableCell style={headerCellStyle}>Fecha de vencimiento:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.length > 0 ? (
            clientes.map((cliente) => (
              <TableRow
                key={cliente.id}
                style={{
                  backgroundColor: "#2E2E2E",
                }}
              >
                <TableCell style={cellStyle}>{cliente.local}</TableCell>
                <TableCell style={cellStyle}>
                  {cliente.fechaVencimientoContrato}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} style={cellStyle}>
                No hay clientes disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};