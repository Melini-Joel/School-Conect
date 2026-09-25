// app/components/ListaUsuarios.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import TarjetaUsuario from "@/app/components/TarjetaUsuario";
import { OPCIONES_EXPERIENCIA, OPCIONES_ESTUDIOS, OPCIONES_HORARIO } from "@/app/lib/opcionesCV";
import type { Usuario } from "@/types/usuario";

export default function ListaUsuarios({ usuarios }: { usuarios: Usuario[] }) {
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "busca-empleo" | "empleador">("todos");
  const [filtroExperiencia, setFiltroExperiencia] = useState("");
  const [filtroEstudios, setFiltroEstudios] = useState("");
  const [filtroHorario, setFiltroHorario] = useState("");
  const [soloDisponiblesViajar, setSoloDisponiblesViajar] = useState(false);

  const filtrados = usuarios.filter((u) => {
    const texto = busqueda.toLowerCase();
    const coincideTexto =
      u.nombre.toLowerCase().includes(texto) || (u.habilidades ?? "").toLowerCase().includes(texto);
    const coincideTipo = filtroTipo === "todos" || u.tipo === filtroTipo;
    const coincideExperiencia = !filtroExperiencia || u.aniosExperiencia === filtroExperiencia;
    const coincideEstudios = !filtroEstudios || u.nivelEstudios === filtroEstudios;
    const coincideHorario = !filtroHorario || u.disponibilidadHorario === filtroHorario;
    const coincideViajar = !soloDisponiblesViajar || u.disponibleViajar === true;

    return (
      coincideTexto &&
      coincideTipo &&
      coincideExperiencia &&
      coincideEstudios &&
      coincideHorario &&
      coincideViajar
    );
  });

  function limpiarFiltros() {
    setBusqueda("");
    setFiltroTipo("todos");
    setFiltroExperiencia("");
    setFiltroEstudios("");
    setFiltroHorario("");
    setSoloDisponiblesViajar(false);
  }

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Bolsa de empleo</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{usuarios.length} personas en la red</p>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 mb-6 flex flex-col gap-3">
        <input
          type="text"
          placeholder="Buscar por nombre o habilidad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 w-full"
        />

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <select
            value={filtroTipo}
            onChange={(e) => setFiltroTipo(e.target.value as typeof filtroTipo)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
          >
            <option value="todos">Todos</option>
            <option value="busca-empleo">Buscan empleo</option>
            <option value="empleador">Ofrecen empleo</option>
          </select>

          <select
            value={filtroExperiencia}
            onChange={(e) => setFiltroExperiencia(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
          >
            <option value="">Experiencia</option>
            {OPCIONES_EXPERIENCIA.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select
            value={filtroEstudios}
            onChange={(e) => setFiltroEstudios(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
          >
            <option value="">Estudios</option>
            {OPCIONES_ESTUDIOS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          <select
            value={filtroHorario}
            onChange={(e) => setFiltroHorario(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
          >
            <option value="">Horario</option>
            {OPCIONES_HORARIO.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={soloDisponiblesViajar}
              onChange={(e) => setSoloDisponiblesViajar(e.target.checked)}
            />
            Solo con disponibilidad para viajar
          </label>

          <button
            onClick={limpiarFiltros}
            className="self-start sm:self-auto text-xs text-indigo-500 dark:text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 font-medium"
          >
            Limpiar filtros
          </button>
        </div>
      </div>

      {filtrados.length === 0 && (
        <p className="text-slate-400 dark:text-slate-500 text-sm">No se encontró nadie con esos criterios.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtrados.map((u) => (
          <Link key={u.slug} href={`/usuarios/${u.slug}`}>
            <TarjetaUsuario nombre={u.nombre} foto={u.foto} tipo={u.tipo} bio={u.bio} habilidades={u.habilidades} />
          </Link>
        ))}
      </div>
    </main>
  );
}