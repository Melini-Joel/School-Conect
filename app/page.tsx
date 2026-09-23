import Link from "next/link";
import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";

export default async function Home() {
  const usuarios = await obtenerUsuarios();

  return (
    <main className="flex-1 flex flex-col items-center justify-center text-center px-6 py-16 bg-gradient-to-b from-indigo-50 via-slate-50 to-white dark:from-indigo-950/30 dark:via-slate-900 dark:to-slate-900">
      <span className="text-xs font-semibold text-indigo-500 bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 px-3 py-1 rounded-full mb-4">
        Proyecto escolar 2026
      </span>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800 dark:text-slate-100 max-w-2xl">
        La bolsa de empleo de <span className="text-indigo-500">nuestro colegio</span>
      </h1>

      <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-md">
        Cargá tu currículum si estás buscando trabajo, o encontrá candidatos si necesitás contratar.
      </p>

      <div className="flex gap-3 mt-8">
        <Link href="/usuarios">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 font-medium">
            Ver candidatos →
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-full transition-colors duration-300 font-medium">
            Unirme
          </button>
        </Link>
      </div>

      {usuarios.length > 0 && (
        <div className="mt-16 flex items-center gap-2 text-sm text-slate-400 dark:text-slate-500">
          <div className="flex -space-x-2">
            {usuarios.slice(0, 4).map((u) => (
              <div
                key={u.uid}
                className="w-8 h-8 rounded-full bg-indigo-200 dark:bg-indigo-500/30 border-2 border-white dark:border-slate-900 flex items-center justify-center text-xs font-bold text-indigo-700 dark:text-indigo-200"
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