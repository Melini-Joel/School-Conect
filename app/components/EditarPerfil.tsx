// app/components/EditarPerfil.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import type { Usuario } from "@/types/usuario";

const ETIQUETAS_DISPONIBLES = ["Estudiante", "Profesor", "Ex alumno"];

export default function EditarPerfil({ usuario, onCerrar }: { usuario: Usuario; onCerrar: () => void }) {
  const [bio, setBio] = useState(usuario.bio);
  const [etiquetas, setEtiquetas] = useState<string[]>(usuario.etiquetas ?? []);
  const [guardando, setGuardando] = useState(false);
  const router = useRouter();

  function toggleEtiqueta(etiqueta: string) {
    setEtiquetas((prev) =>
      prev.includes(etiqueta) ? prev.filter((e) => e !== etiqueta) : [...prev, etiqueta]
    );
  }

  async function guardarCambios() {
    setGuardando(true);
    await updateDoc(doc(db, "usuarios", usuario.uid), { bio, etiquetas });
    setGuardando(false);
    router.refresh();
    onCerrar();
  }

  return (
    <div className="border rounded-xl p-4 bg-white flex flex-col gap-3 mt-4">
      <h3 className="font-semibold text-sm">Editar perfil</h3>

      <div>
        <p className="text-xs text-slate-500 mb-2">¿Qué sos en el colegio?</p>
        <div className="flex flex-wrap gap-2">
          {ETIQUETAS_DISPONIBLES.map((etiqueta) => {
            const activa = etiquetas.includes(etiqueta);
            return (
              <button
                key={etiqueta}
                onClick={() => toggleEtiqueta(etiqueta)}
                className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-colors ${
                  activa
                    ? "bg-indigo-500 text-white border-indigo-500"
                    : "bg-white text-slate-600 border-slate-300 hover:border-indigo-400"
                }`}
              >
                {etiqueta}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="text-xs text-slate-500 mb-2">Bio</p>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border rounded-lg p-2 resize-none"
          rows={3}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={guardarCambios}
          disabled={guardando}
          className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
        >
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>
        <button
          onClick={onCerrar}
          className="text-slate-500 hover:text-slate-700 text-sm px-4 py-2"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}