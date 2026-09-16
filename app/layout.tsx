import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <footer className="text-center text-sm text-slate-400 py-10 mt-12 border-t">
          Proyecto escolar — hecho con Next.js
        </footer>
      </body>
    </html>
  );
}