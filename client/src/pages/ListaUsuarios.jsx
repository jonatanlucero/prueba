// src/pages/ListaUsuarios.jsx
import { useState, useEffect } from "react"; // 1. Importa useEffect
import apiClient from "../api/apiClient";

export default function ListaUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Opcional: estado de carga para mostrar un spinner/mensaje de "cargando"
  const [error, setError] = useState(null); // Opcional: estado para manejar errores

  // 2. Usa useEffect para cargar los datos
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await apiClient.get("/usuarios");
        setListaUsuarios(response.data);
        setIsLoading(false); // Desactiva el loader
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
        setError("Error al cargar los usuarios. Por favor, intente de nuevo."); // Guarda el error
        setIsLoading(false); // Desactiva el loader incluso si hay un error
      }
    };
    fetchUsuarios();
  }, []); // 3. El array de dependencias vacío [] asegura que se ejecute solo una vez

  // Opcional: Muestra un mensaje de carga o de error
  if (isLoading) {
    return <div className="text-center mt-8">Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Lista de Usuarios</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre y Apellido</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Domicilio</th>
            <th className="p-2 border">Teléfono</th>
            <th className="p-2 border">Rol</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.length > 0 ? (
            listaUsuarios.map((u) => (
              <tr key={u.id}>
                <td className="p-2 border">{u.id}</td>
                <td className="p-2 border capitalize">{u.nombre} {u.apellido}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">Manzana: {u.manzana} Casa: {u.casa}</td>
                <td className="p-2 border">{u.telefono}</td>
                <td className="p-2 border">{u.rol}</td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center p-4 text-gray-500">
                No hay usuarios registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}