"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [modoOscuro, setModoOscuro] = useState(false);

  useEffect(() => {
    // Lee el estado real recién en el cliente: el script inline de layout.tsx
    // es quien decide la clase "dark" antes del primer render para evitar parpadeo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setModoOscuro(document.documentElement.classList.contains("dark"));
  }, []);

  function alternarTema() {
    const nuevoModoOscuro = !modoOscuro;
    document.documentElement.classList.toggle("dark", nuevoModoOscuro);
    try {
      localStorage.setItem("tema", nuevoModoOscuro ? "dark" : "light");
    } catch {}
    setModoOscuro(nuevoModoOscuro);
  }

  return (
    <button
      onClick={alternarTema}
      aria-label={modoOscuro ? "Cambiar a modo día" : "Cambiar a modo noche"}
      className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors"
    >
      {modoOscuro ? <Sun className="w-4.5 h-4.5" aria-hidden="true" /> : <Moon className="w-4.5 h-4.5" aria-hidden="true" />}
    </button>
  );
}
