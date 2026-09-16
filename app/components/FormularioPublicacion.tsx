// app/components/FormularioPublicacion.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";

export default function FormularioPublicacion() {
  const { usuario } = useUsuarioActual();
  const [texto, setTexto] = useState("");
  const [publicando, setPublicando] = useState(false);
  const router = useRouter();

  if (!usuario) return null;

  async function publicar() {
    if (!texto.trim() || !usuario) return;
    setPublicando(true);

    await addDoc(collection(db, "publicaciones"), {
      autorUid: usuario.uid,
      autorNombre: usuario.nombre,
      autorCurso: usuario.curso,
      texto,
      fecha: serverTimestamp(),
    });

    setTexto("");
    setPublicando(false);
    router.refresh();
  }

  return (
    <div className="border rounded-xl p-4 bg-white">
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={`¿Qué querés compartir, ${usuario.nombre}?`}
        className="w-full border rounded-lg p-2 resize-none"
        rows={3}
      />
      <button
        onClick={publicar}
        disabled={publicando}
        className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-300 mt-2 text-sm font-medium"
      >
        {publicando ? "Publicando..." : "Publicar"}
      </button>
    </div>
  );
}