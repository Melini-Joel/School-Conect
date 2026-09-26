import { db } from "@/app/lib/firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import type { Usuario } from "@/types/usuario";

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const snapshot = await getDocs(collection(db, "usuarios"));
  return snapshot.docs.map((doc) => doc.data() as Usuario);
}

export async function obtenerUsuarioPorSlug(slug: string): Promise<Usuario | null> {
  const snapshot = await getDocs(query(collection(db, "usuarios"), where("slug", "==", slug), limit(1)));
  return snapshot.empty ? null : (snapshot.docs[0].data() as Usuario);
}
