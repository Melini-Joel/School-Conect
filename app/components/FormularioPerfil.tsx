"use client";

import { useState } from "react";
import { auth, db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function FormularioPerfil() {
  const [nombre, setNombre] = useState("");
  const [curso, setCurso] = useState("");
  const [bio, setBio] = useState("");
  const [guardado, setGuardado] = useState(false);

  async function guardarPerfil() {
    const user = auth.currentUser;
    if (!user) return;

    const slug = nombre.toLowerCase().trim().replace(/\s+/g, "-");

    await setDoc(doc(db, "usuarios", user.uid), {
      slug,
      nombre,
      curso,
      bio,
      uid: user.uid,
    });

    setGuardado(true);
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm border rounded-lg p-4 shadow-sm">
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border rounded-lg p-2"
      />
      <input
        placeholder="Curso (ej: 5to Año)"
        value={curso}
        onChange={(e) => setCurso(e.target.value)}
        className="border rounded-lg p-2"
      />
      <textarea
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border rounded-lg p-2"
      />
      <button
        onClick={guardarPerfil}
        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
      >
        Guardar perfil
      </button>
      {guardado && <p className="text-green-600 text-sm">¡Perfil guardado!</p>}
    </div>
  );
}