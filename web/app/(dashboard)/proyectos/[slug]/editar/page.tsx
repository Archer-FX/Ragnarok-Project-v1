import { supabaseAdmin } from "@/lib/supabaseServer";
import { notFound } from "next/navigation";
import EditorProyecto from "./EditorProyecto";

export default async function EditarProyectoPage({
  params,
}: {
  params: { slug: string };
}) {
  const { data: proyecto, error } = await supabaseAdmin
    .from("proyectos")
    .select("*")
    .eq("slug", params.slug)
    .single();

  if (error || !proyecto) notFound();

  return <EditorProyecto proyecto={proyecto} />;
}
