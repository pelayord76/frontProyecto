import { Box } from "@mui/material";
import { DataCliente } from "./DataCliente"
import { DataJuego } from "./DataJuego";

export const Index = () => {
  return (
    <Box marginLeft={"5%"} marginRight={"5%"} marginTop={"1%"} display={"flex"}>
      <DataCliente />
      <DataJuego />
    </Box>
  );
}
