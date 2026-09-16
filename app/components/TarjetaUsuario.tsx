import BotonGuardar from "./BotonGuardar";

type TarjetaUsuarioProps = {
  nombre: string;
  curso: string;
  bio: string;
};

export default function TarjetaUsuario({ nombre, curso, bio }: TarjetaUsuarioProps) {
  return (
    <div className="border rounded-lg p-4 shadow-lg hover:text-blue-500 hover:bg-[#f0f0f0] transition-colors duration-300">
      <h3 className="font-semibold text-lg">{nombre}</h3>
      <p className="text-slate-600">{curso}</p>
      <p className="text-slate-600">{bio}</p>
      <BotonGuardar />
    </div>
  );
}