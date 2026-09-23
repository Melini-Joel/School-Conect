// app/components/TarjetaPublicacion.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { doc, deleteDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import type { Publicacion } from "@/types/publicacion";

export default function TarjetaPublicacion({ id, autorUid, autorNombre, autorCurso, texto, fecha, likes = [] }: Publicacion) {
  const { usuario } = useUsuarioActual();
  const [eliminando, setEliminando] = useState(false);
  const router = useRouter();

  const fechaTexto = fecha?.toDate
    ? fecha.toDate().toLocaleDateString("es-AR", { day: "numeric", month: "short" })
    : "";

  const esAutor = usuario?.uid === autorUid;
  const yaDioLike = usuario ? likes.includes(usuario.uid) : false;

  async function eliminarPublicacion() {
    const confirmar = confirm("¿Seguro que querés eliminar esta publicación?");
    if (!confirmar) return;

    setEliminando(true);
    await deleteDoc(doc(db, "publicaciones", id));
    router.refresh();
  }

  async function toggleLike() {
    if (!usuario) return;

    const ref = doc(db, "publicaciones", id);
    await updateDoc(ref, {
      likes: yaDioLike ? arrayRemove(usuario.uid) : arrayUnion(usuario.uid),
    });
    router.refresh();
  }

  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold shrink-0">
            {autorNombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-sm">{autorNombre}</p>
            <p className="text-slate-400 text-xs">{autorCurso} · {fechaTexto}</p>
          </div>
        </div>

        {esAutor && (
          <button
            onClick={eliminarPublicacion}
            disabled={eliminando}
            className="text-slate-400 hover:text-red-500 text-xs transition-colors disabled:opacity-50"
          >
            {eliminando ? "..." : "🗑️ Eliminar"}
          </button>
        )}
      </div>

      <p className="text-slate-700 mt-3">{texto}</p>

      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100">
        <button
          onClick={toggleLike}
          disabled={!usuario}
          className={`flex items-center gap-1 text-sm transition-colors disabled:opacity-40 ${
            yaDioLike ? "text-indigo-600 font-medium" : "text-slate-500 hover:text-indigo-500"
          }`}
        >
          {yaDioLike ? "👍" : "🤍"} Me gusta
        </button>
        {likes.length > 0 && (
          <span className="text-xs text-slate-400">
            {likes.length} {likes.length === 1 ? "persona" : "personas"}
          </span>
        )}
      </div>
    </div>
  );
}