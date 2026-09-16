// app/components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    /* { href: "/usuarios", label: "Usuarios" }, */
    { href: "/login", label: "Ingresar" },
  ];

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between">
      <Link
        href="/"
        className="text-xl font-bold text-indigo-500 flex items-center gap-2"
      >
        🎓 School-Conect
      </Link>
      <div className="flex gap-6 text-sm font-medium">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`transition-colors ${
              pathname === link.href
                ? "text-indigo-500"
                : "text-slate-600 hover:text-indigo-500"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
