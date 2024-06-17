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
import { useAuth } from "../authentication/AuthenticationContext";

const validationSchema = yup.object({
  iva: yup.number().required("El IVA no puede ser nulo"),
  fechaEmision: yup.date().required("La fecha de emisión no puede ser nula"),
  idCliente: yup.number().required("El cliente no puede ser nulo"),
});

export const FacturaCreate = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();
  const [idLocal, setIdLocal] = useState("");
  const [locales, setLocales] = useState([]);

  if (!token) {
    navigate("/iniciarSesion");
  }

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

  const formik = useFormik({
    initialValues: {
      iva: 21,
      fechaEmision: null,
      idCliente: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const fechaFormateada = values.fechaEmision
        ? values.fechaEmision.format("YYYY-MM-DD")
        : null;

      const data = {
        iva: values.iva,
        fechaEmision: fechaFormateada,
        idCliente: values.idCliente,
      };

      console.log(data);

      fetch("http://localhost:4040/rfsAdmin/factura", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      navigate("/factura", {
        replace: true,
        state: { shouldReload: true },
      });
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
        Nueva factura
      </Typography>

      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <InputLabel
          id="local-label"
          sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
        >
          Local
        </InputLabel>

        <Select
          name="idCliente"
          variant="outlined"
          required
          value={formik.values.idCliente}
          onChange={(e) => {
            setIdLocal(e.target.value);
            formik.setFieldValue("idCliente", e.target.value);
          }}
          error={formik.touched.idCliente && Boolean(formik.errors.idCliente)}
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Fecha de emision"
            format="DD-MM-YYYY"
            value={formik.values.fechaEmision}
            onChange={(newValue) =>
              formik.setFieldValue("fechaEmision", newValue)
            }
            textfield={(params) => (
              <TextField
                {...params}
                margin="normal"
                focused
                error={
                  formik.touched.fechaEmision &&
                  Boolean(formik.errors.fechaEmision)
                }
                helperText={
                  formik.touched.fechaEmision && formik.errors.fechaEmision
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

        <TextField
          name="iva"
          variant="outlined"
          required
          label="IVA"
          value={formik.values.iva}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.iva && Boolean(formik.errors.iva)}
          helperText={formik.touched.iva && formik.errors.iva}
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
