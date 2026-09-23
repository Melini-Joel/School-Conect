// app/components/FormularioPerfil.tsx
"use client";

import { useState } from "react";
import { auth, db } from "@/app/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function FormularioPerfil() {
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState<"busca-empleo" | "empleador">("busca-empleo");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [experiencia, setExperiencia] = useState("");
  const [estudios, setEstudios] = useState("");
  const [habilidades, setHabilidades] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [error, setError] = useState("");

  async function guardarPerfil() {
    const user = auth.currentUser;
    if (!user || !nombre.trim()) return;

    setGuardando(true);
    setError("");
    setGuardado(false);

    const base = nombre.toLowerCase().trim().replace(/\s+/g, "-");
    const slug = `${base}-${user.uid.slice(0, 6)}`;

    try {
      await setDoc(doc(db, "usuarios", user.uid), {
        slug,
        nombre,
        tipo,
        bio,
        email,
        telefono,
        uid: user.uid,
        ...(tipo === "busca-empleo" && { experiencia, estudios, habilidades }),
      });
      setGuardado(true);
    } catch {
      setError("No se pudo guardar el perfil. Intentá de nuevo.");
    } finally {
      setGuardando(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm border rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold">Completar mi perfil</h3>

      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border rounded-lg p-2"
      />

      <div className="flex bg-slate-100 rounded-lg p-1 text-sm font-medium">
        <button
          type="button"
          onClick={() => setTipo("busca-empleo")}
          className={`flex-1 py-1.5 rounded-md transition-colors ${
            tipo === "busca-empleo" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"
          }`}
        >
          Busco empleo
        </button>
        <button
          type="button"
          onClick={() => setTipo("empleador")}
          className={`flex-1 py-1.5 rounded-md transition-colors ${
            tipo === "empleador" ? "bg-white shadow-sm text-indigo-600" : "text-slate-500"
          }`}
        >
          Ofrezco empleo
        </button>
      </div>

      <textarea
        placeholder="Presentación breve"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="border rounded-lg p-2 resize-none"
        rows={2}
      />

      <div className="grid grid-cols-2 gap-2">
        <input
          placeholder="Email de contacto"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-2 text-sm"
        />
        <input
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          className="border rounded-lg p-2 text-sm"
        />
      </div>

      {tipo === "busca-empleo" && (
        <>
          <textarea
            placeholder="Experiencia laboral"
            value={experiencia}
            onChange={(e) => setExperiencia(e.target.value)}
            className="border rounded-lg p-2 resize-none"
            rows={2}
          />
          <textarea
            placeholder="Estudios"
            value={estudios}
            onChange={(e) => setEstudios(e.target.value)}
            className="border rounded-lg p-2 resize-none"
            rows={2}
          />
          <input
            placeholder="Habilidades (separadas por coma)"
            value={habilidades}
            onChange={(e) => setHabilidades(e.target.value)}
            className="border rounded-lg p-2 text-sm"
          />
        </>
      )}

      <button
        onClick={guardarPerfil}
        disabled={guardando}
        className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-300"
      >
        {guardando ? "Guardando..." : "Guardar perfil"}
      </button>

      {guardado && <p className="text-green-600 text-sm">¡Perfil guardado con éxito!</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}