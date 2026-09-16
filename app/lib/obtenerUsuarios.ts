import { db } from "@/app/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { Usuario } from "@/types/usuario";

export async function obtenerUsuarios(): Promise<Usuario[]> {
  const snapshot = await getDocs(collection(db, "usuarios"));
  return snapshot.docs.map((doc) => doc.data() as Usuario);
}