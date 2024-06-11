import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Configuracion } from "./components/default/Configuracion";
// import { Footer } from "./components/default/Footer";
import { Cliente } from "./components/cliente/Cliente";
import { ClienteCreate } from "./components/cliente/ClienteCreate";
import { ClienteDetalle } from "./components/cliente/ClienteDetalle";
import { ClienteUpdate } from "./components/cliente/ClienteUpdate";
import Navbar from "./components/default/Navbar";
import { Perfil } from "./components/default/Perfil";
import { Error404 } from "./components/errores/Error404";
import { FacturaCreate } from "./components/factura/FacturaCreate";
import { FacturaDetalle } from "./components/factura/FacturaDetalle";
import { FacturaUpdate } from "./components/factura/FacturaUpdate";
import { ListaFacturas } from "./components/factura/ListaFacturas";
import { Index } from "./components/inicio/Index";
import { Logout } from "./components/login-out/Logout";
import { Maquina } from "./components/maquina/Maquina";
import { MaquinaCreate } from "./components/maquina/MaquinaCreate";
import { MaquinaDetalle } from "./components/maquina/MaquinaDetalle";
import { MaquinaUpdate } from "./components/maquina/MaquinaUpdate";
import { ListaRecaudaciones } from "./components/recaudacion/ListaRecaudaciones";
import { RecaudacionCreate } from "./components/recaudacion/RecaudacionCreate";
import { RecaudacionDetalle } from "./components/recaudacion/RecaudacionDetalle";
import { RecaudacionUpdate } from "./components/recaudacion/RecaudacionUpdate";
import { Stats } from "./components/stats/Stats";
import { ListaUsuario } from "./components/usuario/ListaUsuario";
import { UsuarioCreate } from "./components/usuario/UsuarioCreate";
import { UsuarioDetalle } from "./components/usuario/UsuarioDetalle";
import { UsuarioUpdate } from "./components/usuario/UsuarioUpdate";
// import { Error415 } from "./components/errores/Error415";

function App() {
  console.log(
    `%c\n\n██████╗ ███████╗███████╗ █████╗ ██████╗ ███╗   ███╗██╗███╗   ██╗
██╔══██╗██╔════╝██╔════╝██╔══██╗██╔══██╗████╗ ████║██║████╗  ██║
██████╔╝█████╗  ███████╗███████║██║  ██║██╔████╔██║██║██╔██╗ ██║
██╔══██╗██╔══╝  ╚════██║██╔══██║██║  ██║██║╚██╔╝██║██║██║╚██╗██║
██║  ██║██║     ███████║██║  ██║██████╔╝██║ ╚═╝ ██║██║██║ ╚████║
╚═╝  ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝╚═════╝ ╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝
                                                                \n`,
    "color: #1976d2"
  );
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />

          <Route path="/usuario" element={<ListaUsuario />} />
          <Route path="/usuario/:id" element={<UsuarioDetalle />} />
          <Route path="/usuario/add" element={<UsuarioCreate />} />
          <Route path="/usuario/edit/:id" element={<UsuarioUpdate />} />

          <Route path="/perfil/:id" element={<Perfil />} />

          <Route path="/cliente" element={<Cliente />} />
          <Route path="/cliente/:id" element={<ClienteDetalle />} />
          <Route path="/cliente/add" element={<ClienteCreate />} />
          <Route path="/cliente/edit/:id" element={<ClienteUpdate />} />

          <Route path="/maquina" element={<Maquina />} />
          <Route path="/maquina/:id" element={<MaquinaDetalle />} />
          <Route path="/maquina/add" element={<MaquinaCreate />} />
          <Route path="/maquina/edit/:id" element={<MaquinaUpdate />} />

          <Route path="/recaudacion" element={<ListaRecaudaciones />} />
          <Route path="/recaudacion/:id" element={<RecaudacionDetalle />} />
          <Route path="/recaudacion/add" element={<RecaudacionCreate />} />
          <Route path="/recaudacion/edit/:id" element={<RecaudacionUpdate />} />

          <Route path="/factura" element={<ListaFacturas />} />
          <Route path="/factura/:id" element={<FacturaDetalle />} />
          <Route path="/factura/add" element={<FacturaCreate />} />
          <Route path="/factura/edit/:id" element={<FacturaUpdate />} />

          <Route path="/ajustes" element={<Configuracion />} />
          <Route path="/cerrarSesion" element={<Logout />} />

          <Route path="/estadisticas" element={<Stats />} />

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
