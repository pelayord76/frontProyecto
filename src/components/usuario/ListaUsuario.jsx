import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import DeleteIcon from "@mui/icons-material/Delete";
import "../../listaUsuario.css";
import { Button } from "flowbite-react";

export const ListaUsuario = () => {
  const [usuarios, setusuarios] = useState([]);
  const navigate = useNavigate();
  const [dense, setDense] = React.useState(false);

  const handleAdd = () => {
    navigate("/usuario/add/", { replace: true });
  };

  //  const handleEdit = (id) => {
  //    navigate("/usuario/edit/" + id, { replace: true });
  //  };

  //  const handleDelete = (id) => {
  //    var data = {
  //      id: id,
  //    };
  //    fetch(
  //      "https://localhost:4040/usuario/del" + id,
  //      {
  //        method: "DELETE",
  //        headers: {
  //          Accept: "application/form-data",
  //          "Content-Type": "application/json",
  //        },
  //        body: JSON.stringify(data),
  //      }
  //    );
  //  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:4040/usuario", {
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
    <Grid item xs={12} md={6} sx={{mx: 'auto', width: 700}}>
      <Button>Crear usuario</Button>
      <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
        Usuarios
      </Typography>
      <List dense={dense}>
        {usuarios.map((usuario) => (
          <ListItem
            key={usuario.id}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={usuario.nombre} secondary={usuario.email} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};
