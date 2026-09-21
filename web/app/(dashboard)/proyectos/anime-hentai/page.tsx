import ProjectCard from "@/components/ProjectCard";
import { getProyectos } from "@/lib/proyectos";

export default async function AnimeHentaiPage() {
  const proyectos = await getProyectos(["ANIME", "HENTAI"]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-wide mb-6">ANIME / HENTAI</h1>
      <p className="text-xs text-slate-500 mb-4">
        Las portadas marcadas como contenido +18 se muestran difuminadas hasta pasar el cursor sobre ellas.
      </p>
      <div className="flex flex-col gap-4">
        {proyectos.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
