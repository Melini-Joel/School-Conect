export type Trabajo = {
  puesto: string;
  empresa: string;
  desde: string;
  hasta: string;
  descripcion: string;
};

export type Usuario = {
  slug: string;
  nombre: string;
  uid: string;
  tipo: "busca-empleo" | "empleador";
  bio: string;
  // URL de la foto de perfil en Cloudinary
  foto?: string;
  email?: string;
  telefono?: string;
  // Texto libre de perfiles viejos; los nuevos usan "experiencias"
  experiencia?: string;
  experiencias?: Trabajo[];
  estudios?: string;
  habilidades?: string;
  aniosExperiencia?: "sin-experiencia" | "1-2" | "3-5" | "5+";
  nivelEstudios?: "secundario" | "terciario" | "universitario" | "posgrado";
  disponibilidadHorario?: "tiempo-completo" | "medio-tiempo" | "flexible";
  disponibleViajar?: boolean;
  visitas?: number;
};
