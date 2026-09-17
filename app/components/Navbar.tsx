// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import BotonLogout from "./BotonLogout";

export default function Navbar() {
  const pathname = usePathname();
  const { usuario, cargando } = useUsuarioActual();

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-indigo-500 flex items-center gap-2">
        🎓 School-Conect
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          href="/usuarios"
          className={`transition-colors ${
            pathname === "/usuarios" ? "text-indigo-500" : "text-slate-600 hover:text-indigo-500"
          }`}
        >
          Usuarios
        </Link>

        {!cargando && (
          usuario ? (
            <BotonLogout />
          ) : (
            <Link href="/login" className="text-slate-600 hover:text-indigo-500 transition-colors">
              Ingresar
            </Link>
          )
        )}
      </div>
    </header>
  );
}