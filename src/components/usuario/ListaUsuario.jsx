import { Button, ButtonGroup, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ListaUsuario = () => {
  const [usuarios, setusuarios] = useState([]);
  const navigate = useNavigate();

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
    fetch("http://localhost:4040/usuario")
      .then((res) => res.json())
      .then((result) => {
        setusuarios(result);
      });
  }, []);

  return (
    <TableContainer>
      <Button onClick={handleAdd}>Crear Usuario</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Email</TableCell>
            {/* <TableCell>Acción</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {usuarios.map((usuario) => (
            <TableRow key={usuario.id}>
              <TableCell>{usuario.id}</TableCell>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.email}</TableCell>
              {/* <ButtonGroup
                color="primary"
                aria-label="outlined primary button group"
              >
                <Button color="warning" onClick={() => handleEdit(usuario.id)}>Editar</Button>
                <Button color="danger" onClick={() => handleDelete(usuario.id)}>Borrar</Button>
              </ButtonGroup> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
