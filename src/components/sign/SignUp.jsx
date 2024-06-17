import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthenticationContext";
import { Copyright } from "../default/Copyright";

export const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [rol, setRol] = useState("");
  const token = useAuth().getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSubmit = () => {
    var data = {
      password: password,
      username: username,
      email: email,
      nombre: nombre,
      rol: rol,
    };

    fetch("http://localhost:4040/rfsAdmin/sign/up", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        console.log("usuario registrado con exito");
        navigate("/login");
      } else {
        throw new Error();
      }
    });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ backgroundColor: "#1E1E1E", borderRadius: "10px" }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Regístrate
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="nombre"
                variant="outlined"
                required
                label="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                type="text"
                focused
                InputProps={{
                  style: { color: "#FFFFFF" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                name="username"
                variant="outlined"
                required
                label="Usuario"
                type="text"
                focused
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                InputProps={{
                  style: { color: "#FFFFFF" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="email"
                variant="outlined"
                required
                label="email"
                type="text"
                focused
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  style: { color: "#FFFFFF" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                name="password"
                variant="outlined"
                required
                label="Contraseña"
                type="password"
                margin="normal"
                focused
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  style: { color: "#FFFFFF" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel
                id="tipoMaquina-label"
                sx={{ color: "#1976d2", marginTop: "2%", marginBottom: "1px" }}
              >
                Rol
              </InputLabel>
              <Select
                fullWidth
                name="rol"
                variant="outlined"
                required
                margin="normal"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
                sx={{
                  color: "#FFFFFF",
                  marginBottom: "2%",
                  border: "2px solid #1976d2",
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                }}
              >
                <MenuItem value={"ADMIN"}>Administrador</MenuItem>
                <MenuItem value={"USER"}>Usuario raso</MenuItem>
              </Select>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Crear usuario
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/iniciarSesion" variant="body2">
                ¿Ya tienes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
