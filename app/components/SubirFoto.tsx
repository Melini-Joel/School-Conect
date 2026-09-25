// app/components/SubirFoto.tsx
"use client";

import { useRef, useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import Avatar from "@/app/components/Avatar";
import { subirImagen } from "@/app/lib/cloudinary";

type Props = {
  nombre: string;
  foto: string;
  onChange: (foto: string) => void;
};

export default function SubirFoto({ nombre, foto, onChange }: Props) {
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function elegirArchivo(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0];
    e.target.value = "";
    if (!archivo) return;

    setSubiendo(true);
    setError("");
    try {
      onChange(await subirImagen(archivo));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
    } finally {
      setSubiendo(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Avatar nombre={nombre || "?"} foto={foto || undefined} tamanio={56} />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={subiendo}
            className="inline-flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-300 hover:text-indigo-700 dark:hover:text-indigo-200 font-medium disabled:opacity-50"
          >
            <Camera className="w-4 h-4" aria-hidden="true" />
            {subiendo ? "Subiendo..." : foto ? "Cambiar foto" : "Subir foto"}
          </button>
          {foto && !subiendo && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="inline-flex items-center gap-1 text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Quitar
            </button>
          )}
        </div>
        {error && <p className="text-red-500 dark:text-red-400 text-xs">{error}</p>}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={elegirArchivo}
        className="hidden"
      />
    </div>
  );
}
