// src/pages/Notificaciones.jsx
import { useNotificaciones } from "../context/NotificacionesContext";
import { Trash2, CheckCircle, Bell } from "lucide-react";

export default function Notificaciones() {
  const { notificaciones, marcarLeida, eliminarNotificacion } = useNotificaciones();

  return (
    <div>
      <h1 className="text-2xl font-bold flex items-center gap-2 mb-4">
        <Bell className="text-orange-500" /> Notificaciones
      </h1>
      <div className="bg-white shadow rounded-lg divide-y">
        {notificaciones.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">No hay notificaciones</p>
        ) : (
          notificaciones.map((n) => (
            <div
              key={n.id}
              className={`p-4 flex justify-between items-center ${
                n.leida ? "bg-gray-50" : "bg-orange-50"
              }`}
            >
              <div>
                <p className="font-medium">{n.mensaje}</p>
                <p className="text-xs text-gray-500">{n.fecha}</p>
              </div>
              <div className="flex gap-2">
                {!n.leida && (
                  <button
                    onClick={() => marcarLeida(n.id)}
                    className="p-2 rounded-full bg-green-100 hover:bg-green-200"
                    title="Marcar como leída"
                  >
                    <CheckCircle className="text-green-600" size={18} />
                  </button>
                )}
                <button
                  onClick={() => eliminarNotificacion(n.id)}
                  className="p-2 rounded-full bg-red-100 hover:bg-red-200"
                  title="Eliminar"
                >
                  <Trash2 className="text-red-600" size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
