import { supabaseAdmin } from "@/lib/supabaseServer";
import type { Proyecto } from "@/components/ProjectCard";

export async function getProyectos(filtroTipo?: string[]): Promise<Proyecto[]> {
  let query = supabaseAdmin
    .from("proyectos")
    .select(`*, asignaciones(fase_asignada, staff:staff_id (username))`)
    .order("created_at", { ascending: false });

  if (filtroTipo?.length) query = query.in("tipo", filtroTipo);

  const { data, error } = await query;
  if (error) throw error;

  return (data ?? []).map((p: any) => {
    const asignados: Record<string, string> = {};
    for (const a of p.asignaciones ?? []) {
      asignados[a.fase_asignada.toLowerCase()] = a.staff?.username;
    }
    return { ...p, asignados } as Proyecto;
  });
}
