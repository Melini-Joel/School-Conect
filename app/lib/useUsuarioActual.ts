// app/lib/useUsuarioActual.ts
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, onSnapshot, type Unsubscribe } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import { migrarContacto } from "@/app/lib/contacto";
import type { Usuario } from "@/types/usuario";

export function useUsuarioActual() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    let dejarDeEscucharPerfil: Unsubscribe | undefined;

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dejarDeEscucharPerfil?.();
      dejarDeEscucharPerfil = undefined;
      setFirebaseUser(user);

      if (!user) {
        setUsuario(null);
        setCargando(false);
        return;
      }

      // Escucha el perfil en tiempo real: si se crea o edita, todos los componentes se enteran
      setCargando(true);
      dejarDeEscucharPerfil = onSnapshot(
        doc(db, "usuarios", user.uid),
        (snap) => {
          const datos = snap.exists() ? (snap.data() as Usuario) : null;
          setUsuario(datos);
          setCargando(false);
          if (datos) migrarContacto(datos);
        },
        (error) => {
          console.error("No se pudo leer el perfil:", error);
          setUsuario(null);
          setCargando(false);
        },
      );
    });

    return () => {
      unsubscribe();
      dejarDeEscucharPerfil?.();
    };
  }, []);

  return { usuario, firebaseUser, cargando };
}
