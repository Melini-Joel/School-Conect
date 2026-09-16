// app/page.tsx
import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";
import { obtenerPublicaciones } from "@/app/lib/obtenerPublicaciones";
import PerfilLateral from "@/app/components/PerfilLateral";
import FormularioPublicacion from "@/app/components/FormularioPublicacion";
import TarjetaPublicacion from "@/app/components/TarjetaPublicacion";
import SugerenciasUsuarios from "@/app/components/SugerenciasUsuarios";

export default async function Home() {
  const usuarios = await obtenerUsuarios();
  const publicaciones = await obtenerPublicaciones();

  return (
    <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <aside className="lg:col-span-3">
        <PerfilLateral />
      </aside>

      <section className="lg:col-span-6 flex flex-col gap-4">
        <FormularioPublicacion />
        {publicaciones.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-8">
            Todavía no hay publicaciones. ¡Sé el primero!
          </p>
        )}
        {publicaciones.map((p) => (
          <TarjetaPublicacion key={p.id} {...p} />
        ))}
      </section>

      <aside className="lg:col-span-3">
        <SugerenciasUsuarios usuarios={usuarios} />
      </aside>
    </main>
  );
}