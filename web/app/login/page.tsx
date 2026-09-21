"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="glass-panel shadow-glass w-full max-w-md p-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-3xl">🦊</span>
          <h1 className="text-2xl font-bold">
            MiFansub <span className="text-neon-cyan">Core</span>
          </h1>
        </div>
        <p className="text-sm text-slate-400 mb-1 uppercase tracking-widest">
          Panel de control del staff
        </p>
        <p className="text-slate-400 text-sm mb-8">
          Iniciá sesión para gestionar el progreso de tus series
        </p>

        <button
          onClick={() => signIn("discord", { callbackUrl: "/proyectos" })}
          className="w-full flex items-center justify-center gap-3 rounded-lg bg-[#5865F2] hover:bg-[#4752c4] transition-colors py-3 font-medium shadow-neon-cyan"
        >
          <span>🎮</span> Iniciar sesión con Discord
        </button>

        <p className="text-xs text-slate-500 mt-6">
          Verificación segura vía OAuth2 · Sólo el staff autorizado puede acceder
        </p>
      </div>
    </main>
  );
}
