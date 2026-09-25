// app/components/FotoPerfilEditable.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Camera, ImageUp, Trash2 } from "lucide-react";
import { doc, updateDoc, deleteField } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import { subirImagen } from "@/app/lib/cloudinary";
import Avatar from "@/app/components/Avatar";
import type { Usuario } from "@/types/usuario";

type Props = {
  usuario: Usuario;
  tamanio: number;
  className?: string;
  // Recibe la URL nueva, o undefined si se eliminó la foto
  onCambio: (foto: string | undefined) => void;
};

// Foto del perfil propio: al tocarla se puede cambiar o eliminar, y se guarda al instante
export default function FotoPerfilEditable({ usuario, tamanio, className = "", onCambio }: Props) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [trabajando, setTrabajando] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const contenedorRef = useRef<HTMLDivElement>(null);

  // Cierra el menú al hacer clic afuera o apretar Escape
  useEffect(() => {
    if (!menuAbierto) return;

    function clicAfuera(e: MouseEvent) {
      if (!contenedorRef.current?.contains(e.target as Node)) setMenuAbierto(false);
    }
    function tecla(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuAbierto(false);
    }

    document.addEventListener("mousedown", clicAfuera);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", clicAfuera);
      document.removeEventListener("keydown", tecla);
    };
  }, [menuAbierto]);

  async function cambiarFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    e.target.value = "";
    if (!archivo) return;

    setTrabajando(true);
    setError("");
    try {
      const url = await subirImagen(archivo);
      await updateDoc(doc(db, "usuarios", usuario.uid), { foto: url });
      onCambio(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo cambiar la foto.");
    } finally {
      setTrabajando(false);
    }
  }

  async function eliminarFoto() {
    setMenuAbierto(false);
    if (!confirm("¿Querés eliminar tu foto de perfil?")) return;

    setTrabajando(true);
    setError("");
    try {
      await updateDoc(doc(db, "usuarios", usuario.uid), { foto: deleteField() });
      onCambio(undefined);
    } catch {
      setError("No se pudo eliminar la foto.");
    } finally {
      setTrabajando(false);
    }
  }

  function elegirArchivo() {
    setMenuAbierto(false);
    inputRef.current?.click();
  }

  return (
    <div ref={contenedorRef} className={`relative w-fit ${className}`}>
      <button
        type="button"
        onClick={() => (usuario.foto ? setMenuAbierto(!menuAbierto) : elegirArchivo())}
        disabled={trabajando}
        aria-label={usuario.foto ? "Editar foto de perfil" : "Subir foto de perfil"}
        aria-expanded={menuAbierto}
        className="group relative block rounded-full"
      >
        <Avatar
          nombre={usuario.nombre}
          foto={usuario.foto}
          tamanio={tamanio}
          className="border-4 border-white dark:border-slate-800"
        />
        {/* Capa oscura con cámara al pasar el mouse o mientras se sube */}
        <span
          className={`absolute inset-0 rounded-full bg-black/40 text-white flex items-center justify-center text-xs font-medium transition-opacity ${
            trabajando ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {trabajando ? "Guardando..." : <Camera className="w-6 h-6" aria-hidden="true" />}
        </span>
        {/* Botón visible siempre, útil en celulares donde no hay hover */}
        <span className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-indigo-500 text-white border-2 border-white dark:border-slate-800 flex items-center justify-center shadow">
          <Camera className="w-4 h-4" aria-hidden="true" />
        </span>
      </button>

      {menuAbierto && (
        <div className="absolute left-0 top-full mt-2 z-10 w-44 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg py-1 text-sm">
          <button
            type="button"
            onClick={elegirArchivo}
            className="w-full flex items-center gap-2 px-3 py-2 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <ImageUp className="w-4 h-4" aria-hidden="true" />
            Cambiar foto
          </button>
          <button
            type="button"
            onClick={eliminarFoto}
            className="w-full flex items-center gap-2 px-3 py-2 text-red-500 dark:text-red-400 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Eliminar foto
          </button>
        </div>
      )}

      {error && <p className="absolute left-0 top-full mt-2 w-60 text-red-500 dark:text-red-400 text-xs">{error}</p>}

      <input ref={inputRef} type="file" accept="image/*" onChange={cambiarFoto} className="hidden" />
    </div>
  );
}
