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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  maquina: yup.string().required("La referencia a la máquina no puede ser nula"),
  fecha: yup.date().required("La fecha de recaudacion no puede ser nula"),
  cantidadRecaudada: yup
    .number("Debe ser un número")
    .required("La cantidad recaudada no puede ser nula"),
  pasosEntrada: yup
    .number("Debe ser un número")
    .required("La cantidad de pasos de entrada no puede ser nula"),
  pasosSalida: yup
    .number("Debe ser un número")
    .required("La cantidad de pasos de salida no puede ser nula"),
  porcentajeJuego: yup
    .number("Debe ser un número")
    .required("El porcentaje de juego no puede ser nulo"),
  tasaRecaudacion: yup.number(),
});

export const RecaudacionCreate = () => {
  const navigate = useNavigate();

  const [idLocal, setIdLocal] = useState("");
  const [locales, setLocales] = useState([]);
  const [maquinas, setMaquinas] = useState([]);

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

  const formik = useFormik({
    initialValues: {
      local: "",
      maquina: "",
      fecha: null,
      cantidadRecaudada: "",
      pasosEntrada: "",
      pasosSalida: "",
      porcentajeJuego: "",
      tasaRecaudacion: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const fechaFormateada = values.fecha
        ? values.fecha.format("YYYY-MM-DD")
        : null;

      const data = {
        maquina: values.maquina,
        fecha: fechaFormateada,
        cantidadRecaudada: values.cantidadRecaudada,
        pasosEntrada: values.pasosEntrada,
        pasosSalida: values.pasosSalida,
        porcentajeJuego: values.porcentajeJuego,
        tasaRecaudacion: values.tasaRecaudacion,
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

      navigate("/recaudacion", {
        replace: true,
        state: { shouldReload: true },
      });
    },
  });

  const handleBack = () => {
    navigate("/recaudacion", { replace: true });
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
        Nueva recaudación
      </Typography>

      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >

        <div style={{ display: "flex", flexDirection: "row", gap: "1%" }}>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>

            <InputLabel
              id="local-label"
              sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
            >
              Local
            </InputLabel>

            <Select
              name="local"
              variant="outlined"
              required
              value={idLocal}
              onChange={(e) => {
                setIdLocal(e.target.value);
                formik.setFieldValue("local", e.target.value);
              }}
              error={formik.touched.local && Boolean(formik.errors.local)}
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

          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            
            <InputLabel
              id="maquina-label"
              sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
            >
              Maquina
            </InputLabel>

            <Select
              name="maquina"
              variant="outlined"
              required
              value={formik.values.maquina}
              onChange={formik.handleChange}
              error={formik.touched.maquina && Boolean(formik.errors.maquina)}
              sx={{
                flex: 1,
                color: "#FFFFFF",
                marginBottom: "2%",
                border: "2px solid #1976d2",
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            >
              {maquinas.map((maquina) => (
                <MenuItem key={maquina.id} value={maquina.id}>
                  {maquina.nombre}
                </MenuItem>
              ))}
            </Select>

          </div>

        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha"
            format="DD-MM-YYYY"
            value={formik.values.fecha}
            onChange={(newValue) => formik.setFieldValue("fecha", newValue)}
            textfield={(params) => (
              <TextField
                {...params}
                margin="normal"
                focused
                error={
                  formik.touched.fecha && Boolean(formik.errors.fecha)
                }
                helperText={formik.touched.fecha && formik.errors.fecha}
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

        <TextField
          name="cantidadRecaudada"
          variant="outlined"
          required
          label="Cantidad recaudada"
          value={formik.values.cantidadRecaudada}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.cantidadRecaudada &&
            Boolean(formik.errors.cantidadRecaudada)
          }
          helperText={
            formik.touched.cantidadRecaudada && formik.errors.cantidadRecaudada
          }
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <div style={{ display: "flex", gap: "2%" }}>
          <TextField
            name="pasosEntrada"
            variant="outlined"
            required
            label="Pasos de entrada"
            value={formik.values.pasosEntrada}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pasosEntrada &&
              Boolean(formik.errors.pasosEntrada)
            }
            helperText={
              formik.touched.pasosEntrada && formik.errors.pasosEntrada
            }
            margin="normal"
            focused
            InputProps={{
              style: { color: "#FFFFFF" },
            }}
            style={{ flex: "1" }}
          />

          <TextField
            name="pasosSalida"
            variant="outlined"
            required
            label="Pasos de salida"
            value={formik.values.pasosSalida}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.pasosSalida && Boolean(formik.errors.pasosSalida)
            }
            helperText={formik.touched.pasosSalida && formik.errors.pasosSalida}
            margin="normal"
            focused
            InputProps={{
              style: { color: "#FFFFFF" },
            }}
            style={{ flex: "1" }}
          />
        </div>

        <TextField
          name="porcentajeJuego"
          variant="outlined"
          required
          label="Porcentaje del juego"
          value={formik.values.porcentajeJuego}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.porcentajeJuego &&
            Boolean(formik.errors.porcentajeJuego)
          }
          helperText={
            formik.touched.porcentajeJuego && formik.errors.porcentajeJuego
          }
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          name="tasaRecaudacion"
          variant="outlined"
          label="Tasa de recaudacion"
          value={formik.values.tasaRecaudacion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.tasaRecaudacion &&
            Boolean(formik.errors.tasaRecaudacion)
          }
          helperText={
            formik.touched.tasaRecaudacion && formik.errors.tasaRecaudacion
          }
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
              type="submit"
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
