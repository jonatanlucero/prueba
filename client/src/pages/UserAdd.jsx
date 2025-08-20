// src/pages/UserAdd.jsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Save, ArrowLeft } from "lucide-react";

export default function UserAdd() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log("Nuevo usuario:", data);
    // Acá iría el fetch o axios POST a tu API
    navigate("/usuarios/lista"); // Redirige después de guardar
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Agregar Usuario</h2>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-500"
          >
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              {...register("nombre", { required: "El nombre es obligatorio" })}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.nombre && (
              <p className="text-red-500 text-xs mt-1">{errors.nombre.message}</p>
            )}
          </div>
          

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "El email es obligatorio",
                pattern: { value: /^\S+@\S+$/i, message: "Email inválido" }
              })}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Rol */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Rol</label>
            <select
              {...register("rol", { required: "Seleccioná un rol" })}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            >
              <option value="">-- Seleccionar --</option>
              <option value="admin">Administrador</option>
              <option value="guardia">Guardia</option>
              <option value="vecino">Vecino</option>
            </select>
            {errors.rol && (
              <p className="text-red-500 text-xs mt-1">{errors.rol.message}</p>
            )}
          </div>

          {/* Botón Guardar */}
          <div className="pt-4">
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
            >
              <Save size={18} /> Guardar Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
