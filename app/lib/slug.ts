// app/lib/slug.ts
// Arma un slug seguro para la URL: sin tildes ni símbolos, ej: "José Pérez" -> "jose-perez-a1b2c3"
export function crearSlug(nombre: string, uid: string) {
  const base = nombre
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${base || "usuario"}-${uid.slice(0, 6)}`;
}
