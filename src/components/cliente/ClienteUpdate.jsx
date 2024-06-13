import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  ButtonGroup,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ClienteUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [local, setLocal] = useState("");
  const [duenio, setDuenio] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [cif, setCif] = useState("");
  const [fechaVencimientoContrato, setFechaVencimientoContrato] =
    useState(null);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    const fechaFormateadaA = fechaVencimientoContrato
      ? fechaVencimientoContrato.format("YYYY-MM-DD")
      : null;

    var data = {
      local: local,
      duenio: duenio,
      telefono: telefono,
      direccion: direccion,
      cif: cif,
      fechaVencimientoContrato: fechaFormateadaA,
    };

    console.log(data);

    fetch(`http://localhost:4040/rfsAdmin/cliente/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    navigate("/cliente", { replace: true, state: { shouldReload: true } });
  };

  useEffect(() => {
    fetch(`http://localhost:4040/rfsAdmin/cliente/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setLocal(result.local);
        setDuenio(result.duenio);
        setTelefono(result.telefono);
        setDireccion(result.direccion);
        setCif(result.cif);

        const parsedFecha = result.fechaVencimientoContrato
          ? dayjs(result.fechaVencimientoContrato, "DD-MM-YYYY")
          : null;
        setFechaVencimientoContrato(parsedFecha);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del cliente:", error);
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
        Editar detalles del cliente
      </Typography>

      <TextField
        autoComplete="local"
        name="local"
        variant="outlined"
        required
        label="local"
        value={local}
        onChange={(e) => setLocal(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="duenio"
        name="duenio"
        variant="outlined"
        required
        label="Dueño"
        value={duenio}
        onChange={(e) => setDuenio(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="telefono"
        name="telefono"
        variant="outlined"
        required
        label="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="direccion"
        name="direccion"
        variant="outlined"
        required
        label="direccion"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <TextField
        autoComplete="cif"
        name="cif"
        variant="outlined"
        required
        label="cif"
        value={cif}
        onChange={(e) => setCif(e.target.value)}
        margin="normal"
        focused
        InputProps={{
          style: { color: "#FFFFFF" },
        }}
      />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Contrato hasta"
          format="DD-MM-YYYY"
          value={fechaVencimientoContrato}
          onChange={(newValue) => setFechaVencimientoContrato(newValue)}
          textField={(params) => (
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
            },
            "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root": {
              color: "#1976d2",
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "2px, solid, #1976d2",
              },
            },
          }}
        />
      </LocalizationProvider>

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
