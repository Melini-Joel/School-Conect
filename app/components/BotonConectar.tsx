"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Lock } from "lucide-react";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import { obtenerContacto } from "@/app/lib/contacto";
import type { Contacto, Usuario } from "@/types/usuario";

export default function BotonContacto({ usuario }: { usuario: Usuario }) {
  const { firebaseUser, cargando } = useUsuarioActual();
  const [contacto, setContacto] = useState<Contacto | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [error, setError] = useState("");

  async function mostrarContacto() {
    setBuscando(true);
    setError("");
    try {
      setContacto(await obtenerContacto(usuario));
    } catch {
      setError("No se pudo cargar el contacto.");
    } finally {
      setBuscando(false);
    }
  }

  if (cargando) return null;

  if (!firebaseUser) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
      >
        <Lock className="w-4 h-4" aria-hidden="true" />
        Iniciá sesión para ver el contacto
      </Link>
    );
  }

  if (contacto) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-indigo-50 dark:bg-indigo-500/10 text-sm flex flex-col gap-1 text-slate-700 dark:text-slate-200">
        {!contacto.email && !contacto.telefono && <p>No cargó datos de contacto.</p>}
        {contacto.email && (
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            {contacto.email}
          </p>
        )}
        {contacto.telefono && (
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            {contacto.telefono}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={mostrarContacto}
        disabled={buscando}
        className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
      >
        {buscando ? "Cargando..." : "Ver contacto"}
      </button>
      {error && <p className="text-red-500 dark:text-red-400 text-xs">{error}</p>}
    </div>
  );
}
