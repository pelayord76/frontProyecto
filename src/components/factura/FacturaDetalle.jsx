import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import { Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const FacturaDetalle = () => {
  const { id } = useParams();
  const [factura, setFactura] = useState(null);
  const [minId, setMinId] = useState(null);
  const [maxId, setMaxId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4040/rfsAdmin/factura/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setFactura(result);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles de la factura:", error);
      });
  }, [id]);

  useEffect(() => {
    fetch("http://localhost:4040/rfsAdmin/factura")
      .then((res) => res.json())
      .then((result) => {
        const ids = result.map((m) => m.id);
        setMinId(Math.min(...ids));
        setMaxId(Math.max(...ids));
      })
      .catch((error) => {
        console.error("Error al obtener los IDs de las facturas:", error);
      });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/factura/edit/${id}`, { replace: true });
  };

  const handleBack = () => {
    navigate(`/factura`, { replace: true });
  };

  const handleDelete = () => {
    fetch(`http://localhost:4040/rfsAdmin/factura/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        navigate("/factura", { replace: true });
      })
      .catch((error) => {
        console.error("Error al eliminar la factura:", error);
      });
  };

  const handleDownload = () => {};

  const handleSiguiente = () => {
    navigate(`/factura/${parseInt(id) + 1}`, { replace: true });
  };

  const handleAnterior = () => {
    navigate(`/factura/${parseInt(id) - 1}`, { replace: true });
  };

  return (
    <div
      className="contenedorMaquinaDetalle"
      style={{
        display: "flex",
        marginRight: "2%",
        marginLeft: "2%",
        gap: "2%",
      }}
    >
      <div
        className="contenedorDetalle"
        style={{
          flex: "1",
          padding: "20px",
          margin: "auto",
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          borderRadius: "8px",
          marginTop: "5%",
          marginBottom: "5%",
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
          Detalles de la factura
        </Typography>

        <TextField
          label="Cliente"
          value={factura?.cliente?.local || "N/A"}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          label="Fecha de emisión"
          value={factura?.fechaEmision || "N/A"}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <TextField
          label="IVA"
          value={factura?.iva || "N/A"}
          fullWidth
          margin="normal"
          focused
          InputProps={{
            readOnly: true,
            style: { color: "#FFFFFF" },
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <ButtonGroup>
            <Button
              variant="contained"
              color="info"
              startIcon={<ArrowBackIcon />}
              onClick={() => handleBack()}
              style={{ marginRight: "5%", borderRadius: "5px" }}
            >
              Volver
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              onClick={() => handleDownload()}
              style={{ marginRight: "5%", borderRadius: "5px" }}
            >
              Descargar
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<EditIcon />}
              onClick={() => handleUpdate(factura.id)}
              style={{ marginRight: "5%", borderRadius: "5px" }}
            >
              Editar
            </Button>
            <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => handleDelete(factura.id)}
              style={{ borderRadius: "5px" }}
            >
              Eliminar
            </Button>
          </ButtonGroup>

          <ButtonGroup
            style={{
              gap: "2%",
            }}
          >
            <Button
              disabled={minId !== null && parseInt(id) === minId}
              variant="contained"
              color="secondary"
              startIcon={
                <ArrowBackIcon style={{ margin: "0", padding: "0" }} />
              }
              onClick={handleAnterior}
              style={{ borderRadius: "5px", padding: "0", width: "0" }}
            />

            <Button
              disabled={maxId !== null && parseInt(id) === maxId}
              variant="contained"
              color="secondary"
              endIcon={
                <ArrowForwardIcon style={{ margin: "0", padding: "0" }} />
              }
              onClick={handleSiguiente}
              style={{ borderRadius: "5px", padding: "0", width: "0px" }}
            />
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};