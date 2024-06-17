import { Copyright } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  Avatar,
  Box,
  Button,
  Grid,
  TextField,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authentication/AuthenticationContext";

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setAuthPassword } = useAuth();
  const token = useAuth().getToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const handleSuccesfullLogin = () => {
    navigate("/");
  };

  const handleLogin = () => {
    fetch("http://localhost:4040/rfsAdmin/sign/in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    })
      .then(async (response) => {
        if (!response.ok) {
          const text = await response.text();
          throw new Error(text);
        }
        return response.json();
      })
      .then((data) => {
        if (typeof data.token === "string") {
          setAuthPassword(password);
          setToken(data.token);
          handleSuccesfullLogin();
        } else {
          throw new Error("Token inválido recibido");
        }
      })
      .catch((error) => {
        console.error("Error en la autenticación:", error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar Sesión
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Tooltip title="Regístrate" arrow TransitionComponent={Zoom}>
                <Link href="/registrarse" variant="body2">
                  ¿Aún no tienes una cuenta?
                </Link>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};
