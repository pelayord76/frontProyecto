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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const MaquinaCreate = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [fechaVencimientoLicencia, setFechaVencimientoLicencia] =
    useState(null);
  const [almacenada, setAlmacenada] = useState(false);
  const [fechaAlmacenada, setFechaAlmacenada] = useState(null);
  const [tipoMaquina, setTipoMaquina] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [locales, setLocales] = useState([]);

  const handleSubmit = () => {
    const fechaFormateadaA = fechaAlmacenada
      ? fechaAlmacenada.format("YYYY-MM-DD")
      : null;
    const fechaFormateadaV = fechaVencimientoLicencia
      ? fechaVencimientoLicencia.format("YYYY-MM-DD")
      : null;
      
    var data = {
      nombre: nombre,
      fechaVencimientoLicencia: fechaFormateadaV,
      almacenada: almacenada,
      fechaAlmacenada: fechaFormateadaA,
      tipoMaquina: tipoMaquina,
      idCliente: idCliente,
    };

    fetch("https://localhost:4040/rfsAdmin/maquina", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    navigate("/maquina", { replace: true });
  };

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/cliente/clientes")
      .then((res) => res.json())
      .then((result) => {
        setLocales(result);
      });
  }, []);

  const handleBack = () => {
    navigate("/maquina", { replace: true });
  };

  const handleClienteChange = (event) => {
    const { value } = event.target;
    setIdCliente(value);
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
        Nueva máquina
      </Typography>
      <TextField
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
          format="DD-MM-YYYY"
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
          marginBottom: "1%",
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="En almacén desde"
          format="DD-MM-YYYY"
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
        sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
      >
        Local
      </InputLabel>
      <Select
        value={idCliente}
        onChange={handleClienteChange}
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
