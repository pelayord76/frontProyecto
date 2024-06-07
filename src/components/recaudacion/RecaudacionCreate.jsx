import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

export const RecaudacionCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { idLocal: initialIdLocal, maquina: initialMaquina } =
    location.state || {};

  const [idLocal, setIdLocal] = useState(initialIdLocal || "");
  const [locales, setLocales] = useState([]);
  const [maquina, setMaquina] = useState(initialMaquina || "");
  const [maquinas, setMaquinas] = useState([]);
  const [cantidadRecaudada, setCantidadRecaudada] = useState("");
  const [pasosEntrada, setPasosEntrada] = useState("");
  const [pasosSalida, setPasosSalida] = useState("");
  const [porcentajeJuego, setPorcentajeJuego] = useState("");
  const [tasaRecaudacion, setTasaRecaudacion] = useState("");
  const [fecha, setFecha] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/cliente/clientes")
      .then((res) => res.json())
      .then((result) => {
        setLocales(result);
      })
      .catch((error) => {
        console.error("Error al obtener los clientes:", error);
      });
  }, []);

  useEffect(() => {
    if (idLocal) {
      fetch(`http://localhost:4040/rfsAdmin/maquina/cliente/${idLocal}`)
        .then((res) => res.json())
        .then((result) => {
          setMaquinas(result);
        })
        .catch((error) => {
          console.error("Error al obtener las máquinas:", error);
        });
    }
  }, [idLocal]);

  const handleSubmit = () => {
    const fechaFormateada = fecha ? fecha.format("YYYY-MM-DD") : null;
    const data = {
      maquina: maquina,
      fecha: fechaFormateada,
      cantidadRecaudada: cantidadRecaudada,
      pasosEntrada: pasosEntrada,
      pasosSalida: pasosSalida,
      porcentajeJuego: porcentajeJuego,
      tasaRecaudacion: tasaRecaudacion,
    };

    console.log(data);

    fetch("http://localhost:4040/rfsAdmin/recaudacion", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    navigate("/recaudacion", { replace: true, state: { shouldReload: true } });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        margin: "2%",
      }}
    >
      <Typography component="h1" variant="h5">
        Crear nueva recaudación
      </Typography>

      <InputLabel id="select-local-label">Local</InputLabel>
      <Select
        labelId="select-local-label"
        id="select-local"
        value={idLocal}
        label="Local"
        onChange={(e) => setIdLocal(e.target.value)}
        style={{ color: "#FFFFFF", marginBottom: "10px" }}
      >
        {locales.map((local) => (
          <MenuItem key={local.id} value={local.id}>
            {local.nombre}
          </MenuItem>
        ))}
      </Select>

      <InputLabel id="select-maquina-label">Máquina</InputLabel>
      <Select
        labelId="select-maquina-label"
        id="select-maquina"
        value={maquina}
        label="Máquina"
        onChange={(e) => setMaquina(e.target.value)}
        style={{ color: "#FFFFFF", marginBottom: "10px" }}
      >
        {maquinas.map((maquina) => (
          <MenuItem key={maquina.id} value={maquina.id}>
            {maquina.numero}
          </MenuItem>
        ))}
      </Select>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha"
          value={fecha}
          onChange={(newValue) => setFecha(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>

      <TextField
        autoComplete="cantidadRecaudada"
        name="cantidadRecaudada"
        variant="outlined"
        required
        label="Cantidad recaudada"
        value={cantidadRecaudada}
        onChange={(e) => setCantidadRecaudada(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="pasosEntrada"
        name="pasosEntrada"
        variant="outlined"
        required
        label="Pasos de entrada"
        value={pasosEntrada}
        onChange={(e) => setPasosEntrada(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="pasosSalida"
        name="pasosSalida"
        variant="outlined"
        required
        label="Pasos de salida"
        value={pasosSalida}
        onChange={(e) => setPasosSalida(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="porcentajeJuego"
        name="porcentajeJuego"
        variant="outlined"
        required
        label="Porcentaje de juego"
        value={porcentajeJuego}
        onChange={(e) => setPorcentajeJuego(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="tasaRecaudacion"
        name="tasaRecaudacion"
        variant="outlined"
        required
        label="Tasa de recaudación"
        value={tasaRecaudacion}
        onChange={(e) => setTasaRecaudacion(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <div style={{ display: "flex", justifyContent: "center", gap: "2%" }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={{ borderRadius: "5px", marginTop: "2%", marginBottom: "2%" }}
        >
          Crear
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          style={{ borderRadius: "5px", marginTop: "2%", marginBottom: "2%" }}
        >
          Cancelar
        </Button>
      </div>
    </div>
  );
};
