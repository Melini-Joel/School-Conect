// app/components/PerfilLateral.tsx
"use client";

import Link from "next/link";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";

export default function PerfilLateral() {
  const { usuario, cargando } = useUsuarioActual();

  if (cargando) return null;

  if (!usuario) {
    return (
      <div className="border rounded-xl p-4 text-center">
        <p className="text-slate-500 text-sm mb-3">No iniciaste sesión</p>
        <Link href="/login" className="text-indigo-500 font-medium text-sm">
          Ingresar →
        </Link>
      </div>
    );
  }

  return (
    <Link href={`/usuarios/${usuario.slug}`} className="block">
      <div className="border rounded-xl p-4 text-center bg-white hover:shadow-md transition-shadow duration-300">
        <div className="w-16 h-16 mx-auto rounded-full bg-indigo-500 text-white flex items-center justify-center text-2xl font-bold">
          {usuario.nombre.charAt(0).toUpperCase()}
        </div>
        <h3 className="font-semibold mt-3">{usuario.nombre}</h3>
        <p className="text-slate-500 text-sm">{usuario.curso}</p>
        <p className="text-slate-400 text-xs mt-2">{usuario.bio}</p>
      </div>
    </Link>
  );
}