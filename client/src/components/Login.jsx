import { useForm } from "react-hook-form";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("Datos enviados:", data);
    try {
      const response = await apiClient.post("/login", data);
      console.log("el valor del res", response);
      const usuario = response.data;
      if (!usuario) {
        // Por las dudas, si viene vacío igual mostramos error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Usuario o contraseña incorrectos",
          confirmButtonColor: "#f97316",
        });
        return;
      }

      // Redirigir con usuario
      navigate("/bienvenida", { state: { usuario } });

      console.log("Respuesta del servidor:", response.data);

      // Redirigir y pasar los datos del usuario
      navigate("/bienvenida", { state: { usuario: response.data } });
    } catch (error) {
      const mensaje =
        error.response?.data?.message ||
        "No se pudo iniciar sesión. Verificá tu conexión o credenciales.";

      Swal.fire({
        icon: "error",
        title: "Error",
        text: mensaje,
        confirmButtonColor: "#f97316",
      });
    }
  };

  return (
    // Contenedor principal para centrar el login
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4">
        <div className="backdrop-blur-md bg-white/70 border border-white/30 shadow-xl rounded-3xl p-8 md:p-10 w-full">
          {/* LOGO / TITULO */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              <span className="text-orange-500">Vivenza</span>
            </h1>
            <h2 className="text-xl font-bold ">Gestor de Barrios Privados</h2>
            <p className="text-sm text-gray-500 mt-4">Accedé a tu cuenta</p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email requerido" })}
                className="w-full border-b-2 border-gray-300 bg-transparent focus:border-orange-500 focus:outline-none py-2 px-1 text-gray-700 placeholder-gray-400 transition-all duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <input
                type="password"
                placeholder="Contraseña"
                {...register("password", {
                  required: "Contraseña requerida",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                className="w-full border-b-2 border-gray-300 bg-transparent focus:border-orange-500 focus:outline-none py-2 px-1 text-gray-700 placeholder-gray-400 transition-all duration-300"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-2 rounded-xl font-semibold shadow-md transition duration-300"
            >
              Ingresar
            </button>
            {/* Link para recuperar contraseña */}
            <div className="mt-1 text-right">
              <a
                href="#" // Enlace a la página de recuperación de contraseña
                className="text-xs< text-gray-500 hover:text-orange-500 font-semibold transition duration-300"
              >
                Olvidé mi contraseña
              </a>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-xs text-center text-gray-400">
            © {new Date().getFullYear()} Desarrollado por{" "}
            <span className="font-extrabold">Punchy</span>Dev
          </div>
        </div>
      </div>
    </div>
  );
}
