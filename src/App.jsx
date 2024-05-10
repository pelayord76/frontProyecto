import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ListaCliente } from "./components/cliente/ListaCliente";
import { ListaFacturas } from "./components/factura/ListaFacturas";
import { ListaMaquina } from "./components/maquina/ListaMaquina";
import { ListaRecaudaciones } from "./components/recaudacion/ListaRecaudaciones";
import { ListaUsuario } from "./components/usuario/ListaUsuario";
import Navbar from "./components/Navbar";
import { UsuarioAdd } from "./components/usuario/UsuarioAdd";
import { UsuarioEdit } from "./components/usuario/UsuarioEdit";
import { Index } from "./components/inicio/Index";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/usuario" element={<ListaUsuario />} />
          <Route path="/usuario/add" element={<UsuarioAdd />} />
          <Route path="/usuario/edit" element={<UsuarioEdit />} />
          <Route path="/cliente" element={<ListaCliente />} />
          <Route path="/maquina" element={<ListaMaquina />} />
          <Route path="/recaudacion" element={<ListaRecaudaciones />} />
          <Route path="/factura" element={<ListaFacturas />} />
        </Routes>
        
      </BrowserRouter>
    </>
  );
}

export default App;
