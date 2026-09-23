export type Usuario = {
  slug: string;
  nombre: string;
  uid: string;
  tipo: "busca-empleo" | "empleador";
  bio: string;
  email?: string;
  telefono?: string;
  experiencia?: string;
  estudios?: string;
  habilidades?: string;
  aniosExperiencia?: "sin-experiencia" | "1-2" | "3-5" | "5+";
  nivelEstudios?: "secundario" | "terciario" | "universitario" | "posgrado";
  disponibilidadHorario?: "tiempo-completo" | "medio-tiempo" | "flexible";
  disponibleViajar?: boolean;
};