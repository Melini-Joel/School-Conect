// app/usuarios/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";
import { obtenerPublicaciones } from "@/app/lib/obtenerPublicaciones";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import TarjetaPublicacion from "@/app/components/TarjetaPublicacion";
import EditarPerfil from "@/app/components/EditarPerfil";
import type { Usuario } from "@/types/usuario";
import type { Publicacion } from "@/types/publicacion";
import { use } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function UsuarioDetalle({ params }: PageProps) {
  const { slug } = use(params);
  const { usuario: usuarioActual } = useUsuarioActual();
  const [usuario, setUsuario] = useState<Usuario | null | undefined>(undefined);
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([]);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    async function cargar() {
      const usuarios = await obtenerUsuarios();
      const encontrado = usuarios.find((u) => u.slug === slug) ?? null;
      setUsuario(encontrado);

      if (encontrado) {
        const todas = await obtenerPublicaciones();
        setPublicaciones(todas.filter((p) => p.autorUid === encontrado.uid));
      }
    }
    cargar();
  }, [slug]);

  if (usuario === undefined) {
    return <main className="p-8 text-center text-slate-400">Cargando...</main>;
  }

  if (!usuario) {
    return (
      <main className="p-8 text-center">
        <p>Usuario no encontrado</p>
        <Link href="/" className="text-indigo-500">← Volver</Link>
      </main>
    );
  }

  const esMiPerfil = usuarioActual?.uid === usuario.uid;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-sm text-slate-500 hover:text-indigo-500">
        ← Volver
      </Link>

      <div className="mt-4 rounded-xl overflow-hidden border bg-white">
        <div className="h-28 bg-gradient-to-r from-indigo-400 to-indigo-600" />
        <div className="px-6 pb-6">
          <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-4xl font-bold border-4 border-white -mt-12">
            {usuario.nombre.charAt(0).toUpperCase()}
          </div>

          <div className="flex items-start justify-between mt-3">
            <div>
              <h1 className="text-2xl font-bold">{usuario.nombre}</h1>
              <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full mt-1">
                {usuario.curso}
              </span>
            </div>

            {esMiPerfil && !editando && (
              <button
                onClick={() => setEditando(true)}
                className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
              >
                ✏️ Editar
              </button>
            )}
          </div>

          {usuario.etiquetas && usuario.etiquetas.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {usuario.etiquetas.map((etiqueta) => (
                <span
                  key={etiqueta}
                  className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full"
                >
                  {etiqueta}
                </span>
              ))}
            </div>
          )}

          {editando ? (
            <EditarPerfil usuario={usuario} onCerrar={() => setEditando(false)} />
          ) : (
            <p className="text-slate-600 mt-4">{usuario.bio}</p>
          )}
        </div>
      </div>

      <h2 className="font-semibold text-slate-600 mt-8 mb-3">
        Publicaciones de {usuario.nombre}
      </h2>
      <div className="flex flex-col gap-4">
        {publicaciones.length === 0 && (
          <p className="text-slate-400 text-sm">Todavía no publicó nada.</p>
        )}
        {publicaciones.map((p) => (
          <TarjetaPublicacion key={p.id} {...p} />
        ))}
      </div>
    </main>
  );
}