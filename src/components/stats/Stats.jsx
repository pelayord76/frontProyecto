import { Box } from "@mui/material";
import { DataCliente } from "./DataCliente";
import { DataMaquina } from "./DataMaquina";

export const Stats = () => {
  return (
    <Box marginLeft={"5%"} marginRight={"5%"} marginTop={"1%"} display={"flex"}>
      <DataCliente />
      <DataMaquina />
    </Box>
  );
};
