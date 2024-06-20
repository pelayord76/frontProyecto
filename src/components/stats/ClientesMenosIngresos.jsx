import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../authentication/AuthenticationContext";
import { useNavigate } from "react-router-dom";

export const ClientesMenosIngresos = () => {
  const [clientes, setClientes] = useState([]);
  const token = useAuth().getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/iniciarSesion");
    } else {
      fetch("http://localhost:4040/rfsAdmin/cliente/data/ingresos/min")
        .then((res) => res.json())
        .then((result) => {
          setClientes(result.data);
        });
    }
  }, [navigate, token]);

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
      ></div>
      <Typography>Clientes con menores ingresos</Typography>
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
            <TableCell style={headerCellStyle}>Local:</TableCell>
            <TableCell style={headerCellStyle}>Ingresos:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clientes.map((cliente) => (
            <TableRow
              key={cliente.id}
              style={{
                backgroundColor: "#2E2E2E",
              }}
            >
              <TableCell style={cellStyle}>{cliente.local}</TableCell>

              <TableCell style={cellStyle}>
                {cliente.cantidadRecaudada}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
