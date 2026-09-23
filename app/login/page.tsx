import BotonLogin from "@/app/components/BotonLogin";
import BotonLogout from "@/app/components/BotonLogout";
import PerfilFormulario from "@/app/components/PerfilFormulario";

export default function LoginPage() {
  return (
    <main className="max-w-sm mx-auto p-8 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <BotonLogin />
        <div className="mt-2">
          <BotonLogout />
        </div>
      </div>

      <PerfilFormulario />
    </main>
  );
}