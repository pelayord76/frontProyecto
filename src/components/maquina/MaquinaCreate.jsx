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
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthenticationContext";

const validationSchema = yup.object({
  nombre: yup
    .string()
    .min(3, "El nombre debe tener un minimo de 3 caracteres")
    .max(100, "El nombre debe tener un maximo de 100 caracteres")
    .required("El nombre no puede estar vacío"),
});

export const MaquinaCreate = () => {
  const navigate = useNavigate();
  const [locales, setLocales] = useState([]);
  const token = useAuth().getToken();

  if (!token) {
    navigate("/iniciarSesion");
  }

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/cliente/clientes")
      .then((res) => res.json())
      .then((result) => {
        setLocales(result);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      nombre: "",
      fechaVencimientoLicencia: null,
      almacenada: false,
      fechaAlmacenada: null,
      tipoMaquina: "",
      idCliente: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      var fechaFormateadaA = values.fechaAlmacenada
        ? values.fechaAlmacenada.format("YYYY-MM-DD")
        : null;
      const fechaFormateadaV = values.fechaVencimientoLicencia
        ? values.fechaVencimientoLicencia.format("YYYY-MM-DD")
        : null;

      var cliente = null;
      if (values.idCliente != cliente) {
        cliente = values.idCliente;
      }

      const data = {
        nombre: values.nombre,
        fechaVencimientoLicencia: fechaFormateadaV,
        almacenada: values.almacenada,
        fechaAlmacenada: fechaFormateadaA,
        tipoMaquina: values.tipoMaquina,
        idCliente: cliente,
      };

      console.log(data);

      fetch("http://localhost:4040/rfsAdmin/maquina", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      navigate("/maquina", { replace: true, state: { shouldReload: true } });
    },
  });

  const handleBack = () => {
    navigate(-1);
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

      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="nombre"
          variant="outlined"
          required
          label="Nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.nombre && Boolean(formik.errors.nombre)}
          helperText={formik.touched.nombre && formik.errors.nombre}
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
            value={formik.values.fechaVencimientoLicencia}
            onChange={(newValue) =>
              formik.setFieldValue("fechaVencimientoLicencia", newValue)
            }
            textfield={(params) => (
              <TextField
                {...params}
                margin="normal"
                focused
                error={
                  formik.touched.fechaVencimientoLicencia &&
                  Boolean(formik.errors.fechaVencimientoLicencia)
                }
                helperText={
                  formik.touched.fechaVencimientoLicencia &&
                  formik.errors.fechaVencimientoLicencia
                }
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
                  border: "2px solid #1976d2",
                },
              },
            }}
          />
        </LocalizationProvider>

        <FormControlLabel
          control={
            <Checkbox
              checked={formik.values.almacenada}
              onChange={(e) =>
                formik.setFieldValue("almacenada", e.target.checked)
              }
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
            value={formik.values.fechaAlmacenada}
            onChange={(newValue) =>
              formik.setFieldValue("fechaAlmacenada", newValue)
            }
            disabled={!formik.values.almacenada}
            textfield={(params) => (
              <TextField
                {...params}
                margin="normal"
                focused
                error={
                  formik.touched.fechaAlmacenada &&
                  Boolean(formik.errors.fechaAlmacenada)
                }
                helperText={
                  formik.touched.fechaAlmacenada &&
                  formik.errors.fechaAlmacenada
                }
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
                  border: "2px solid #1976d2",
                },
              },
            }}
          />
        </LocalizationProvider>
        <InputLabel
          id="tipoMaquina-label"
          sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
        >
          Tipo
        </InputLabel>
        <Select
          name="tipoMaquina"
          variant="outlined"
          required
          value={formik.values.tipoMaquina}
          onChange={formik.handleChange}
          error={
            formik.touched.tipoMaquina && Boolean(formik.errors.tipoMaquina)
          }
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
          labelId="local-label"
          name="idCliente"
          value={formik.values.idCliente}
          onChange={formik.handleChange}
          sx={{
            color: "#FFFFFF",
            marginBottom: "2%",
            border: "2px solid #1976d2",
            "& .MuiSvgIcon-root": {
              color: "white",
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
              type="submit"
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              style={{ marginRight: "5%", borderRadius: "5px" }}
            >
              Guardar
            </Button>
          </ButtonGroup>
        </div>
      </form>
    </div>
  );
};
