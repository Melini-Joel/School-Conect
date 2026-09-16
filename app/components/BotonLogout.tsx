// app/components/BotonLogout.tsx
"use client";

import { auth } from "@/app/lib/firebase";
import { signOut } from "firebase/auth";

export default function BotonLogout() {
  return (
    <button
      onClick={() => signOut(auth)}
      className="text-sm text-slate-500 hover:text-red-500 transition-colors"
    >
      Cerrar sesión
    </button>
  );
}