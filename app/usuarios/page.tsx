import { obtenerUsuarios } from "@/app/lib/obtenerUsuarios";
import ListaUsuarios from "@/app/components/ListaUsuarios";

export default async function UsuariosPage() {
  const usuarios = await obtenerUsuarios();
  return <ListaUsuarios usuarios={usuarios} />;
}