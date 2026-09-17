// types/usuario.ts
export type Usuario = {
  slug: string;
  nombre: string;
  curso: string;
  bio: string;
  uid: string;
  etiquetas?: string[];
};