// app/components/SugerenciasUsuarios.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import TarjetaUsuario from "./TarjetaUsuario";
import type { Usuario } from "@/types/usuario";

export default function SugerenciasUsuarios({ usuarios }: { usuarios: Usuario[] }) {
  const [busqueda, setBusqueda] = useState("");

  const filtrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-slate-600 text-sm">Gente que quizás conozcas</h3>

      <input
        type="text"
        placeholder="Buscar por nombre..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border rounded-lg p-2 text-sm"
      />

      {filtrados.length === 0 && (
        <p className="text-slate-400 text-xs">No se encontró nadie con ese nombre.</p>
      )}

      {filtrados.map((u) => (
        <Link key={u.slug} href={`/usuarios/${u.slug}`}>
          <TarjetaUsuario nombre={u.nombre} curso={u.curso} bio={u.bio} />
        </Link>
      ))}
    </div>
  );
}