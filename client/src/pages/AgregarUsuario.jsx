// src/pages/AgregarUsuario.jsx
import { useState } from "react";
import { useForm } from "react-hook-form";
import apiClient from "../api/apiClient";

export default function AgregarUsuario() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  // 1. Agregar el estado de carga
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    // 2. Establecer el estado a true al iniciar la petición
    setIsLoading(true);

    try {
      const response = await apiClient.post("/usuarios", data);
      alert("Usuario agregado correctamente ✅");
      console.log("Respuesta backend:", response.data);
      reset();
    } catch (error) {
      console.error("Error al agregar usuario:", error);
      alert("❌ Error al agregar usuario");
    } finally {
      // 3. Establecer el estado a false al finalizar la petición (sea éxito o error)
      setIsLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Agregar Usuario
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Nombre */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Nombre</label>
            <input
              type="text"
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.nombre && (
              <p className="text-red-500 text-sm mt-1">{errors.nombre.message}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Apellido</label>
            <input
              type="text"
              {...register("apellido", {
                required: "El apellido es obligatorio",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.apellido && (
              <p className="text-red-500 text-sm mt-1">{errors.apellido.message}</p>
            )}
          </div>

          {/* Manzana */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Manzana</label>
            <input
              type="text"
              {...register("manzana", {
                required: "La manzana es obligatoria",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.manzana && (
              <p className="text-red-500 text-sm mt-1">{errors.manzana.message}</p>
            )}
          </div>

          {/* Casa */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Casa</label>
            <input
              type="text"
              {...register("casa", {
                required: "La casa es obligatoria",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.casa && (
              <p className="text-red-500 text-sm mt-1">{errors.casa.message}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
            <input
              type="tel"
              {...register("telefono", {
                required: "El teléfono es obligatorio",
                pattern: {
                  value: /^[0-9]{7,15}$/,
                  message: "Número inválido",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.telefono && (
              <p className="text-red-500 text-sm mt-1">{errors.telefono.message}</p>
            )}
          </div>

          {/* Rol */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Rol</label>
            <select
              {...register("rol", { required: "El rol es obligatorio" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-400 focus:outline-none"
            >
              <option value="">Seleccionar rol</option>
              <option value="propietario">Propietario</option>
              <option value="inquilino">Inquilino</option>
              {/* <option value="usuario">Usuario</option> */}
            </select>
            {errors.rol && (
              <p className="text-red-500 text-sm mt-1">{errors.rol.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Email no válido",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Contraseña */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contraseña</label>
            <input
              type="password"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Repetir contraseña */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Repetir contraseña
            </label>
            <input
              type="password"
              {...register("password2", {
                required: "Debe repetir la contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none"
            />
            {errors.password2 && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password2.message}
              </p>
            )}
          </div>

          {/* Botón ocupa toda la fila */}
          <div className="col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={isLoading} // Deshabilita el botón mientras carga
              className={`w-full text-white py-3 rounded-lg font-semibold transition ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed" // Estilos cuando está cargando
                  : "bg-orange-500 hover:bg-orange-600" // Estilos normales
              }`}
            >
              {isLoading ? "Agregando..." : "Agregar Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}