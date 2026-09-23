"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Lock } from "lucide-react";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";

type Props = {
  email?: string;
  telefono?: string;
};

export default function BotonContacto({ email, telefono }: Props) {
  const { firebaseUser, cargando } = useUsuarioActual();
  const [mostrar, setMostrar] = useState(false);

  if (!email && !telefono) return null;
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

  if (mostrar) {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-indigo-50 dark:bg-indigo-500/10 text-sm flex flex-col gap-1 text-slate-700 dark:text-slate-200">
        {email && (
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            {email}
          </p>
        )}
        {telefono && (
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            {telefono}
          </p>
        )}
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
