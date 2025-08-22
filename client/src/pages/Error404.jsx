import React from 'react';
// import VivenzaLogo from '../../public/images/vivenza-logo.png'; // Asume que el logo está en esta ruta. ¡Ajusta si es diferente!

export default function Error404() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        {/* Logo de Vivenza */}
        {/* <img
          src={VivenzaLogo}
          alt="Logo Vivenza"
          className="h-20 mb-6 mx-auto"
        /> */}

        {/* Título y mensaje de error */}
        <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-2">Página no encontrada</h2>
        <p className="text-lg text-gray-600 mb-4">
          La página que buscas no existe. Es posible que la dirección haya sido escrita incorrectamente o que la página haya sido movida.
        </p>

        {/* Botón para volver al inicio */}
        <a 
          href="/" 
          className="mt-6 inline-block bg-orange-500 text-white px-6 py-2 rounded-full font-medium hover:bg-orange-600 transition"
        >
          Volver al inicio
        </a>
      </div>
    </div>
  );
}