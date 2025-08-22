// src/pages/Error504.jsx
import React from 'react';

export default function Error504() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-6xl font-bold text-orange-500 mb-4">504</h1>
        <h2 className="text-3xl font-semibold mb-2">Gateway Timeout</h2>
        <p className="text-lg text-gray-600 mb-4">
          El servidor tardó demasiado en responder. Por favor, intenta de nuevo más tarde.
        </p>
        <p className="text-sm text-gray-400">
          Puede ser un problema temporal.
        </p>
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