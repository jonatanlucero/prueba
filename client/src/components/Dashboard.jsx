import { Users, AlertCircle, Wrench, Bell } from "lucide-react";
import CountUp from 'react-countup';

export default function Dashboard() {
  return (
    <>
      <header>
        <h2 className="text-3xl font-bold text-gray-800">Panel de Administración</h2>
        <p className="text-gray-500 mt-1">Resumen general del barrio privado</p>
      </header>

      {/* Resumen general */}
      <section>
        <h3 className="text-xl font-semibold mb-4">📊 Resumen general</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Vecinos registrados" value="128" icon={<Users />} color="blue" />
          <Card title="Reclamos pendientes" value="5" icon={<AlertCircle />} color="red" />
          <Card title="Servicios en mantenimiento" value="2" icon={<Wrench />} color="yellow" />
          <Card title="Notificaciones nuevas" value="4" icon={<Bell />} color="orange" />
        </div>
      </section>
    </>
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
