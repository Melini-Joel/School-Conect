import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                var tema = localStorage.getItem("tema");
                var prefiereOscuro = window.matchMedia("(prefers-color-scheme: dark)").matches;
                if (tema === "dark" || (!tema && prefiereOscuro)) {
                  document.documentElement.classList.add("dark");
                }
              } catch (e) {}
            })();`,
          }}
        />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-100 min-h-screen flex flex-col transition-colors">
        <Navbar />
        <div className="flex-1 flex flex-col">{children}</div>
        <footer className="text-center text-sm text-slate-400 dark:text-slate-500 py-10 mt-12 border-t border-slate-200 dark:border-slate-800">
          Proyecto escolar — hecho con Next.js
        </footer>
      </body>
    </html>
  );
}