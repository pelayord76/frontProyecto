import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../maquina/maquina.css";
import { ClienteMaquinas } from "./ClienteMaquinas";
import { ClienteFacturas } from "./ClienteFacturas";
import { useAuth } from "../authentication/AuthenticationContext";

export const ClienteDetalle = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState(null);
  const [minId, setMinId] = useState(null);
  const [maxId, setMaxId] = useState(null);
  const navigate = useNavigate();
  const token = useAuth().getToken();

  useEffect(() => {
    if (!token) {
      navigate("/iniciarSesion");
    } else {
      fetch(`http://localhost:4040/rfsAdmin/cliente/${id}`)
        .then((res) => res.json())
        .then((result) => {
          setCliente(result.data);
        })
        .catch((error) => {
          console.error("Error al obtener los detalles del cliente:", error);
        });
    }
  }, [id, navigate, token]);

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/cliente")
      .then((res) => res.json())
      .then((result) => {
        const ids = result.data.map((m) => m.id);
        setMinId(Math.min(...ids));
        setMaxId(Math.max(...ids));
      })
      .catch((error) => {
        console.error("Error al obtener los IDs de los clientes:", error);
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/cliente/edit/${id}`, { replace: true });
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = () => {
    fetch(`http://localhost:4040/rfsAdmin/cliente/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/cliente", { replace: true });
      })
      .catch((error) => {
        console.error("Error al eliminar el cliente:", error);
      });
  };

  const handleSiguiente = () => {
    navigate(`/cliente/${parseInt(id) + 1}`, { replace: true });
  };

  const handleAnterior = () => {
    navigate(`/cliente/${parseInt(id) - 1}`, { replace: true });
  };

  return (
    <div
      className="contenedorMaquinaDetalle"
      style={{
        display: "flex",
        marginRight: "2%",
        marginLeft: "2%",
        gap: "2%",
      }}
    >
      <div
        className="contenedorDetalle"
        style={{
          flex: "1",
          padding: "20px",
          margin: "auto",
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          borderRadius: "8px",
          marginTop: "5%",
          marginBottom: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          style={{ color: "#FFFFFF", marginTop: "1%" }}
        >
          Detalles del cliente
        </Typography>

        <TextField
          label="Local"
          value={cliente?.local}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          label="Dueño"
          value={cliente?.duenio}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          label="Correo"
          value={cliente?.telefono}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          label="roles"
          value={cliente?.direccion}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          label="CIF"
          value={cliente?.cif}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          label="Fecha de Vencimiento del contrato"
          value={cliente?.fechaVencimientoContrato}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <ButtonGroup>
            <Button
              variant="contained"
              color="info"
              startIcon={<ArrowBackIcon />}
              onClick={() => handleBack()}
              style={{ marginRight: "5%", borderRadius: "5px" }}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<EditIcon />}
              onClick={() => handleUpdate(cliente.id)}
              style={{ marginRight: "5%", borderRadius: "5px" }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(cliente.id)}
              style={{ borderRadius: "5px" }}
            >
              Eliminar
            </Button>
          </ButtonGroup>

          <ButtonGroup
            style={{
              gap: "2%",
            }}
          >
            <Button
              disabled={minId !== null && parseInt(id) === minId}
              variant="contained"
              color="secondary"
              startIcon={
                <ArrowBackIcon style={{ margin: "0", padding: "0" }} />
              }
              onClick={handleAnterior}
              style={{ borderRadius: "5px", padding: "0", width: "0" }}
            />

            <Button
              disabled={maxId !== null && parseInt(id) === maxId}
              variant="contained"
              color="secondary"
              endIcon={
                <ArrowForwardIcon style={{ margin: "0", padding: "0" }} />
              }
              onClick={handleSiguiente}
              style={{ borderRadius: "5px", padding: "0", width: "0px" }}
            />
          </ButtonGroup>
        </div>
      </div>

      <div
        style={{
          flex: "1",
          padding: "20px",
        }}
      ></div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <ClienteMaquinas />
        <ClienteFacturas />
      </div>
    </div>
  );
};
