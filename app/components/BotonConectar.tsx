"use client";

import { useState } from "react";

type Props = {
  email?: string;
  telefono?: string;
};

export default function BotonContacto({ email, telefono }: Props) {
  const [mostrar, setMostrar] = useState(false);

  if (!email && !telefono) return null;

  if (mostrar) {
    return (
      <div className="border rounded-lg p-3 bg-indigo-50 text-sm flex flex-col gap-1">
        {email && <p>📧 {email}</p>}
        {telefono && <p>📱 {telefono}</p>}
      </div>
    );
  }

  return (
    <button
      onClick={() => setMostrar(true)}
      className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
    >
      Ver contacto
    </button>
  );
}