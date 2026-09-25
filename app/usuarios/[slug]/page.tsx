"use client";

import { useState, useEffect, useRef, use } from "react";
import Link from "next/link";
import { Pencil, Eye } from "lucide-react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import EditarPerfil from "@/app/components/EditarPerfil";
import BotonContacto from "@/app/components/BotonConectar";
import Avatar from "@/app/components/Avatar";
import FotoPerfilEditable from "@/app/components/FotoPerfilEditable";
import BotonDescargarCV from "@/app/components/BotonDescargarCV";
import { OPCIONES_EXPERIENCIA, OPCIONES_ESTUDIOS, OPCIONES_HORARIO, periodoTrabajo } from "@/app/lib/opcionesCV";
import type { Usuario } from "@/types/usuario";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function UsuarioDetalle({ params }: PageProps) {
  const { slug } = use(params);
  const { usuario: usuarioActual } = useUsuarioActual();
  const [usuario, setUsuario] = useState<Usuario | null | undefined>(undefined);
  const [editando, setEditando] = useState(false);
  const visitaContada = useRef(false);

  useEffect(() => {
    async function cargar() {
      const usuarios = await obtenerUsuarios();
      const encontrado = usuarios.find((u) => u.slug === slug) ?? null;

      // Contador de visitas: suma 1 cada vez que se abre el perfil
      if (encontrado && !visitaContada.current) {
        visitaContada.current = true;
        try {
          await updateDoc(doc(db, "usuarios", encontrado.uid), { visitas: increment(1) });
          encontrado.visitas = (encontrado.visitas ?? 0) + 1;
        } catch (error) {
          console.error("No se pudo registrar la visita:", error);
        }
      }

      setUsuario(encontrado);
    }
    cargar();
  }, [slug]);

  if (usuario === undefined) {
    return <main className="flex-1 p-8 text-center text-slate-400 dark:text-slate-500">Cargando...</main>;
  }

  if (!usuario) {
    return (
      <main className="flex-1 p-8 text-center">
        <p className="text-slate-700 dark:text-slate-200">Usuario no encontrado</p>
        <Link href="/usuarios" className="text-indigo-500 dark:text-indigo-400">← Volver</Link>
      </main>
    );
  }

  const esMiPerfil = usuarioActual?.uid === usuario.uid;

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/usuarios" className="text-sm text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400">
        ← Volver
      </Link>

      <div className="mt-4 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <div className="h-28 bg-gradient-to-r from-indigo-400 to-indigo-600" />
        <div className="px-6 pb-6">
          {esMiPerfil && !editando ? (
            <FotoPerfilEditable
              usuario={usuario}
              tamanio={96}
              className="-mt-12"
              onCambio={(foto) => setUsuario({ ...usuario, foto })}
            />
          ) : (
            <Avatar
              nombre={usuario.nombre}
              foto={usuario.foto}
              tamanio={96}
              className="border-4 border-white dark:border-slate-800 -mt-12"
            />
          )}

          <div className="flex items-start justify-between mt-3">
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">{usuario.nombre}</h1>
              <span
                className={`inline-block text-xs font-medium px-2 py-1 rounded-full mt-1 ${
                  usuario.tipo === "empleador"
                    ? "bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    : "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                }`}
              >
                {usuario.tipo === "empleador" ? "Ofrece empleo" : "Busca empleo"}
              </span>
              <p className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                <Eye className="w-4 h-4" aria-hidden="true" />
                {usuario.visitas ?? 0} visitas
              </p>
            </div>

            {esMiPerfil && !editando && (
              <button
                onClick={() => setEditando(true)}
                className="inline-flex items-center gap-1.5 text-sm text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium"
              >
                <Pencil className="w-4 h-4" aria-hidden="true" />
                Editar
              </button>
            )}
          </div>

          {editando ? (
            <EditarPerfil
              usuario={usuario}
              onCerrar={() => setEditando(false)}
              onGuardado={setUsuario}
            />
          ) : (
            <>
              <p className="text-slate-600 dark:text-slate-300 mt-4">{usuario.bio}</p>

              {usuario.experiencias && usuario.experiencias.length > 0 ? (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Experiencia</h3>
                  <ul className="mt-2 flex flex-col gap-3 border-l-2 border-indigo-200 dark:border-indigo-500/30 pl-4">
                    {usuario.experiencias.map((t, i) => (
                      <li key={i}>
                        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
                          {[t.puesto, t.empresa].filter(Boolean).join(" · ")}
                        </p>
                        {periodoTrabajo(t) && (
                          <p className="text-xs text-slate-500 dark:text-slate-400">{periodoTrabajo(t)}</p>
                        )}
                        {t.descripcion && (
                          <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 whitespace-pre-line">{t.descripcion}</p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                usuario.experiencia && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Experiencia</h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 whitespace-pre-line">{usuario.experiencia}</p>
                  </div>
                )
              )}

              {usuario.estudios && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Estudios</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1 whitespace-pre-line">{usuario.estudios}</p>
                </div>
              )}

              {usuario.habilidades && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Habilidades</h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">{usuario.habilidades}</p>
                </div>
              )}

              {(usuario.aniosExperiencia || usuario.nivelEstudios || usuario.disponibilidadHorario || usuario.disponibleViajar) && (
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-200">Datos adicionales</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {usuario.aniosExperiencia && (
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
                        {OPCIONES_EXPERIENCIA.find((o) => o.value === usuario.aniosExperiencia)?.label}
                      </span>
                    )}
                    {usuario.nivelEstudios && (
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
                        {OPCIONES_ESTUDIOS.find((o) => o.value === usuario.nivelEstudios)?.label}
                      </span>
                    )}
                    {usuario.disponibilidadHorario && (
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
                        {OPCIONES_HORARIO.find((o) => o.value === usuario.disponibilidadHorario)?.label}
                      </span>
                    )}
                    {usuario.disponibleViajar && (
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full">
                         Disponible para viajar
                      </span>
                    )}
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {usuario.tipo === "busca-empleo" && <BotonDescargarCV usuario={usuario} />}
                {!esMiPerfil && <BotonContacto email={usuario.email} telefono={usuario.telefono} />}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}