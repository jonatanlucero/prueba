// src/layouts/AdminLayout.jsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Home, Users, Bell, Settings, ChevronDown, ChevronRight } from "lucide-react";
import NavItem from "../components/NavItem";
import SubNavItem from "../components/SubNavItem";
import { useNotificaciones } from "../context/NotificacionesContext";

export default function AdminLayout() {
  const [usuariosOpen, setUsuariosOpen] = useState(false);
  const { pendientesCount } = useNotificaciones();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-orange-500 mb-10">Vivenza</h1>
        <h2 className="text-sm text-gray-600">Administración de barrios privados</h2>
        <nav className="space-y-2 mt-6">
          <NavItem icon={<Home />} label="Inicio" to="/admin" />

          {/* Submenú Usuarios */}
          <div>
            <button
              onClick={() => setUsuariosOpen(!usuariosOpen)}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700 hover:text-orange-500 transition"
            >
              <div className="flex items-center space-x-2">
                <Users />
                <span className="font-medium">Usuarios</span>
              </div>
              {usuariosOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>

            {usuariosOpen && (
              <div className="ml-8 mt-1 space-y-1">
                <SubNavItem label="Lista de usuarios" to="/admin/usuarios/lista" />
                <SubNavItem label="Agregar usuario" to="/admin/usuarios" />
              </div>
            )}
          </div>

          <NavItem
            icon={<Bell />}
            label="Notificaciones"
            to="/admin/notificaciones"
            badge={pendientesCount}
          />
          <NavItem icon={<Settings />} label="Configuración" to="/admin/configuracion" />
        </nav>
      </aside>

      {/* Contenido dinámico */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
