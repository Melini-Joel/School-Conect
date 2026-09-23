// app/components/BotonLogin.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/app/lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function BotonLogin() {
  const [modo, setModo] = useState<"login" | "registro">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const [cargando, setCargando] = useState(false);
  const router = useRouter();

  async function manejarSubmit() {
    setError("");
    setExito("");
    setCargando(true);

    try {
      if (modo === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        setExito("¡Sesión iniciada con éxito!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setExito("¡Cuenta creada con éxito!");
      }

      setTimeout(() => router.push("/usuarios"), 1000);
    } catch (err) {
      setError(traducirError((err as { code?: string }).code));
    } finally {
      setCargando(false);
    }
  }

  function traducirError(code?: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "Ese correo ya está registrado. Probá iniciar sesión.";
      case "auth/invalid-credential":
      case "auth/wrong-password":
        return "Correo o contraseña incorrectos.";
      case "auth/user-not-found":
        return "No existe una cuenta con ese correo. Probá registrarte.";
      case "auth/weak-password":
        return "La contraseña tiene que tener al menos 6 caracteres.";
      case "auth/invalid-email":
        return "Ese correo no es válido.";
      default:
        return "Ocurrió un error. Intentá de nuevo.";
    }
  }

  return (
    <div className="flex flex-col gap-3 max-w-xs">
      <div className="flex bg-slate-100 dark:bg-slate-800 rounded-lg p-1 text-sm font-medium">
        <button
          onClick={() => {
            setModo("login");
            setError("");
            setExito("");
          }}
          className={`flex-1 py-1.5 rounded-md transition-colors ${
            modo === "login"
              ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => {
            setModo("registro");
            setError("");
            setExito("");
          }}
          className={`flex-1 py-1.5 rounded-md transition-colors ${
            modo === "registro"
              ? "bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-300"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          Registrarse
        </button>
      </div>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2"
      />

      <button
        onClick={manejarSubmit}
        disabled={cargando}
        className="bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors duration-300"
      >
        {cargando
          ? "Un momento..."
          : modo === "login"
          ? "Iniciar sesión"
          : "Crear cuenta"}
      </button>

      {error && <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>}
      {exito && (
        <p className="text-green-600 dark:text-green-400 text-sm bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg p-2">
          {exito}
        </p>
      )}
    </div>
  );
}