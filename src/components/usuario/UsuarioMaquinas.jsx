import UnlinkIcon from "@mui/icons-material/LinkOff";
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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export const UsuarioMaquinas = () => {
  const { id } = useParams();
  const [maquinas, setMaquinas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [usuario, setUsuario] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:4040/rfsAdmin/usuario/${id}/maquina`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setMaquinas(data);

      const maquinaResponse = await fetch(
        `http://localhost:4040/rfsAdmin/usuario/${id}`
      );
      const usuarioData = await maquinaResponse.json();
      setUsuario(usuarioData);
    };
    fetchData();
  }, [id]);

  const handleCreateMaquina = () => {
    navigate(`/maquina/add`, { replace: true });
  };

  const handleUnlink = (usuario, maquina) => {
    fetch(`http://localhost:4040/rfsAdmin/tiene/${usuario}/${maquina}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        fetch("http://localhost:4040/rfsAdmin/usuario/" + id + "/maquina")
          .then((res) => res.json())
          .then((result) => {
            setMaquinas(result);
          });
      })
      .catch((error) => {
        console.error("Error al desvincular el cliente de la máquina:", error);
      });
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
          <Button variant="outlined" onClick={handleCreateMaquina}>
            Añadir máquina
          </Button>
          <Typography>Máquinas del usuario:</Typography>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 20]}
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
              <TableCell style={headerCellStyle}>Cliente:</TableCell>
              <TableCell style={headerCellStyle}>
                Desvincular maquina de este usuario:
              </TableCell>
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
                  <TableCell style={cellStyle}>{maquina?.id}</TableCell>
                  <TableCell style={cellStyle}>
                    <Link
                      to={`/maquina/${maquina.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {maquina?.nombre}
                    </Link>
                  </TableCell>
                  <TableCell style={cellStyle}>
                    <Link
                      to={`/cliente/${maquina?.cliente?.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {maquina?.cliente?.local}
                    </Link>
                  </TableCell>
                  <TableCell style={cellStyle}>
                    <ButtonGroup>
                      <IconButton
                        aria-label="edit"
                        color="info"
                        size="small"
                        onClick={() => handleUnlink(usuario.id, maquina.id)}
                      >
                        <UnlinkIcon />
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
