import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const RecaudacionUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cantidadRecaudada, setCantidadRecaudada] = useState("");
  const [pasosEntrada, setPasosEntrada] = useState("");
  const [pasosSalida, setPasosSalida] = useState("");
  const [porcentajeJuego, setPorcentajeJuego] = useState("");
  const [tasaRecaudacion, setTasaRecaudacion] = useState("");
  const [fecha, setFecha] = useState(null);

  const handleBack = () => {
    navigate(`/recaudacion/${id}`, { replace: true });
  };

  const handleSubmit = () => {
    const fechaFormateada = fecha ? fecha.format("YYYY-MM-DD") : null;
    const data = {
      cantidadRecaudada: cantidadRecaudada,
      pasosEntrada: pasosEntrada,
      pasosSalida: pasosSalida,
      porcentajeJuego: porcentajeJuego,
      tasaRecaudacion: tasaRecaudacion,
      fecha: fechaFormateada,
    };

    console.log(data);

    fetch(`http://localhost:4040/rfsAdmin/recaudacion/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    navigate("/recaudacion", { replace: true });
  };

  useEffect(() => {
    fetch(`http://localhost:4040/rfsAdmin/recaudacion/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setCantidadRecaudada(result.cantidadRecaudada);
        setPasosEntrada(result.pasosEntrada);
        setPasosSalida(result.pasosSalida);
        setPorcentajeJuego(result.porcentajeJuego);
        setTasaRecaudacion(result.tasaRecaudacion);
        const parsedFecha = result.fecha
          ? dayjs(result.fecha, "DD-MM-YYYY")
          : null;
        setFecha(parsedFecha);
      })
      .catch((error) => {
        console.error(
          "Error al obtener los detalles de la recaudación:",
          error
        );
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
        Editar detalles de la recaudación
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha"
          format="DD-MM-YYYY"
          autoFocus
          value={fecha}
          onChange={(newValue) => setFecha(newValue)}
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
          sx={{
            marginTop: "2%",
            color: "#FFFFFF",
            "& .css-i4bv87-MuiSvgIcon-root": {
              color: "#FFFFFF",
            },
            "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
              color: "#FFFFFF",
              borderColor: "#1976d2",
            },
            "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
              color: "#1976d2",
            },
            "& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
              borderColor: "#FFFFFF",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#1976d2",
              },
              "&:hover fieldset": {
                borderColor: "#1976d2",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
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
        label="Porcentaje del juego"
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
        label="Tasa de recaudacion"
        value={tasaRecaudacion}
        onChange={(e) => setTasaRecaudacion(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      {/* <InputLabel
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
      </Select> */}

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
