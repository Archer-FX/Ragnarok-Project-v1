"use client";

import Link from "next/link";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

const ESTADO_STYLE: Record<string, string> = {
  TRABAJANDO: "text-neon-cyan",
  FINALIZADO: "text-neon-green",
  PAUSADO: "text-neon-amber",
  CANCELADO: "text-red-400",
};

export type Proyecto = {
  id: string;
  titulo: string;
  slug: string;
  tipo: string;
  estado: string;
  portada_url: string | null;
  horario: string | null;
  episodio_actual: number | null;
  es_adulto: boolean;
  progreso_tl: number;
  progreso_cr: number;
  progreso_sinc: number;
  asignados?: { tl?: string; cr?: string; sinc?: string };
};

export default function ProjectCard({ p }: { p: Proyecto }) {
  return (
    <div className="glass-panel shadow-glass p-5 flex flex-col md:flex-row gap-5">
      <div className="w-full md:w-24 h-36 md:h-32 relative shrink-0 rounded-lg overflow-hidden bg-base-800">
        {p.portada_url && (
          <Image
            src={p.portada_url}
            alt={p.titulo}
            fill
            className={`object-cover ${p.es_adulto ? "cover-adult" : ""}`}
          />
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-bold text-lg">
              {p.titulo} {p.episodio_actual ? `#${p.episodio_actual}` : ""}
            </h3>
            <span className={`text-xs font-semibold ${ESTADO_STYLE[p.estado]}`}>
              {p.estado.replace("_", " ")}
            </span>
          </div>
          {p.horario && <p className="text-xs text-slate-400">{p.horario}</p>}
        </div>

        <div className="space-y-1.5">
          <ProgressBar label="TL" value={p.progreso_tl} assignee={p.asignados?.tl} color="cyan" />
          <ProgressBar label="CR" value={p.progreso_cr} assignee={p.asignados?.cr} color="magenta" />
          <ProgressBar label="SINC" value={p.progreso_sinc} assignee={p.asignados?.sinc} color="green" />
        </div>
      </div>

      <div className="flex md:flex-col gap-2 shrink-0 md:justify-center">
        <Link
          href={`/proyectos/${p.slug}/editar`}
          className="flex-1 md:flex-none text-center text-sm rounded-lg border border-neon-cyan/40 px-4 py-2 hover:bg-neon-cyan/10 transition-colors"
        >
          ✏️ Editar
        </Link>
        <CopyIframeButton slug={p.slug} />
      </div>
    </div>
  );
}

function CopyIframeButton({ slug }: { slug: string }) {
  const handleCopy = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const snippet = `<iframe src="${origin}/embed/${slug}" width="100%" height="320px" frameborder="0" scrolling="no"></iframe>`;
    navigator.clipboard.writeText(snippet);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-1 md:flex-none text-center text-sm rounded-lg border border-slate-500/30 px-4 py-2 hover:bg-slate-500/10 transition-colors"
    >
      {"</>"} Copiar iFrame
    </button>
  );
}
