import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-center px-6 py-24 bg-gradient-to-b from-indigo-50 via-slate-50 to-white">
      <span className="text-xs font-semibold text-indigo-500 bg-indigo-100 px-3 py-1 rounded-full mb-4">
        Proyecto escolar 2026
      </span>

      <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-800 max-w-2xl">
        La bolsa de empleo de <span className="text-indigo-500">nuestro colegio</span>
      </h1>

      <p className="text-slate-500 mt-4 max-w-md">
        Cargá tu currículum si estás buscando trabajo, o encontrá candidatos si necesitás contratar.
      </p>

      <div className="flex gap-3 mt-8">
        <Link href="/usuarios">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full shadow-sm hover:shadow-md transition-all duration-300 font-medium">
            Ver candidatos →
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-white hover:bg-slate-50 text-slate-700 border px-6 py-3 rounded-full transition-colors duration-300 font-medium">
            Unirme
          </button>
        </Link>
      </div>
    </main>
  );
}