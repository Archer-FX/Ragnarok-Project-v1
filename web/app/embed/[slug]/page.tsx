import { supabase } from "@/lib/supabaseClient";
import ProgressBar from "@/components/ProgressBar";

export const revalidate = 30; // segundos: refresca el widget sin saturar el servidor

export default async function EmbedPage({ params }: { params: { slug: string } }) {
  const { data: proyecto } = await supabase
    .from("proyectos")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (!proyecto) {
    return (
      <div className="p-6 text-sm text-slate-400 bg-base-950">
        Proyecto no encontrado.
      </div>
    );
  }

  return (
    <div className="bg-base-950 text-slate-100 p-4 font-sans" data-theme="dark">
      <div className="glass-panel shadow-glass p-4 flex gap-4">
        {proyecto.portada_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={proyecto.portada_url}
            alt={proyecto.titulo}
            className={`w-16 h-24 object-cover rounded-lg shrink-0 ${
              proyecto.es_adulto ? "cover-adult" : ""
            }`}
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold truncate">
            {proyecto.titulo} {proyecto.episodio_actual ? `#${proyecto.episodio_actual}` : ""}
          </h3>
          {proyecto.horario && (
            <p className="text-xs text-slate-400 mb-2">{proyecto.horario}</p>
          )}
          <div className="space-y-1.5">
            <ProgressBar label="TL" value={proyecto.progreso_tl} color="cyan" />
            <ProgressBar label="CR" value={proyecto.progreso_cr} color="magenta" />
            <ProgressBar label="SINC" value={proyecto.progreso_sinc} color="green" />
          </div>
        </div>
      </div>
    </div>
  );
}
