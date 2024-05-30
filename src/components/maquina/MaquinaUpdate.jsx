import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DoneIcon from "@mui/icons-material/Done";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const MaquinaUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setnombre] = useState("");
  const [fechaVencimientoLicencia, setfechaVencimientoLicencia] = useState("");
  const [almacenada, setalmacenada] = useState("");
  const [fechaAlmacenada, setfechaAlmacenada] = useState("");
  const [tipoMaquina, settipoMaquina] = useState("");
  const [idCliente, setidCliente] = useState("");

  const handleBack = () => {
    navigate(`/maquina/${id}`, { replace: true });
  };

  const handleSubmit = () => {
    var data = {
      nombre: nombre,
      fechaVencimientoLicencia: fechaVencimientoLicencia,
      almacenada: almacenada,
      fechaAlmacenada: fechaAlmacenada,
      tipoMaquina: tipoMaquina,
      idCliente: idCliente,
    };

    fetch(`http://localhost:4040/rfsAdmin/maquina/edit/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    navigate("/maquina", { replace: true });
  };

  useEffect(() => {
    fetch(`http://localhost:4040/rfsAdmin/maquina/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setnombre(result.nombre);
        setfechaVencimientoLicencia(result.fechaVencimientoLicencia);
        setalmacenada(almacenada);
        setfechaAlmacenada(result.fechaAlmacenada);
        settipoMaquina(result.tipoMaquina);
        setidCliente(result.cliente?.id);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la máquina:", error);
      });
  }, [id]);

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
        Editar detalles de la máquina
      </Typography>
      <TextField
        autoComplete="nombre"
        name="nombre"
        variant="outlined"
        required
        label="Nombre"
        value={nombre}
        onChange={(e) => setnombre(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />
      <TextField
        autoComplete="fechaVencimientoLicencia"
        name="fechaVencimientoLicencia"
        variant="outlined"
        required
        label="Licencia hasta"
        value={fechaVencimientoLicencia}
        onChange={(e) => setfechaVencimientoLicencia(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />
      <TextField
        autoComplete="almacenada"
        name="almacenada"
        variant="outlined"
        required
        label="En almacén"
        value={almacenada}
        onChange={(e) => setalmacenada(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />
      <TextField
        autoComplete="fechaAlmacenada"
        name="fechaAlmacenada"
        variant="outlined"
        required
        label="En almacén desde"
        value={fechaAlmacenada}
        onChange={(e) => setfechaAlmacenada(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />
      <TextField
        autoComplete="tipoMaquina"
        name="tipoMaquina"
        variant="outlined"
        required
        label="Tipo"
        value={tipoMaquina}
        onChange={(e) => settipoMaquina(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />
      <TextField
        autoComplete="idCliente"
        name="idCliente"
        variant="outlined"
        required
        label="Cliente"
        value={idCliente}
        onChange={(e) => setidCliente(e.target.value)}
        margin="normal"
        focused
        InputProps={{
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
            onClick={handleBack}
            style={{ marginRight: "5%", borderRadius: "5px" }}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<DoneIcon />}
            style={{ marginRight: "5%", borderRadius: "5px" }}
          >
            Guardar
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
