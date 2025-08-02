import { useForm } from "react-hook-form";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Datos enviados:", data);
  };

  return (
    // Contenedor principal para centrar el login
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-4">
        <div className="backdrop-blur-md bg-white/70 border border-white/30 shadow-xl rounded-3xl p-8 md:p-10 w-full">
          {/* LOGO / TITULO */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
              <span className="text-orange-500">Barrio</span> Cerro de la
              Capilla
            </h1>
            <p className="text-sm text-gray-500 mt-1">Accedé a tu cuenta</p>
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
          </form>

          {/* Footer */}
          <div className="mt-6 text-xs text-center text-gray-400">
            © {new Date().getFullYear()} Barrio Cerro de la Capilla
          </div>
        </div>
      </div>
    </div>
  );
}
