"use client";

import { useState } from "react";
import Link from "next/link";
import { jsPDF } from "jspdf";
import { FileText, Lock } from "lucide-react";
import { useUsuarioActual } from "@/app/lib/useUsuarioActual";
import { OPCIONES_EXPERIENCIA, OPCIONES_ESTUDIOS, OPCIONES_HORARIO } from "@/app/lib/opcionesCV";
import type { Usuario } from "@/types/usuario";

export default function BotonDescargarCV({ usuario }: { usuario: Usuario }) {
  const { firebaseUser, cargando } = useUsuarioActual();
  const [generando, setGenerando] = useState(false);

  function generarPdf() {
    setGenerando(true);

    try {
      const doc = new jsPDF();
      const margen = 20;
      const anchoUtil = doc.internal.pageSize.getWidth() - margen * 2;
      const alturaPagina = doc.internal.pageSize.getHeight();
      let y = margen;

      function saltoDePaginaSiNecesario(lineas: number) {
        if (y + lineas * 6 > alturaPagina - margen) {
          doc.addPage();
          y = margen;
        }
      }

      function seccion(texto: string) {
        saltoDePaginaSiNecesario(2);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text(texto, margen, y);
        y += 7;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
      }

      function parrafo(texto: string) {
        const lineas: string[] = doc.splitTextToSize(texto, anchoUtil);
        saltoDePaginaSiNecesario(lineas.length);
        doc.text(lineas, margen, y);
        y += lineas.length * 5 + 4;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(20);
      doc.text(usuario.nombre, margen, y);
      y += 9;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text("Currículum vitae", margen, y);
      doc.setTextColor(0);
      y += 10;

      const contacto = [usuario.email, usuario.telefono].filter(Boolean).join("   ·   ");
      if (contacto) parrafo(contacto);

      if (usuario.bio) {
        seccion("Presentación");
        parrafo(usuario.bio);
      }

      if (usuario.experiencia) {
        seccion("Experiencia laboral");
        parrafo(usuario.experiencia);
      }

      if (usuario.estudios) {
        seccion("Estudios");
        parrafo(usuario.estudios);
      }

      if (usuario.habilidades) {
        seccion("Habilidades");
        parrafo(usuario.habilidades);
      }

      const extras = [
        usuario.aniosExperiencia &&
          `Experiencia: ${OPCIONES_EXPERIENCIA.find((o) => o.value === usuario.aniosExperiencia)?.label}`,
        usuario.nivelEstudios &&
          `Nivel de estudios: ${OPCIONES_ESTUDIOS.find((o) => o.value === usuario.nivelEstudios)?.label}`,
        usuario.disponibilidadHorario &&
          `Disponibilidad: ${OPCIONES_HORARIO.find((o) => o.value === usuario.disponibilidadHorario)?.label}`,
        usuario.disponibleViajar && "Disponible para viajar",
      ].filter((linea): linea is string => Boolean(linea));

      if (extras.length > 0) {
        seccion("Datos adicionales");
        extras.forEach((linea) => parrafo(`•  ${linea}`));
      }

      doc.save(`cv-${usuario.slug}.pdf`);
    } finally {
      setGenerando(false);
    }
  }

  if (cargando) return null;

  if (!firebaseUser) {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium"
      >
        <Lock className="w-4 h-4" aria-hidden="true" />
        Iniciá sesión para descargar el CV
      </Link>
    );
  }

  return (
    <button
      onClick={generarPdf}
      disabled={generando}
      className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/30 px-4 py-2 rounded-lg transition-colors duration-300 text-sm font-medium disabled:opacity-50"
    >
      <FileText className="w-4 h-4" aria-hidden="true" />
      {generando ? "Generando..." : "Descargar CV (PDF)"}
    </button>
  );
}
