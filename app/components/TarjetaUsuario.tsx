import type { Usuario } from "@/types/usuario";

type Props = Pick<Usuario, "nombre" | "tipo" | "bio" | "habilidades">;

export default function TarjetaUsuario({ nombre, tipo, bio, habilidades }: Props) {
  return (
    <div className="group border border-slate-200 rounded-2xl p-4 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center text-lg font-bold">
          {nombre.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-800 truncate group-hover:text-indigo-600 transition-colors">
            {nombre}
          </h3>
          <span
            className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full mt-1 ${
              tipo === "empleador" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {tipo === "empleador" ? "Ofrece empleo" : "Busca empleo"}
          </span>
        </div>
      </div>

      <p className="text-slate-500 text-sm mt-3 line-clamp-2">{bio}</p>

      {habilidades && <p className="text-slate-400 text-xs mt-2 line-clamp-1">🛠️ {habilidades}</p>}
    </div>
  );
}