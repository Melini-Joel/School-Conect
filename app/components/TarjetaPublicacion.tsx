// app/components/TarjetaPublicacion.tsx
import type { Publicacion } from "@/types/publicacion";
import AccionesPublicacion from "./AccionesPublicacion";

export default function TarjetaPublicacion({ id, autorUid, autorNombre, autorCurso, texto, fecha }: Publicacion) {
  const fechaTexto = fecha?.toDate
    ? fecha.toDate().toLocaleDateString("es-AR", { day: "numeric", month: "short" })
    : "";

  return (
    <div className="border rounded-xl p-4 bg-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold shrink-0">
          {autorNombre.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-sm">{autorNombre}</p>
          <p className="text-slate-400 text-xs">{autorCurso} · {fechaTexto}</p>
        </div>
      </div>
      <p className="text-slate-700 mt-3">{texto}</p>
      <AccionesPublicacion id={id} autorUid={autorUid} textoActual={texto} />
    </div>
  );
}