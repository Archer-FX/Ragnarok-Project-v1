"use client";

import { useState } from "react";
import Link from "next/link";
import { actualizarProgreso, borrarProyecto } from "../../actions";

type Proyecto = {
  id: string;
  slug: string;
  titulo: string;
  tipo: string;
  estado: string;
  episodio_actual: number | null;
  horario: string | null;
  portada_url: string | null;
  progreso_tl: number;
  progreso_cr: number;
  progreso_sinc: number;
  progreso_qc: number;
};

const FASES: { key: keyof Proyecto; label: string; color: string }[] = [
  { key: "progreso_tl", label: "Traducción (TL)", color: "accent-neon-cyan" },
  { key: "progreso_cr", label: "Corrección (CR)", color: "accent-neon-magenta" },
  { key: "progreso_sinc", label: "Sincronía (SINC)", color: "accent-neon-green" },
  { key: "progreso_qc", label: "Control de Calidad (QC)", color: "accent-neon-amber" },
];

export default function EditorProyecto({ proyecto }: { proyecto: Proyecto }) {
  const [valores, setValores] = useState({
    progreso_tl: proyecto.progreso_tl,
    progreso_cr: proyecto.progreso_cr,
    progreso_sinc: proyecto.progreso_sinc,
    progreso_qc: proyecto.progreso_qc,
  });

  return (
    <div className="max-w-2xl">
      <Link href="/proyectos" className="text-sm text-slate-400 hover:text-neon-cyan">
        ← Volver
      </Link>
      <h1 className="text-2xl font-bold tracking-wide mt-2 mb-6">{proyecto.titulo}</h1>

      <form action={actualizarProgreso} className="glass-panel shadow-glass p-6 space-y-5">
        <input type="hidden" name="id" value={proyecto.id} />
        <input type="hidden" name="slug" value={proyecto.slug} />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Título</label>
            <input
              name="titulo"
              defaultValue={proyecto.titulo}
              className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Episodio</label>
            <input
              name="episodio_actual"
              type="number"
              defaultValue={proyecto.episodio_actual ?? 1}
              className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Horario</label>
          <input
            name="horario"
            defaultValue={proyecto.horario ?? ""}
            className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Estado</label>
          <select
            name="estado"
            defaultValue={proyecto.estado}
            className="w-full bg-base-900 border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
          >
            <option value="TRABAJANDO">Trabajando</option>
            <option value="FINALIZADO">Finalizado</option>
            <option value="PAUSADO">Pausado</option>
            <option value="CANCELADO">Cancelado</option>
          </select>
        </div>

        <div className="space-y-4 pt-2">
          {FASES.map((f) => (
            <div key={f.key}>
              <div className="flex justify-between text-sm mb-1">
                <span>{f.label}</span>
                <span>{valores[f.key as keyof typeof valores]}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                name={f.key}
                value={valores[f.key as keyof typeof valores]}
                onChange={(e) =>
                  setValores((v) => ({ ...v, [f.key]: Number(e.target.value) }))
                }
                className={`w-full ${f.color}`}
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Enlace de portada (URL)</label>
          <input
            name="portada_url"
            defaultValue={proyecto.portada_url ?? ""}
            className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="flex-1 rounded-lg bg-neon-cyan/20 border border-neon-cyan text-neon-cyan py-2.5 font-medium hover:bg-neon-cyan/30 transition-colors"
          >
            Guardar cambios
          </button>
        </div>
      </form>

      <form action={borrarProyecto} className="mt-4">
        <input type="hidden" name="id" value={proyecto.id} />
        <button className="text-xs text-red-400 hover:text-red-300">
          🗑 Eliminar esta serie
        </button>
      </form>
    </div>
  );
}
