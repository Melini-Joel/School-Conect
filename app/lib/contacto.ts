// app/lib/contacto.ts
// Email y teléfono viven en "contactos/{uid}", que solo pueden leer usuarios logueados.
// Los perfiles viejos todavía los tienen en "usuarios/{uid}" hasta que el dueño inicia sesión.
import { doc, getDoc, writeBatch, deleteField } from "firebase/firestore";
import { db } from "@/app/lib/firebase";
import type { Contacto, Usuario } from "@/types/usuario";

export async function obtenerContacto(usuario: Usuario): Promise<Contacto> {
  const snap = await getDoc(doc(db, "contactos", usuario.uid));
  if (snap.exists()) return snap.data() as Contacto;
  return { email: usuario.email ?? "", telefono: usuario.telefono ?? "" };
}

const migrados = new Set<string>();

// Pasa el contacto de un perfil viejo a "contactos" y lo borra del perfil público
export async function migrarContacto(usuario: Usuario) {
  if (usuario.email === undefined && usuario.telefono === undefined) return;
  if (migrados.has(usuario.uid)) return;
  migrados.add(usuario.uid);

  try {
    const lote = writeBatch(db);
    lote.set(
      doc(db, "contactos", usuario.uid),
      { email: usuario.email ?? "", telefono: usuario.telefono ?? "" },
      { merge: true },
    );
    lote.update(doc(db, "usuarios", usuario.uid), { email: deleteField(), telefono: deleteField() });
    await lote.commit();
  } catch (error) {
    migrados.delete(usuario.uid);
    console.error("No se pudo migrar el contacto:", error);
  }
}
