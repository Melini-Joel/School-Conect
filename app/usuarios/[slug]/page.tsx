"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import EditarPerfil from "@/app/components/EditarPerfil";
import BotonContacto from "@/app/components/BotonConectar";
import { OPCIONES_EXPERIENCIA, OPCIONES_ESTUDIOS, OPCIONES_HORARIO } from "@/app/lib/opcionesCV";
import type { Usuario } from "@/types/usuario";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function UsuarioDetalle({ params }: PageProps) {
  const { slug } = use(params);
  const { usuario: usuarioActual } = useUsuarioActual();
  const [usuario, setUsuario] = useState<Usuario | null | undefined>(undefined);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    async function cargar() {
      const usuarios = await obtenerUsuarios();
      setUsuario(usuarios.find((u) => u.slug === slug) ?? null);
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
        <Link href="/usuarios" className="text-indigo-500">← Volver</Link>
      </main>
    );
  }

  const esMiPerfil = usuarioActual?.uid === usuario.uid;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/usuarios" className="text-sm text-slate-500 hover:text-indigo-500">
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
              <span
                className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                  usuario.tipo === "empleador" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                }`}
              >
                {usuario.tipo === "empleador" ? "Ofrece empleo" : "Busca empleo"}
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

          {editando ? (
            <EditarPerfil usuario={usuario} onCerrar={() => setEditando(false)} />
          ) : (
            <>
              <p className="text-slate-600 mt-4">{usuario.bio}</p>

              {usuario.experiencia && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700">Experiencia</h3>
                  <p className="text-slate-600 text-sm mt-1 whitespace-pre-line">{usuario.experiencia}</p>
                </div>
              )}

              {usuario.estudios && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700">Estudios</h3>
                  <p className="text-slate-600 text-sm mt-1 whitespace-pre-line">{usuario.estudios}</p>
                </div>
              )}

              {usuario.habilidades && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700">Habilidades</h3>
                  <p className="text-slate-600 text-sm mt-1">{usuario.habilidades}</p>
                </div>
              )}

              {(usuario.aniosExperiencia || usuario.nivelEstudios || usuario.disponibilidadHorario || usuario.disponibleViajar) && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700">Datos adicionales</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {usuario.aniosExperiencia && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                        {OPCIONES_EXPERIENCIA.find((o) => o.value === usuario.aniosExperiencia)?.label}
                      </span>
                    )}
                    {usuario.nivelEstudios && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                        {OPCIONES_ESTUDIOS.find((o) => o.value === usuario.nivelEstudios)?.label}
                      </span>
                    )}
                    {usuario.disponibilidadHorario && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                        {OPCIONES_HORARIO.find((o) => o.value === usuario.disponibilidadHorario)?.label}
                      </span>
                    )}
                    {usuario.disponibleViajar && (
                      <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                         Disponible para viajar
                      </span>
                    )}
                  </div>
                </div>
              )}

              {!esMiPerfil && (
                <div className="mt-6">
                  <BotonContacto email={usuario.email} telefono={usuario.telefono} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}