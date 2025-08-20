// src/context/NotificacionesContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const NotificacionesContext = createContext();

export const useNotificaciones = () => useContext(NotificacionesContext);

export const NotificacionesProvider = ({ children }) => {
  const [notificaciones, setNotificaciones] = useState([]);

  useEffect(() => {
    // Simular fetch de API
    const data = [
      { id: 1, mensaje: "Reclamo de agua pendiente", fecha: "2025-08-14", leida: false },
      { id: 2, mensaje: "Reunión del consorcio el sábado", fecha: "2025-08-12", leida: true },
      { id: 3, mensaje: "Aviso de mantenimiento en el portón", fecha: "2025-08-10", leida: false },
    ];
    setNotificaciones(data);
  }, []);

  const marcarLeida = (id) => {
    setNotificaciones((prev) =>
      prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
  };

  const eliminarNotificacion = (id) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
  };

  const pendientesCount = notificaciones.filter((n) => !n.leida).length;

  return (
    <NotificacionesContext.Provider
      value={{ notificaciones, marcarLeida, eliminarNotificacion, pendientesCount }}
    >
      {children}
    </NotificacionesContext.Provider>
  );
};
