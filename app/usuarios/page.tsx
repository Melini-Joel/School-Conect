import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";
import ListaUsuarios, { type UsuarioResumen } from "@/app/components/ListaUsuarios";

// Leer Firestore en cada visita; si no, Next arma la lista una sola vez al compilar
export const dynamic = "force-dynamic";

export default async function UsuariosPage() {
  const usuarios = await obtenerUsuarios();
  const resumenes: UsuarioResumen[] = usuarios.map((u) => ({
    slug: u.slug,
    nombre: u.nombre,
    foto: u.foto,
    tipo: u.tipo,
    bio: u.bio,
    habilidades: u.habilidades,
    aniosExperiencia: u.aniosExperiencia,
    nivelEstudios: u.nivelEstudios,
    disponibilidadHorario: u.disponibilidadHorario,
    disponibleViajar: u.disponibleViajar,
  }));
  return <ListaUsuarios usuarios={resumenes} />;
}
