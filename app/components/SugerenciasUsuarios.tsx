// app/components/SugerenciasUsuarios.tsx
import Link from "next/link";
import TarjetaUsuario from "./TarjetaUsuario";
import type { Usuario } from "@/types/usuario";

export default function SugerenciasUsuarios({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-semibold text-slate-600 text-sm">Gente que quizás conozcas</h3>
      {usuarios.map((u) => (
        <Link key={u.slug} href={`/usuarios/${u.slug}`}>
          <TarjetaUsuario nombre={u.nombre} curso={u.curso} bio={u.bio} />
        </Link>
      ))}
    </div>
  );
}