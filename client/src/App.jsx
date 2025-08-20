import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NotificacionesProvider } from "./context/NotificacionesContext";

import Login from "./components/Login";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AgregarUsuario from "./pages/AgregarUsuario";
import ListaUsuarios from "./pages/ListaUsuarios";
import Notificaciones from "./pages/Notificaciones";
import Configuracion from "./pages/Configuracion";

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
            <Route path="notificaciones" element={<Notificaciones />} />
            <Route path="configuracion" element={<Configuracion />} />
          </Route>
        </Routes>
      </Router>
    </NotificacionesProvider>
  );
}

export default App;
