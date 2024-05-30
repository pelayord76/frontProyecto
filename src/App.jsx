import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ListaCliente } from "./components/cliente/ListaCliente";
import { ListaFacturas } from "./components/factura/ListaFacturas";
import { Index } from "./components/inicio/Index";
import { Maquina } from "./components/maquina/Maquina";
import { MaquinaDetalle } from "./components/maquina/MaquinaDetalle";
import { MaquinaCreate } from "./components/maquina/MaquinaCreate";
import { MaquinaUpdate } from "./components/maquina/MaquinaUpdate";
import { ListaRecaudaciones } from "./components/recaudacion/ListaRecaudaciones";
import { Stats } from "./components/stats/Stats";
import { ListaUsuario } from "./components/usuario/ListaUsuario";
import { UsuarioAdd } from "./components/usuario/UsuarioAdd";
import { UsuarioEdit } from "./components/usuario/UsuarioEdit";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/usuario" element={<ListaUsuario />} />
          <Route path="/usuario/:id" element={<ListaUsuario />} />
          <Route path="/usuario/add" element={<UsuarioAdd />} />
          <Route path="/usuario/edit/:1" element={<UsuarioEdit />} />

          <Route path="/cliente" element={<ListaCliente />} />

          <Route path="/maquina" element={<Maquina />} />
          <Route path="/maquina/:id" element={<MaquinaDetalle />} />
          <Route path="/maquina/add" element={<MaquinaCreate />} />
          <Route path="/maquina/edit/:id" element={<MaquinaUpdate />} />

          <Route path="/recaudacion" element={<ListaRecaudaciones />} />

          <Route path="/factura" element={<ListaFacturas />} />

          <Route path="/perfil" element={<Index />} />
          <Route path="/ajustes" element={<Index />} />
          <Route path="/cerrarSesion" element={<Index />} />

          <Route path="/estadisticas" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
