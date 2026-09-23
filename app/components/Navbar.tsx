// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import BotonLogout from "./BotonLogout";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const { usuario, firebaseUser, cargando } = useUsuarioActual();

  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-indigo-500 flex items-center gap-2">
        <GraduationCap className="w-5 h-5" aria-hidden="true" />
        School-Conect
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link
          href="/usuarios"
          className={`transition-colors ${
            pathname === "/usuarios" ? "text-indigo-500" : "text-slate-600 dark:text-slate-300 hover:text-indigo-500"
          }`}
        >
          Usuarios
        </Link>

        {!cargando && firebaseUser && (
          <Link
            href={usuario ? `/usuarios/${usuario.slug}` : "/login"}
            className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors"
          >
            Mi perfil
          </Link>
        )}

        {!cargando && (
          firebaseUser ? (
            <BotonLogout />
          ) : (
            <Link href="/login" className="text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-colors">
              Ingresar
            </Link>
          )
        )}

        <ThemeToggle />
      </div>
    </header>
  );
}