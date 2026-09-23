"use client";

import BotonLogin from "@/app/components/BotonLogin";
import BotonLogout from "@/app/components/BotonLogout";
import PerfilFormulario from "@/app/components/PerfilFormulario";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";

export default function LoginPage() {
  const { firebaseUser, cargando } = useUsuarioActual();

  return (
    <main className="flex-1 flex flex-col justify-center max-w-sm mx-auto p-8 gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4 text-slate-800 dark:text-slate-100">Iniciar sesión</h1>
        {!cargando && (firebaseUser ? <BotonLogout /> : <BotonLogin />)}
      </div>

      <PerfilFormulario />
    </main>
  );
}