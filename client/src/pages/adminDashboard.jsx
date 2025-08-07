import {
  Home,
  Users,
  Bell,
  Settings,
  AlertCircle,
  CalendarCheck,
  Wrench,
  Megaphone,
  MessageCircle,
  Car,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import CountUp from 'react-countup';

export default function Dashboard() {
  const [notificaciones, setNotificaciones] = useState(4);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <h1 className="text-2xl font-extrabold text-orange-500 mb-10">
          Vivenza
        </h1>
        <h2>Administracion de barrios privados</h2>
        <nav className="space-y-4">
          <NavItem icon={<Home />} label="Inicio" />
          <NavItem icon={<Users />} label="Usuarios" />
          <NavItem
            icon={<Bell />}
            label="Notificaciones"
            badge={notificaciones}
          />
          <NavItem icon={<Settings />} label="Configuración" />
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 space-y-10">
        <header>
          <h2 className="text-3xl font-bold text-gray-800">Panel de Administración</h2>
          <p className="text-gray-500 mt-1">Resumen general del barrio privado</p>
        </header>

        {/* 1. Resumen general */}
        <section>
          <h3 className="text-xl font-semibold mb-4">📊 Resumen general</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Vecinos registrados" value="128" icon={<Users />} color="blue" />
            <Card title="Reclamos pendientes" value="5" icon={<AlertCircle />} color="red" />
            <Card title="Servicios en mantenimiento" value="2" icon={<Wrench />} color="yellow" />
            <Card title="Notificaciones nuevas" value={notificaciones} icon={<Bell />} color="orange" />
          </div>
        </section>

        {/* 2. Eventos del barrio */}
        <section>
          <h3 className="text-xl font-semibold mb-4">📅 Agenda del barrio</h3>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <ul className="list-disc list-inside space-y-2">
              <li>🧑‍💼 Reunión de consorcio - 10/08 - 19:00hs</li>
              <li>🎾 Torneo de pádel - 12/08 - 16:00hs</li>
              <li>🍖 Reserva del quincho - 14/08 por familia Gómez</li>
            </ul>
          </div>
        </section>

        {/* 3. Últimos reclamos */}
        <section>
          <h3 className="text-xl font-semibold mb-4">🛠️ Últimos reclamos</h3>
          <div className="bg-white p-4 rounded-xl shadow-md space-y-2">
            <Reclamo desc="Luz quemada en plaza central" estado="Pendiente" />
            <Reclamo desc="Portón vehicular no abre" estado="En curso" />
            <Reclamo desc="Zanja con agua estancada" estado="Resuelto" />
          </div>
        </section>

        {/* 4. Control de accesos */}
        <section>
          <h3 className="text-xl font-semibold mb-4">🏠 Control de accesos</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card title="Visitas hoy" value="12" icon={<Users />} color="green" />
            <Card title="Vehículos autorizados" value="34" icon={<Car />} color="gray" />
            <Card title="Guardias activos" value="3" icon={<ShieldCheck />} color="indigo" />
          </div>
        </section>

        {/* 5. Comunicados importantes */}
        <section>
          <h3 className="text-xl font-semibold mb-4">💬 Comunicados importantes</h3>
          <div className="space-y-3">
            <div className="bg-orange-100 border-l-4 border-orange-500 p-4 rounded">
              <p className="text-sm text-gray-800 font-medium">🔌 Corte de luz programado el 11/08 de 08:00 a 10:00</p>
            </div>
            <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded">
              <p className="text-sm text-gray-800 font-medium">🚰 Posible baja presión de agua por mantenimiento</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function NavItem({ icon, label, badge }) {
  return (
    <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md transition">
      <div className="flex items-center space-x-2 text-gray-700 group-hover:text-orange-500">
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      {badge > 0 && (
        <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div className="bg-white shadow-sm rounded-xl p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">
            <CountUp end={parseInt(value)} duration={1.5} separator="." />
            </p>
      </div>
      <div className={`bg-${color}-100 p-2 rounded-full`}>{icon}</div>
    </div>
  );
}

function Reclamo({ desc, estado }) {
  const estadoColor = {
    Pendiente: "text-red-500",
    "En curso": "text-yellow-500",
    Resuelto: "text-green-600",
  };
  return (
    <div className="flex justify-between items-center text-sm">
      <p className="text-gray-700">🔧 {desc}</p>
      <p className={`font-semibold ${estadoColor[estado]}`}>{estado}</p>
    </div>
  );
}