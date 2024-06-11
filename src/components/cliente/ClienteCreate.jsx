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
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  local: yup
    .string()
    .min(3, "El nombre del local debe tener un minimo de 3 caracteres")
    .max(100, "El nombre del local debe tener un maximo de 50 caracteres")
    .required("El nombre no puede estar vacío"),
  duenio: yup
    .string()
    .max(50, "El nombre del dueño no puede superar los 100 caracteres")
    .required("El nombre del dueño no puede estar en blacno"),
  telefono: yup
    .string()
    .required("El numero de telefono no puede estar vacio")
    .max(9, "El número de teléfono no puede tener mas de 9 digitos")
    .matches(
      /^[1-9][0-9]{8}$/,
      "El numero de telefono solo puede contener 9 dígitos y no puede comenzar con cero"
    ),
  direccion: yup
    .string()
    .required("La direccion no puede estar vacía")
    .min(5, "La dirección debe tener un minimo de 5 caracteres")
    .max(100, "La direccion debe tener un maximo de 100 caracteres"),
  cif: yup
    .string()
    .required("El tipo de máquina no puede estar vacío")
    .max(9, "El cif debe tener un máximo de 9 caracteres, 1 letra y 8 digitos")
    .matches(
      /^[A-Z]\d{8}$/,
      "El formato debe ser una letra mayúscula seguida de 8 dígitos"
    ),
  fechaVencimientoContrato: yup
    .date()
    .required("La fecha no puede estar vacía")
    .min(
      new Date(),
      "La fecha de vencimiento de la licencia debe ser una fecha futura"
    ),
});

export const ClienteCreate = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      local: "",
      duenio: "",
      telefono: "",
      direccion: "",
      cif: "",
      fechaVencimientoContrato: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const fechaFormateada = values.fechaVencimientoContrato
        ? values.fechaVencimientoContrato.format("YYYY-MM-DD")
        : null;

      const data = {
        local: values.local,
        duenio: values.duenio,
        telefono: values.telefono,
        direccion: values.direccion,
        cif: values.cif,
        fechaVencimientoContrato: fechaFormateada,
      };

      console.log(data);

      fetch("http://localhost:4040/rfsAdmin/cliente", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      navigate("/cliente", { replace: true, state: { shouldReload: true } });
    },
  });

  const handleBack = () => {
    navigate("/cliente", { replace: true });
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
        Nuevo cliente
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          name="local"
          variant="outlined"
          required
          label="Local"
          value={formik.values.local}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.local && Boolean(formik.errors.local)}
          helperText={formik.touched.local && formik.errors.local}
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          name="duenio"
          variant="outlined"
          required
          label="Dueño"
          value={formik.values.duenio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.duenio && Boolean(formik.errors.duenio)}
          helperText={formik.touched.duenio && formik.errors.duenio}
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          name="telefono"
          variant="outlined"
          required
          label="Teléfono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.telefono && Boolean(formik.errors.telefono)}
          helperText={formik.touched.telefono && formik.errors.telefono}
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          name="direccion"
          variant="outlined"
          required
          label="Dirección"
          value={formik.values.direccion}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.direccion && Boolean(formik.errors.direccion)}
          helperText={formik.touched.direccion && formik.errors.direccion}
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          name="cif"
          variant="outlined"
          required
          label="CIF"
          value={formik.values.cif}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cif && Boolean(formik.errors.cif)}
          helperText={formik.touched.cif && formik.errors.cif}
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
            value={formik.values.fechaVencimientoContrato}
            onChange={(newValue) =>
              formik.setFieldValue("fechaVencimientoContrato", newValue)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                focused
                error={
                  formik.touched.fechaVencimientoContrato &&
                  Boolean(formik.errors.fechaVencimientoContrato)
                }
                helperText={
                  formik.touched.fechaVencimientoContrato &&
                  formik.errors.fechaVencimientoContrato
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
