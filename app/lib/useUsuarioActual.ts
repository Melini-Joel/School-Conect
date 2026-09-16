// app/lib/useUsuarioActual.ts
"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/app/lib/firebase";
import type { Usuario } from "@/types/usuario";

export function useUsuarioActual() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setUsuario(null);
        setCargando(false);
        return;
      }
      const snap = await getDoc(doc(db, "usuarios", user.uid));
      setUsuario(snap.exists() ? (snap.data() as Usuario) : null);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  return { usuario, cargando };
}