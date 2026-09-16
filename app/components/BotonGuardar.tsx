"use client";

import { useState } from "react";

export default function BotonGuardar() {
  const [guardado, setGuardado] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setGuardado(!guardado);
      }}
      className="bg-stone-300 text-black px-4 py-2 rounded-lg hover:bg-[#7b5e8c] transition-colors duration-300"
    >
      {guardado ? "Guardado :>" : "Guardar :<"}
    </button>
  );
}