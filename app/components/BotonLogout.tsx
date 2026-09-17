// app/components/BotonLogout.tsx
"use client";

import { useState } from "react";
import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";

export default function BotonLogout() {
  const [mostrarAviso, setMostrarAviso] = useState(false);

  async function cerrarSesion() {
    await signOut(auth);
    setMostrarAviso(true);
    setTimeout(() => setMostrarAviso(false), 3000);
  }

  return (
    <>
      <button
        onClick={cerrarSesion}
        className="text-sm text-slate-600 hover:text-red-500 transition-colors"
      >
        Cerrar sesión
      </button>

      {mostrarAviso && (
        <div className="fixed bottom-6 right-6 bg-slate-800 text-white text-sm px-4 py-2 rounded-lg shadow-lg animate-fade-in z-50">
          Sesión cerrada con éxito
        </div>
      )}
    </>
  );
}