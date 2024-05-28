import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ListaUsuario = () => {
  const [usuarios, setusuarios] = useState([]);
  const navigate = useNavigate();
  const [dense, setDense] = React.useState(false);

  // const handleAdd = () => {
  //   navigate("/usuario/add", { replace: true });
  // };

  //   const handleEdit = (id) => {
  //     navigate("/usuario/edit/" + id, { replace: true });
  //   };

  // const handleDelete = async (id) => {
  //   var data = {
  //     id: id,
  //   };
  //   await fetch("https://localhost:4040/rfsAdmin/usuario/del/" + id, {
  //     method: "DELETE",
  //     headers: {
  //       Accept: "application/form-data",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // };

  // const handleUsuario = (id) => {
  //   navigate("/usuario/" + id, { replace: true });
  // };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4040/rfsAdmin/usuario", {
        headers: {
          Accept: "application/json",
        },
      });
      const data = await response.json();
      setusuarios(data);
      console.log(data);
    };
    fetchData();
  }, []);

  return (
    <Grid item xs={12} md={6} sx={{ mx: "auto", width: 700 }}>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Usuarios
      </Typography>
      <Button variant="outlined" startIcon={<PersonAddIcon />}>
        Crear usuario
      </Button>
      <List dense={dense}>
        {usuarios.map((usuario) => (
          <ListItem
            key={usuario.id}
            secondaryAction={
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Borrar
              </Button>
            }
          >
            <ListItemAvatar>
              <Avatar>{usuario.nombre.charAt(0).toUpperCase()}</Avatar>
            </ListItemAvatar>
            <ListItemText primary={usuario.nombre} secondary={usuario.email} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
