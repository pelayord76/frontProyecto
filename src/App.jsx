import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ListaCliente } from "./components/cliente/ListaCliente";
import { Error404 } from "./components/errores/Error404";
import { ListaFacturas } from "./components/factura/ListaFacturas";
import { Index } from "./components/inicio/Index";
import { Maquina } from "./components/maquina/Maquina";
import { MaquinaCreate } from "./components/maquina/MaquinaCreate";
import { MaquinaDetalle } from "./components/maquina/MaquinaDetalle";
import { MaquinaUpdate } from "./components/maquina/MaquinaUpdate";
import { ListaRecaudaciones } from "./components/recaudacion/ListaRecaudaciones";
import { Stats } from "./components/stats/Stats";
import { ListaUsuario } from "./components/usuario/ListaUsuario";
import { UsuarioAdd } from "./components/usuario/UsuarioAdd";
import { UsuarioEdit } from "./components/usuario/UsuarioEdit";
import { RecaudacionDetalle } from "./components/recaudacion/RecaudacionDetalle";
import { RecaudacionCreate } from "./components/recaudacion/RecaudacionCreate";
import { RecaudacionUpdate } from "./components/recaudacion/RecaudacionUpdate";
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
          <Route path="/usuario/:id" element={<ListaUsuario />} />
          <Route path="/usuario/add" element={<UsuarioAdd />} />
          <Route path="/usuario/edit/:id" element={<UsuarioEdit />} />

          <Route path="/cliente" element={<ListaCliente />} />
          <Route path="/cliente/:id" />
          <Route path="/cliente/add" />
          <Route path="/cliente/edit/:id" />

          <Route path="/maquina" element={<Maquina />} />
          <Route path="/maquina/:id" element={<MaquinaDetalle />} />
          <Route path="/maquina/add" element={<MaquinaCreate />} />
          <Route path="/maquina/edit/:id" element={<MaquinaUpdate />} />

          <Route path="/recaudacion" element={<ListaRecaudaciones />} />
          <Route path="/recaudacion/:id" element={<RecaudacionDetalle />} />
          <Route path="/recaudacion/add" element={<RecaudacionCreate />} />
          <Route path="/recaudacion/edit/:id" element={<RecaudacionUpdate />} />

          <Route path="/factura" element={<ListaFacturas />} />
          <Route path="/factura/:id" />
          <Route path="/factura/add" />
          <Route path="/factura/edit/:id" />

          <Route path="/perfil" element={<Index />} />
          <Route path="/ajustes" element={<Index />} />
          <Route path="/cerrarSesion" element={<Index />} />

          <Route path="/estadisticas" element={<Stats />} />

          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
