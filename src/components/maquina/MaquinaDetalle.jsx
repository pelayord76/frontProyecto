import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MaquinaRecaudaciones } from "./MaquinaRecaudaciones";
import "./maquina.css";

export const MaquinaDetalle = () => {
  const { id } = useParams();
  const [maquina, setMaquina] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4040/rfsAdmin/maquina/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setMaquina(result);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la máquina:", error);
      });
  }, [id]);

  const handleUpdate = (id) => {
    navigate(`/maquina/edit/${id}`, { replace: true });
  };

  const handleBack = () => {
    navigate(`/maquina`, { replace: true });
  };

  const handleDelete = () => {
    fetch(`http://localhost:4040/rfsAdmin/maquina/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/maquina", { replace: true });
      })
      .catch((error) => {
        console.error("Error al eliminar la máquina:", error);
      });
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
          Detalles de la máquina
        </Typography>
        <TextField
          label="Nombre"
          value={maquina?.nombre || ""}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />
        <TextField
          label="Licencia hasta"
          value={maquina?.fechaVencimientoLicencia || "N/A"}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />
        <TextField
          label="En almacén"
          value={maquina?.almacenada ? "Sí" : "No"}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />
        <TextField
          label="En almacén desde"
          value={maquina?.fechaAlmacenada || "N/A"}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />
        <TextField
          label="Tipo"
          value={maquina?.tipoMaquina || ""}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />
        <TextField
          label="Cliente"
          value={maquina?.cliente?.local || "N/A"}
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
            justifyContent: "space-between",
            marginTop: "20px",
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
              onClick={() => handleUpdate(maquina.id)}
              style={{ marginRight: "5%", borderRadius: "5px" }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(maquina.id)}
              style={{ borderRadius: "5px" }}
            >
              Eliminar
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div
        style={{
          flex: "1",
          padding: "20px",
        }}
      >
        <MaquinaRecaudaciones />
      </div>
    </div>
  );
};
