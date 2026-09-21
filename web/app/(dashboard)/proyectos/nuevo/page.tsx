"use client";

import { useState } from "react";
import { crearProyecto } from "../actions";

const TIPOS = ["ANIME", "HENTAI", "MANGA", "MANHWA", "PELICULA", "SERIE"];

export default function NuevaSeriePage() {
  const [tipo, setTipo] = useState("ANIME");
  const esGrafico = tipo === "MANGA" || tipo === "MANHWA";

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-wide mb-6">AÑADIR NUEVA SERIE</h1>

      <form action={crearProyecto} className="glass-panel shadow-glass p-6 space-y-5">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Título</label>
          <input
            name="titulo"
            required
            className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
            placeholder="Ej: Naruto Shippuden"
          />
          <p className="text-xs text-slate-500 mt-1">
            El slug (URL) se genera automáticamente a partir del título.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Tipo de contenido</label>
            <select
              name="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full bg-base-900 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
            >
              {TIPOS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Año</label>
            <input
              name="año"
              type="number"
              defaultValue={new Date().getFullYear()}
              className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
            />
          </div>
        </div>

        {!esGrafico && (
          <div>
            <label className="block text-sm text-slate-400 mb-1">Horario de emisión</label>
            <input
              name="horario"
              placeholder="Ej: Jueves 19:30 JST"
              className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
            />
          </div>
        )}

        {esGrafico && (
          <p className="text-xs text-neon-magenta bg-neon-magenta/10 border border-neon-magenta/30 rounded-lg px-3 py-2">
            Tipo gráfico detectado: se ocultan los campos de emisión multimedia y las fases de
            staff se adaptarán a edición gráfica (Limpieza / Typesetting / Redibujo / QC) al asignar personal.
          </p>
        )}

        <div>
          <label className="block text-sm text-slate-400 mb-1">Enlace de portada (URL)</label>
          <input
            name="portada_url"
            placeholder="https://..."
            className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-slate-300">
          <input type="checkbox" name="es_adulto" className="accent-neon-magenta" />
          Contenido +18 (aplica difuminado automático de portada en el catálogo)
        </label>

        <button
          type="submit"
          className="w-full rounded-lg bg-neon-cyan/20 border border-neon-cyan text-neon-cyan py-2.5 font-medium hover:bg-neon-cyan/30 transition-colors"
        >
          Crear serie
        </button>
      </form>
    </div>
  );
}
