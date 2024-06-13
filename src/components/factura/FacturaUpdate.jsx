import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import {
  Button,
  ButtonGroup,
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

export const FacturaUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [idCliente, setIdCliente] = useState("");
  const [fechaEmision, setFechaEmision] = useState(null);
  const [iva, setIva] = useState("");
  const [locales, setLocales] = useState([]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    const fechaFormateada = fechaEmision
      ? fechaEmision.format("YYYY-MM-DD")
      : null;

    var data = {
      idCliente: idCliente,
      fechaEmision: fechaFormateada,
      iva: iva,
    };

    console.log(data);

    fetch(`http://localhost:4040/rfsAdmin/factura/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    navigate("/factura", { replace: true, state: { shouldReload: true } });
  };

  useEffect(() => {
    fetch(`http://localhost:4040/rfsAdmin/factura/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result.cliente) {
          setIdCliente(result.cliente.id);
        }
        const parsedFecha = result.fechaEmision
          ? dayjs(result.fechaEmision, "DD-MM-YYYY")
          : null;
        setFechaEmision(parsedFecha);

        setIva(result.iva);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la factura:", error);
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
        Editar detalles de la factura
      </Typography>

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
          "& .MuiSvgIcon-root": {
            color: "white",
          },
          "& .css-11u53oe-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
            {
              border: "2px solid #1976d2",
            },
        }}
      >
        <MenuItem value={" "}>N/A</MenuItem>
        {locales.map((local) => (
          <MenuItem key={local.id} value={local.id}>
            {local.local}
          </MenuItem>
        ))}
      </Select>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Fecha de emisión"
          format="DD-MM-YYYY"
          value={fechaEmision}
          onChange={(newValue) => setFechaEmision(newValue)}
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

      <TextField
        autoComplete="iva"
        name="iva"
        variant="outlined"
        required
        label="IVA"
        value={iva}
        onChange={(e) => setIva(e.target.value)}
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
