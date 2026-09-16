// app/lib/obtenerPublicaciones.ts
console.log("db es:", db);
import { db } from "@/app/lib/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { Publicacion } from "@/types/publicacion";

export async function obtenerPublicaciones(): Promise<Publicacion[]> {
  const q = query(collection(db, "publicaciones"), orderBy("fecha", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Publicacion);
}