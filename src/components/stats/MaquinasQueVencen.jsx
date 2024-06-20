import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthenticationContext";

export const MaquinasQueVencen = () => {
  const [maquinas, setMaquinas] = useState([]);
  const [anio, setAnio] = useState("");
  const token = useAuth().getToken();
  const navigate = useNavigate();

  if (!token) {
    navigate("/iniciarSesion");
  }

  const getMaquinas = () => {
    fetch(`http://localhost:4040/rfsAdmin/maquina/licencia/${anio}`)
      .then((res) => res.json())
      .then((result) => {
        setMaquinas(result.data);
      });
  };

  const handleClick = () => {
    getMaquinas();
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
        <Typography>Máquinas que vencen licencia (introducir año)</Typography>
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

          <IconButton
            aria-label="search"
            color="info"
            size="small"
            onClick={handleClick}
          >
            <SearchIcon/>
          </IconButton>
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
            <TableCell style={headerCellStyle}>Máquina:</TableCell>
            <TableCell style={headerCellStyle}>Fecha de vencimiento:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {maquinas.length > 0 ? (
            maquinas.map((maquina) => (
              <TableRow
                key={maquina.id}
                style={{
                  backgroundColor: "#2E2E2E",
                }}
              >
                <TableCell style={cellStyle}>{maquina.nombre}</TableCell>
                <TableCell style={cellStyle}>
                  {maquina.fechaVencimientoLicencia}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} style={cellStyle}>
                No hay máquinas disponibles.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
