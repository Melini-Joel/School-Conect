// app/page.tsx
import Link from "next/link";
import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";

export default async function Home() {
  const usuarios = await obtenerUsuarios();

  return (
    <main className="flex flex-col items-center text-center px-6 py-24 bg-gradient-to-b from-indigo-50 via-slate-50 to-white">
      <span className="text-xs font-semibold text-indigo-500 bg-indigo-100 px-3 py-1 rounded-full mb-4">
        Proyecto escolar 2026
      </span>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800 max-w-2xl">
        La red interna de <span className="text-indigo-500">nuestro colegio</span>
      </h1>

      <p className="text-slate-500 mt-4 max-w-md">
        Conectá con tus compañeros, mostrá tus proyectos y encontrá gente con
        tus mismos intereses.
      </p>

      <div className="flex gap-3 mt-8">
        <Link href="/usuarios">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 font-medium">
            Ingresar →
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-white hover:bg-slate-50 text-slate-700 border px-6 py-3 rounded-full transition-colors duration-300 font-medium">
            Unirme
          </button>
        </Link>
      </div>

      {usuarios.length > 0 && (
        <div className="mt-16 flex items-center gap-2 text-sm text-slate-400">
          <div className="flex -space-x-2">
            {usuarios.slice(0, 4).map((u) => (
              <div
                key={u.uid}
                className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-white flex items-center justify-center text-xs font-bold text-indigo-700"
              >
                {u.nombre.charAt(0).toUpperCase()}
              </div>
            ))}
          </div>
          <span>
            Ya se sumaron {usuarios.length} {usuarios.length === 1 ? "persona" : "personas"}
          </span>
        </div>
      )}
    </main>
  );
}