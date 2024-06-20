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
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthenticationContext";

export const ListaUsuario = () => {
  const token = useAuth().getToken();
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/usuario/add", { replace: true });
  };

  const handleUpdate = (id) => {
    navigate("/usuario/edit/" + id, { replace: true });
  };

  const handleDelete = (id) => {
    var data = {
      id: id,
    };
    fetch(`http://localhost:4040/rfsAdmin/usuario/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        fetch("http://localhost:4040/rfsAdmin/usuario")
          .then((res) => res.json())
          .then((result) => {
            setUsuarios(result.data);
          });
      })
      .catch((error) => {
        console.error("Error al eliminar el usuario:", error);
      });
  };

  useEffect(() => {
    if (!token) {
      navigate("/iniciarSesion");
    } else {
      fetch("http://localhost:4040/rfsAdmin/usuario")
        .then((res) => res.json())
        .then((result) => {
          setUsuarios(result.data);
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
      >
        <Button variant="outlined" onClick={handleCreate}>
          Añadir usuario
        </Button>
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
            <TableCell style={headerCellStyle}>Usuario:</TableCell>
            <TableCell style={headerCellStyle}>Correo</TableCell>
            <TableCell style={headerCellStyle}>Acción:</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow
              key={usuario.id}
              style={{
                backgroundColor: "#2E2E2E",
              }}
            >
              <TableCell style={cellStyle}>
                <Link
                  to={`/usuario/${usuario.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {usuario.id}
                </Link>
              </TableCell>

              <TableCell style={cellStyle}>
                <Link
                  to={`/usuario/${usuario.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {usuario.nombre}
                </Link>
              </TableCell>

              <TableCell style={cellStyle}>
                <Link
                  to={`/perfil/${usuario.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {usuario.username}
                </Link>
              </TableCell>

              <TableCell style={cellStyle}>{usuario.email}</TableCell>
              <TableCell style={cellStyle}>
                <ButtonGroup>
                  <IconButton
                    aria-label="edit"
                    color="warning"
                    size="small"
                    onClick={() => handleUpdate(usuario.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(usuario.id)}
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
