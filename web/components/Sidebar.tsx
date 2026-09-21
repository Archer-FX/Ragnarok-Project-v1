"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";

const LINKS = [
  { href: "/proyectos", label: "Proyectos", icon: "📋" },
  { href: "/proyectos/anime-hentai", label: "Anime / Hentai", icon: "🎬" },
  { href: "/proyectos/manga-manhwa", label: "Manga / Manhwa", icon: "📖" },
  { href: "/proyectos/peliculas", label: "Películas", icon: "🎞️" },
  { href: "/staff", label: "Staff", icon: "👥" },
  { href: "/ajustes", label: "Ajustes", icon: "⚙️" },
];

export default function Sidebar({
  user,
}: {
  user: { name?: string | null; image?: string | null };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Barra superior móvil */}
      <div className="md:hidden flex items-center justify-between p-4 glass-panel rounded-none border-x-0 border-t-0">
        <span className="font-bold">MiFansub Core</span>
        <button onClick={() => setOpen(!open)} className="text-2xl">☰</button>
      </div>

      <aside
        className={`glass-panel md:shadow-glass md:rounded-none md:border-y-0 md:border-l-0 md:w-64 md:flex md:flex-col md:h-screen md:sticky md:top-0 p-5 ${
          open ? "block" : "hidden"
        } md:block`}
      >
        <div className="hidden md:flex items-center gap-2 mb-8">
          <span className="text-2xl">🦊</span>
          <span className="font-bold text-lg">MiFansub Core</span>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                pathname === l.href
                  ? "bg-neon-cyan/10 text-neon-cyan"
                  : "text-slate-300 hover:bg-white/5"
              }`}
            >
              <span>{l.icon}</span> {l.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/proyectos/nuevo"
          className="w-full text-center rounded-lg border border-neon-cyan/40 py-2.5 text-sm mb-4 hover:bg-neon-cyan/10 transition-colors"
        >
          + Añadir Nueva Serie
        </Link>

        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
          <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
            {user.image && <img src={user.image} alt="" className="w-full h-full object-cover" />}
          </div>
          <span className="text-xs text-slate-300 flex-1 truncate">@{user.name}</span>
          <button onClick={() => signOut({ callbackUrl: "/login" })} className="text-xs text-slate-500 hover:text-red-400">
            Salir
          </button>
        </div>
      </aside>
    </>
  );
}
