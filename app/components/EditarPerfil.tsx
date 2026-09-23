// app/components/EditarPerfil.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import {
  OPCIONES_EXPERIENCIA,
  OPCIONES_ESTUDIOS,
  OPCIONES_HORARIO,
} from "@/app/lib/opcionesCV";
import type { Usuario } from "@/types/usuario";

type Props = {
  usuario: Usuario;
  onCerrar?: () => void;
};

export default function EditarPerfil({ usuario, onCerrar }: Props) {
  const [nombre, setNombre] = useState(usuario.nombre);
  const [tipo, setTipo] = useState<Usuario["tipo"]>(usuario.tipo);
  const [bio, setBio] = useState(usuario.bio);
  const [email, setEmail] = useState(usuario.email ?? "");
  const [telefono, setTelefono] = useState(usuario.telefono ?? "");
  const [experiencia, setExperiencia] = useState(usuario.experiencia ?? "");
  const [estudios, setEstudios] = useState(usuario.estudios ?? "");
  const [habilidades, setHabilidades] = useState(usuario.habilidades ?? "");
  const [aniosExperiencia, setAniosExperiencia] = useState(
    usuario.aniosExperiencia ?? "",
  );
  const [nivelEstudios, setNivelEstudios] = useState(
    usuario.nivelEstudios ?? "",
  );
  const [disponibilidadHorario, setDisponibilidadHorario] = useState(
    usuario.disponibilidadHorario ?? "",
  );
  const [disponibleViajar, setDisponibleViajar] = useState(
    usuario.disponibleViajar ?? false,
  );
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function guardarCambios() {
    if (!nombre.trim()) return;

    setGuardando(true);
    setError("");
    setGuardado(false);

    try {
      await updateDoc(doc(db, "usuarios", usuario.uid), {
        nombre,
        tipo,
        bio,
        email,
        telefono,
        ...(tipo === "busca-empleo" && {
          experiencia,
          estudios,
          habilidades,
          aniosExperiencia,
          nivelEstudios,
          disponibilidadHorario,
          disponibleViajar,
        }),
      });
      setGuardado(true);
      router.refresh();
      onCerrar?.();
    } catch {
      setError("No se pudieron guardar los cambios. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-white dark:bg-slate-800 flex flex-col gap-3">
      <h3 className="font-semibold text-sm text-slate-800 dark:text-slate-100">Mi perfil</h3>

      <input
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        placeholder="Nombre"
        className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
      />

      <div className="flex bg-slate-100 dark:bg-slate-900 rounded-lg p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTipo("busca-empleo")}
          className={`flex-1 py-1.5 rounded-md transition-colors ${
            tipo === "busca-empleo"
              ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          Busco empleo
        </button>
        <button
          type="button"
          onClick={() => setTipo("empleador")}
          className={`flex-1 py-1.5 rounded-md transition-colors ${
            tipo === "empleador"
              ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          Ofrezco empleo
        </button>
      </div>

      <textarea
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder="Presentación breve"
        className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 resize-none"
        rows={2}
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email de contacto"
          className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
        />
        <input
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="Teléfono"
          className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
        />
      </div>

      {tipo === "busca-empleo" && (
        <>
          <textarea
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            placeholder="Experiencia laboral (contá tu historia)"
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 resize-none"
            rows={2}
          />
          <textarea
            value={estudios}
            onChange={(e) => setEstudios(e.target.value)}
            placeholder="Estudios (detalle)"
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 resize-none"
            rows={2}
          />
          <input
            value={habilidades}
            onChange={(e) => setHabilidades(e.target.value)}
            placeholder="Habilidades (separadas por coma)"
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              value={aniosExperiencia}
              onChange={(e) => setAniosExperiencia(e.target.value)}
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
            >
              <option value="">Años de experiencia</option>
              {OPCIONES_EXPERIENCIA.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <select
              value={nivelEstudios}
              onChange={(e) => setNivelEstudios(e.target.value)}
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
            >
              <option value="">Nivel de estudios</option>
              {OPCIONES_ESTUDIOS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          <select
            value={disponibilidadHorario}
            onChange={(e) => setDisponibilidadHorario(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-lg p-2 text-sm"
          >
            <option value="">Disponibilidad horaria</option>
            {OPCIONES_HORARIO.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={disponibleViajar}
              onChange={(e) => setDisponibleViajar(e.target.checked)}
            />
            Disponibilidad para viajar
          </label>
        </>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={guardarCambios}
          disabled={guardando}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
        >
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>
        {onCerrar && (
          <button
            onClick={onCerrar}
            className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-sm px-4 py-2"
          >
            Cancelar
          </button>
        )}
        {guardado && <p className="text-green-600 dark:text-green-400 text-sm">¡Guardado!</p>}
        {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
      </div>
    </div>
  );
}
