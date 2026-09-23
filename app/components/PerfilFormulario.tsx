// app/components/PerfilFormulario.tsx
"use client";

import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import FormularioPerfil from "@/app/components/FormularioPerfil";
import EditarPerfil from "@/app/components/EditarPerfil";

export default function PerfilFormulario() {
  const { usuario, firebaseUser, cargando } = useUsuarioActual();

  if (cargando) return null;
  if (!firebaseUser) return null; // no hay sesión, no mostramos nada

  return usuario ? <EditarPerfil usuario={usuario} /> : <FormularioPerfil />;
}