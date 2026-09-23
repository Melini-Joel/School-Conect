// types/publicacion.ts
import type { Timestamp } from "firebase/firestore";

export type Publicacion = {
  id: string;
  autorUid: string;
  autorNombre: string;
  autorCurso: string;
  texto: string;
  fecha: Timestamp;
  likes?: string[];
};