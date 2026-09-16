// app/components/AccionesPublicacion.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";

type Props = {
  id: string;
  autorUid: string;
  textoActual: string;
};

export default function AccionesPublicacion({ id, autorUid, textoActual }: Props) {
  const { usuario } = useUsuarioActual();
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState(textoActual);
  const [procesando, setProcesando] = useState(false);
  const router = useRouter();

  // Si no hay usuario logueado, o no es el autor, no mostramos nada
  if (!usuario || usuario.uid !== autorUid) return null;

  async function guardarEdicion() {
    if (!texto.trim()) return;
    setProcesando(true);
    await updateDoc(doc(db, "publicaciones", id), { texto });
    setProcesando(false);
    setEditando(false);
    router.refresh();
  }

  async function eliminar() {
    const confirmar = window.confirm("¿Seguro que querés eliminar esta publicación?");
    if (!confirmar) return;

    setProcesando(true);
    await deleteDoc(doc(db, "publicaciones", id));
    router.refresh();
  }

  if (editando) {
    return (
      <div className="mt-3 flex flex-col gap-2">
        <textarea
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          className="w-full border rounded-lg p-2 resize-none"
          rows={3}
        />
        <div className="flex gap-2 text-sm">
          <button
            onClick={guardarEdicion}
            disabled={procesando}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-3 py-1 rounded-lg transition-colors"
          >
            Guardar
          </button>
          <button
            onClick={() => {
              setEditando(false);
              setTexto(textoActual);
            }}
            className="text-slate-500 hover:text-slate-700 px-3 py-1"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3 text-xs mt-2">
      <button
        onClick={() => setEditando(true)}
        className="text-slate-400 hover:text-indigo-500 transition-colors"
      >
        Editar
      </button>
      <button
        onClick={eliminar}
        disabled={procesando}
        className="text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
      >
        Eliminar
      </button>
    </div>
  );
}