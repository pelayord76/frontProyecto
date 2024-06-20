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

export const ClienteMaquinas = () => {
  const { id } = useParams();
  const [maquinas, setMaquinas] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [cliente, setCliente] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4040/rfsAdmin/cliente/${id}/maquina`,
          {
            headers: { Accept: "application/json" },
          }
        );
        const data = await response.json();
        setMaquinas(Array.isArray(data.data) ? data.data : []); // Verificación de array

        const maquinaResponse = await fetch(
          `http://localhost:4040/rfsAdmin/cliente/${id}`
        );
        const clienteData = await maquinaResponse.json();
        setCliente(clienteData);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUnlink = async (maquinaId) => {
    try {
      await fetch(
        `http://localhost:4040/rfsAdmin/maquina/cliente/${maquinaId}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      // Refresca la lista de máquinas después de desvincular
      const response = await fetch(
        `http://localhost:4040/rfsAdmin/cliente/${id}/maquina`
      );
      const data = await response.json();
      setMaquinas(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al desvincular el cliente de la máquina:", error);
    }
  };

  const handleCreateMaquina = () => {
    navigate(`/maquina/add`, { replace: true });
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
          <Typography>Máquinas del cliente:</Typography>
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
              <TableCell style={headerCellStyle}>
                Desvincular maquina de este cliente:
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {maquinas
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((maquina) => (
                <TableRow
                  key={maquina.id}
                  style={{ backgroundColor: "#2E2E2E" }}
                >
                  <TableCell style={cellStyle}>
                    <Link
                      to={`/maquina/${maquina.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {maquina?.id}
                    </Link>
                  </TableCell>
                  <TableCell style={cellStyle}>
                    <Link
                      to={`/maquina/${maquina.id}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      {maquina?.nombre}
                    </Link>
                  </TableCell>
                  <TableCell style={cellStyle}>
                    <ButtonGroup>
                      <IconButton
                        aria-label="edit"
                        color="info"
                        size="small"
                        onClick={() => handleUnlink(maquina.id)}
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
