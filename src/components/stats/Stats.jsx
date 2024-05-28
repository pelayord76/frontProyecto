import { Box } from "@mui/material";
import { DataCliente } from "./DataCliente";
import { DataMaquina } from "./DataMaquina";
import { Title } from "@mui/icons-material";

export const Stats = () => {
  return (
    <Box marginLeft={"5%"} marginRight={"5%"} marginTop={"1%"} display={"flex"}>
      <Title>Título</Title>
      <DataCliente />
      <DataMaquina />
    </Box>
  );
};
