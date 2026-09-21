import ProjectCard from "@/components/ProjectCard";
import { getProyectos } from "@/lib/proyectos";

export default async function MangaManhwaPage() {
  const proyectos = await getProyectos(["MANGA", "MANHWA"]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-wide mb-6">MANGA / MANHWA</h1>
      <p className="text-xs text-slate-500 mb-4">
        Las fases de estas series corresponden a edición gráfica (Limpieza, Typesetting, Redibujo, QC).
      </p>
      <div className="flex flex-col gap-4">
        {proyectos.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
