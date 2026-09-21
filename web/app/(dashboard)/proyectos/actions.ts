"use server";

import { supabaseAdmin } from "@/lib/supabaseServer";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(titulo: string) {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function crearProyecto(formData: FormData) {
  const titulo = String(formData.get("titulo") || "").trim();
  const tipo = String(formData.get("tipo") || "ANIME");
  const año = Number(formData.get("año") || new Date().getFullYear());
  const horario = String(formData.get("horario") || "");
  const portada_url = String(formData.get("portada_url") || "");
  const es_adulto = formData.get("es_adulto") === "on";

  const slug = slugify(titulo) + "-" + Date.now().toString(36);

  const { error } = await supabaseAdmin.from("proyectos").insert({
    titulo,
    slug,
    tipo,
    año,
    horario,
    portada_url,
    es_adulto,
    estado: "TRABAJANDO",
  });

  if (error) throw new Error(error.message);

  revalidatePath("/proyectos");
  redirect("/proyectos");
}

export async function actualizarProgreso(formData: FormData) {
  const id = String(formData.get("id"));
  const slug = String(formData.get("slug"));

  const { error } = await supabaseAdmin
    .from("proyectos")
    .update({
      titulo: String(formData.get("titulo")),
      episodio_actual: Number(formData.get("episodio_actual") || 1),
      horario: String(formData.get("horario") || ""),
      portada_url: String(formData.get("portada_url") || ""),
      progreso_tl: Number(formData.get("progreso_tl") || 0),
      progreso_cr: Number(formData.get("progreso_cr") || 0),
      progreso_sinc: Number(formData.get("progreso_sinc") || 0),
      progreso_qc: Number(formData.get("progreso_qc") || 0),
      estado: String(formData.get("estado") || "TRABAJANDO"),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/proyectos");
  revalidatePath(`/embed/${slug}`);
  redirect("/proyectos");
}

export async function borrarProyecto(formData: FormData) {
  const id = String(formData.get("id"));
  const { error } = await supabaseAdmin.from("proyectos").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/proyectos");
  redirect("/proyectos");
}
