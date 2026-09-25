// app/lib/opcionesCV.ts
export const OPCIONES_EXPERIENCIA = [
  { value: "sin-experiencia", label: "Sin experiencia" },
  { value: "1-2", label: "1 a 2 años" },
  { value: "3-5", label: "3 a 5 años" },
  { value: "5+", label: "Más de 5 años" },
] as const;

export const OPCIONES_ESTUDIOS = [
  { value: "secundario", label: "Secundario" },
  { value: "terciario", label: "Terciario" },
  { value: "universitario", label: "Universitario" },
  { value: "posgrado", label: "Posgrado" },
] as const;

export const OPCIONES_HORARIO = [
  { value: "tiempo-completo", label: "Tiempo completo" },
  { value: "medio-tiempo", label: "Medio tiempo" },
  { value: "flexible", label: "Flexible" },
] as const;
// Arma el período de un trabajo, ej: "2021 – Actualidad"
export function periodoTrabajo(t: { desde: string; hasta: string }) {
  return [t.desde, t.hasta].filter((v) => v.trim()).join(" – ");
}
