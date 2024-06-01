import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const MaquinaUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] =
    useState(null);
  const [almacenada, setAlmacenada] = useState(false);
  const [fechaAlmacenada, setFechaAlmacenada] = useState(null);
  const [tipoMaquina, setTipoMaquina] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [local, setLocal] = useState("");
  const [locales, setLocales] = useState([]);

  const handleBack = () => {
    navigate(`/maquina/${id}`, { replace: true });
  };

  const handleSubmit = () => {
    const data = {
      nombre: nombre,
      fechaVencimientoLicencia: fechaVencimientoLicencia
        ? fechaVencimientoLicencia.toISOString()
        : null,
      almacenada: almacenada,
      fechaAlmacenada: almacenada
        ? fechaAlmacenada
          ? fechaAlmacenada.toISOString()
          : null
        : null,
      tipoMaquina: tipoMaquina,
      idCliente: idCliente,
    };

    console.log(data);

    fetch(`http://localhost:4040/rfsAdmin/maquina/${id}`, {
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
        setNombre(result.nombre);
        setFechaVencimientoLicencia(
          result.fechaVencimientoLicencia
            ? dayjs(result.fechaVencimientoLicencia)
            : null
        );
        setAlmacenada(result.almacenada || false);
        setFechaAlmacenada(
          result.fechaAlmacenada ? dayjs(result.fechaAlmacenada) : null
        );
        setTipoMaquina(result.tipoMaquina);
        if (result.cliente) {
          setIdCliente(result.cliente.id);
          setLocal(result.cliente.local);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la máquina:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/cliente/clientes")
      .then((res) => res.json())
      .then((result) => {
        setLocales(result);
      });
  }, []);

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
        onChange={(e) => setNombre(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Licencia hasta"
          value={fechaVencimientoLicencia}
          onChange={(newValue) => setFechaVencimientoLicencia(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              focused
              InputProps={{
                style: { color: "#FFFFFF" },
              }}
            />
          )}
          sx={{ marginTop: "2%" }}
        />
      </LocalizationProvider>
      <FormControlLabel
        control={
          <Checkbox
            checked={almacenada}
            onChange={(e) => setAlmacenada(e.target.checked)}
            style={{ color: "#1976d2" }}
          />
        }
        label="En almacén?"
        style={{
          color: "#FFFFFF",
          margin: "normal",
          marginTop: "2%",
          marginBottom:"1%"
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="En almacén desde"
          value={fechaAlmacenada}
          onChange={(newValue) => setFechaAlmacenada(newValue)}
          disabled={!almacenada}
          renderInput={(params) => (
            <TextField
              {...params}
              margin="normal"
              focused
              InputProps={{
                style: { color: "#FFFFFF" },
              }}
            />
          )}
          sx={{ marginTop: "2%" }}
        />
      </LocalizationProvider>
      <InputLabel
        id="tipoMaquina-label"
        sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
      >
        Tipo
      </InputLabel>
      <Select
        autoComplete="tipoMaquina"
        name="tipoMaquina"
        variant="outlined"
        required
        value={tipoMaquina}
        onChange={(e) => setTipoMaquina(e.target.value)}
        sx={{
          color: "#FFFFFF",
          marginBottom: "2%",
          border: "2px solid #1976d2",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        <MenuItem value={"BILLETES"}>Billetes</MenuItem>
        <MenuItem value={"MONEDAS"}>Monedas</MenuItem>
      </Select>
      <InputLabel
        id="local-label"
        sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
      >
        Local
      </InputLabel>
      <Select
        autoComplete="idCliente"
        labelId="local-label"
        value={idCliente}
        onChange={(e) => setIdCliente(e.target.value)}
        sx={{
          color: "#FFFFFF",
          marginBottom: "2%",
          border: "2px solid #1976d2",
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
      >
        {locales.map((local) => (
          <MenuItem key={local.id} value={local.id}>
            {local.local}
          </MenuItem>
        ))}
      </Select>
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
            startIcon={<SaveIcon />}
            onClick={handleSubmit}
            style={{ marginRight: "5%", borderRadius: "5px" }}
          >
            Guardar
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};
