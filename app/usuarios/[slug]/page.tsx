// app/usuarios/[slug]/page.tsx
import Link from "next/link";
import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";
import { obtenerPublicaciones } from "@/app/lib/obtenerPublicaciones";
import TarjetaPublicacion from "@/app/components/TarjetaPublicacion";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function UsuarioDetalle({ params }: PageProps) {
  const { slug } = await params;
  const usuarios = await obtenerUsuarios();
  const usuario = usuarios.find((u) => u.slug === slug);

  if (!usuario) {
    return (
      <main className="p-8 text-center">
        <p>Usuario no encontrado</p>
        <Link href="/" className="text-indigo-500">
          ← Volver
        </Link>
      </main>
    );
  }

  const publicaciones = await obtenerPublicaciones();
  const publicacionesDelUsuario = publicaciones.filter(
    (p) => p.autorUid === usuario.uid,
  );

  return (
    <main className="max-w-2xl mx-auto p-6">
      <Link href="/" className="text-sm text-slate-500 hover:text-indigo-500">
        ← Volver
      </Link>

      <div className="mt-4 rounded-xl overflow-hidden border bg-white">
        <div className="h-28 bg-gradient-to-r from-indigo-400 to-indigo-600" />
        <div className="px-6 pb-6">
          <div className="w-24 h-24 rounded-full bg-indigo-500 text-white flex items-center justify-center text-4xl font-bold border-4 border-white -mt-12">
            {usuario.nombre.charAt(0).toUpperCase()}
          </div>
          <h1 className="text-2xl font-bold mt-3">{usuario.nombre}</h1>
          <span className="inline-block text-xs font-medium text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full mt-1">
            {usuario.curso}
          </span>
          <p className="text-slate-600 mt-4">{usuario.bio}</p>
        </div>
      </div>

      <h2 className="font-semibold text-slate-600 mt-8 mb-3">
        Publicaciones de {usuario.nombre}
      </h2>
      <div className="flex flex-col gap-4">
        {publicacionesDelUsuario.length === 0 && (
          <p className="text-slate-400 text-sm">Todavía no publicó nada.</p>
        )}
        {publicacionesDelUsuario.map((p) => (
          <TarjetaPublicacion key={p.id} {...p} />
        ))}
      </div>
    </main>
  );
}
