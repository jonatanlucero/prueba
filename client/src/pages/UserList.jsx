// src/pages/UserList.jsx
import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function UserList() {
  const [usuarios, setUsuarios] = useState([]);

  // Simulación de carga de datos (esto después lo reemplazás con fetch/axios)
  useEffect(() => {
    setUsuarios([
      { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "Administrador" },
      { id: 2, nombre: "María Gómez", email: "maria@example.com", rol: "Vecino" },
      { id: 3, nombre: "Carlos Díaz", email: "carlos@example.com", rol: "Guardia" },
    ]);
  }, []);

  const eliminarUsuario = (id) => {
    if (window.confirm("¿Seguro que querés eliminar este usuario?")) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Lista de Usuarios</h2>
          <Link
            to="/usuarios"
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            <Plus size={18} /> Agregar Usuario
          </Link>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="p-3">Nombre</th>
                <th className="p-3">Email</th>
                <th className="p-3">Rol</th>
                <th className="p-3 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length > 0 ? (
                usuarios.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{u.nombre}</td>
                    <td className="p-3">{u.email}</td>
                    <td className="p-3">{u.rol}</td>
                    <td className="p-3 text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => alert(`Editar usuario: ${u.nombre}`)}
                          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => eliminarUsuario(u.id)}
                          className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center text-gray-500 py-6"
                  >
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
