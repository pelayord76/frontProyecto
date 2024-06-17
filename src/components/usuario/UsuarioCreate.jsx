import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthenticationContext";

const validationSchema = yup.object({
  nombre: yup
    .string()
    .min(3, "El nombre debe tener un minimo de 3 caracteres")
    .max(100, "El nombre debe tener un maximo de 100 caracteres")
    .required("El nombre no puede estar vacío"),
  username: yup
    .string()
    .min(3, "El nombre de usuario debe tener un minimo de 3 caracteres")
    .max(20, "El nombre de usuario debe tener un maximo de 20 caracteres")
    .required("El nombre de usuario no puede estar vacío"),
  email: yup
    .string()
    .email("El email debe tener un formato válido")
    .required("El correo no puede estar vacío"),
  password: yup
    .string()
    .min(8, "La contraseña debe tener un mínimo de 8 caracteres")
    .matches(
      /.*[A-Z].*/,
      "La contraseña debe tener al menos una letra mayúscula"
    )
    .matches(
      /.*[a-z].*/,
      "La contraseña debe tener al menos una letra minúscula"
    )
    .matches(/.*\d.*/, "La contraseña debe tener al menos un número")
    .matches(
      /.*[@#$%^&+=].*/,
      "La contraseña debe tener al menos un carácter especial (@#$%^&+=)"
    )
    .required("La contraseña no puede estar vacía"),
});

export const UsuarioCreate = () => {
  const navigate = useNavigate();
  const token = useAuth().getToken();

  if (!token) {
    navigate("/iniciarSesion");
  }

  const formik = useFormik({
    initialValues: {
      nombre: "",
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);

      fetch("http://localhost:4040/rfsAdmin/usuario", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      navigate("/usuario", { replace: true, state: { shouldReload: true } });
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
        Nuevo usuario
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

        <TextField
          name="username"
          variant="outlined"
          required
          label="Usuario"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          name="email"
          variant="outlined"
          required
          label="Correo"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
          focused
          InputProps={{
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          name="password"
          variant="outlined"
          required
          label="Contraseña"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
