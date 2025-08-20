// src/pages/AdminDashboard.jsx
import { Users, AlertCircle, Wrench, Bell } from "lucide-react";
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { list } from "postcss";

export default function AdminDashboard() {
const [listaUsuarios, setListaUsuarios] = useState([]);
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await apiClient.get("/usuarios");
        setListaUsuarios(response.data);
        // setIsLoading(false); // Desactiva el loader
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        // setError("Error al cargar los usuarios. Por favor, intente de nuevo."); // Guarda el error
        // setIsLoading(false); // Desactiva el loader incluso si hay un error
      }
    };
    fetchUsuarios();
  }, []); // 3. El array de dependencias vacío [] asegura que se ejecute solo una vez
  return (
    <>
      <header>
        <h2 className="text-3xl font-bold text-gray-800">
          Panel de Administración
        </h2>
        <p className="text-gray-500 mt-1">Resumen general del barrio privado</p>
      </header>

      <section className="mt-6">
        <h3 className="text-xl font-semibold mb-4">📊 Resumen general</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card
            title="Vecinos registrados"
            value={listaUsuarios.length}
            icon={<Users />}
            color="blue"
          />
          <Card
            title="Reclamos pendientes"
            value="5"
            icon={<AlertCircle />}
            color="red"
          />
          <Card
            title="Servicios en mantenimiento"
            value="2"
            icon={<Wrench />}
            color="yellow"
          />
          <Card
            title="Notificaciones nuevas"
            value="4"
            icon={<Bell />}
            color="orange"
          />
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
