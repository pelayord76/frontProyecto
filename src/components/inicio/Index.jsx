import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Index = () => {
  const navigate = useNavigate();

  const handleContacto = () => {
    navigate("/contacto");
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a RfsAdmin
        </Typography>
        <Typography variant="h4" component="h2" gutterBottom>
          Este programa está orientado a la gestión de actividad de negocios de
          juego y azar, ofreciendo un seguimiento detallado de la telemetría de
          tu actividad.
        </Typography>
      </Box>

      <Box my={4}>
        <Typography variant="h5" component="h3" gutterBottom>
          Características Principales
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h4">
                  Seguimiento detallado
                </Typography>
                <Typography variant="body2" component="p">
                  Monitorea tu actividad y consulta estadísticas relevantes de
                  tu negocio.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h4">
                  Generación de facturas
                </Typography>
                <Typography variant="body2" component="p">
                  Genera las facturas para emitir a tus clientes de forma
                  automatizada a partir de los registros.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h4">
                  Soporte Personalizado
                </Typography>
                <Typography variant="body2" component="p">
                  Ofrecemos soporte personalizado para ayudarte a sacar el
                  máximo provecho de nuestro software.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="h4">
                  Alertas de finalización de contratos
                </Typography>
                <Typography variant="body2" component="p">
                  El programa puede mandar correos al usuario cuando las
                  licencias o los contratos estén cerca de acabarse.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box my={4}>
        <Typography variant="h5" component="h3" gutterBottom>
          Contáctanos
        </Typography>
        <Typography variant="body1" component="p">
          Si tienes alguna pregunta o necesitas más información, no dudes en
          contactarnos.
        </Typography>
        <Button variant="contained" color="primary" onClick={handleContacto}>
          Enviar Mensaje
        </Button>
      </Box>
    </Container>
  );
};
