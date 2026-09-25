// app/components/Avatar.tsx
import { urlMiniatura } from "@/app/lib/cloudinary";

type Props = {
  nombre: string;
  foto?: string;
  // Tamaño en píxeles (el círculo es cuadrado)
  tamanio: number;
  className?: string;
};

export default function Avatar({ nombre, foto, tamanio, className = "" }: Props) {
  const estilo = { width: tamanio, height: tamanio, fontSize: tamanio * 0.4 };

  if (foto) {
    return (
      // Cloudinary ya entrega la imagen recortada y optimizada, por eso usamos <img> común
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={urlMiniatura(foto, tamanio)}
        alt={`Foto de ${nombre}`}
        style={estilo}
        className={`shrink-0 rounded-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      style={estilo}
      className={`shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 text-white flex items-center justify-center font-bold ${className}`}
    >
      {nombre.charAt(0).toUpperCase()}
    </div>
  );
}
