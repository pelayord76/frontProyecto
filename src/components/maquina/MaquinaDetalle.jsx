import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

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

  const handleUpdate = () => {
    navigate(`/update/${id}`, { replace: true });
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
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "#1E1E1E",
        color: "#FFFFFF",
        borderRadius: "8px",
        marginTop: "5%",
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
        Detalles de la Máquina
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
            color="warning"
            startIcon={<EditIcon />}
            onClick={handleUpdate}
            style={{ marginRight: "5%", borderRadius: "5px" }}
          >
            Editar
          </Button>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            style={{ borderRadius: "5px" }}
          >
            Eliminar
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
