import ProjectCard from "@/components/ProjectCard";
import { getProyectos } from "@/lib/proyectos";

export default async function ProyectosPage() {
  const proyectos = await getProyectos();

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold tracking-wide">
          TUS SERIES EN PRODUCCIÓN
        </h1>
        <input
          type="search"
          placeholder="Buscar por título o slug..."
          className="glass-panel px-4 py-2 text-sm outline-none w-full sm:w-72"
        />
      </div>

      <div className="flex flex-col gap-4">
        {proyectos.length === 0 && (
          <p className="text-slate-400 text-sm">
            Todavía no hay series cargadas. Usá &quot;+ Añadir Nueva Serie&quot; en el menú.
          </p>
        )}
        {proyectos.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
