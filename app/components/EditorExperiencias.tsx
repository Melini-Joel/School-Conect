// app/components/EditorExperiencias.tsx
"use client";

import { Plus, Trash2 } from "lucide-react";
import type { Trabajo } from "@/types/usuario";

type Props = {
  experiencias: Trabajo[];
  onChange: (experiencias: Trabajo[]) => void;
};

const TRABAJO_VACIO: Trabajo = {
  puesto: "",
  empresa: "",
  desde: "",
  hasta: "",
  descripcion: "",
};

const claseInput =
  "border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm";

// Descarta los trabajos que el usuario dejó completamente vacíos
export function limpiarExperiencias(experiencias: Trabajo[]) {
  return experiencias.filter((t) =>
    Object.values(t).some((valor) => valor.trim() !== ""),
  );
}

export default function EditorExperiencias({ experiencias, onChange }: Props) {
  function actualizar(indice: number, campo: keyof Trabajo, valor: string) {
    onChange(
      experiencias.map((t, i) => (i === indice ? { ...t, [campo]: valor } : t)),
    );
  }

  function agregar() {
    onChange([...experiencias, { ...TRABAJO_VACIO }]);
  }

  function quitar(indice: number) {
    onChange(experiencias.filter((_, i) => i !== indice));
  }

  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Experiencia laboral
      </h4>

      {experiencias.map((trabajo, i) => (
        <div
          key={i}
          className="flex flex-col gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Trabajo {i + 1}
            </span>
            <button
              type="button"
              onClick={() => quitar(i)}
              className="inline-flex items-center gap-1 text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Quitar
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input
              value={trabajo.puesto}
              onChange={(e) => actualizar(i, "puesto", e.target.value)}
              placeholder="Puesto"
              className={claseInput}
            />
            <input
              value={trabajo.empresa}
              onChange={(e) => actualizar(i, "empresa", e.target.value)}
              placeholder="Empresa / lugar"
              className={claseInput}
            />
            <input
              value={trabajo.desde}
              onChange={(e) => actualizar(i, "desde", e.target.value)}
              placeholder="Desde (ej: 2021)"
              className={claseInput}
            />
            <input
              value={trabajo.hasta}
              onChange={(e) => actualizar(i, "hasta", e.target.value)}
              placeholder="Hasta (ej: Actualidad)"
              className={claseInput}
            />
          </div>

          <textarea
            value={trabajo.descripcion}
            onChange={(e) => actualizar(i, "descripcion", e.target.value)}
            placeholder="¿Qué tareas hacías?"
            className={`${claseInput} resize-none`}
            rows={2}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={agregar}
        className="inline-flex items-center justify-center gap-1.5 border border-dashed border-indigo-300 dark:border-indigo-500/40 text-indigo-600 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 rounded-lg py-2 text-sm font-medium transition-colors"
      >
        <Plus className="w-4 h-4" aria-hidden="true" />
        Agregar trabajo
      </button>
    </div>
  );
}
