import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificacionesProvider } from "./context/NotificacionesContext";

import Login from "./components/Login";
import AdminLayout from "./layouts/AdminLayout";
// import AdminDashboard from "./pages/AdminDashboard";
import AgregarUsuario from "./pages/AgregarUsuario";
import ListaUsuarios from "./pages/ListaUsuarios";
import Notificaciones from "./pages/Notificaciones";
import Configuracion from "./pages/Configuracion";
import AdminDashboard from "./pages/adminDashboard";
import ListaBarrios from "./pages/ListaBarrios";
import Error504 from "./pages/Error504";
import Error404 from "./pages/Error404";

function App() {
  return (
    <NotificacionesProvider>
      <Router>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Rutas admin con sidebar */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="usuarios" element={<AgregarUsuario />} />
            <Route path="usuarios/lista" element={<ListaUsuarios />} />
            <Route path="barrios/lista" element={<ListaBarrios />} />
            <Route path="notificaciones" element={<Notificaciones />} />
            <Route path="configuracion" element={<Configuracion />} />
          </Route>
          {/* Rutas de error */}
          <Route path="/504" element={<Error504 />} />
          {/* Opcional: Ruta para manejar cualquier URL no encontrada (404) */}
          <Route path="*" element={<Error404/>}/>
        </Routes>
      </Router>
    </NotificacionesProvider>
  );
}

export default App;
