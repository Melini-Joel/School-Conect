// app/components/TarjetaUsuario.tsx
import BotonGuardar from "./BotonGuardar";

type TarjetaUsuarioProps = {
  nombre: string;
  curso: string;
  bio: string;
};

export default function TarjetaUsuario({ nombre, curso, bio }: TarjetaUsuarioProps) {
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
          <p className="text-slate-400 text-xs">{curso}</p>
        </div>
      </div>

      <p className="text-slate-500 text-sm mt-3 line-clamp-2">{bio}</p>

      <div className="mt-4 pt-3 border-t border-slate-100">
    
      </div>
    </div>
  );
}