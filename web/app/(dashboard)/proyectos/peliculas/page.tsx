import ProjectCard from "@/components/ProjectCard";
import { getProyectos } from "@/lib/proyectos";

export default async function PeliculasPage() {
  const proyectos = await getProyectos(["PELICULA", "SERIE"]);

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-wide mb-6">PELÍCULAS / SERIES</h1>
      <div className="flex flex-col gap-4">
        {proyectos.map((p) => (
          <ProjectCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}
