import { createClient } from "@supabase/supabase-js";

// Cliente para usar en Client Components (navegador).
// Usa la anon key: sólo puede leer lo que las políticas RLS permiten (ver supabase/schema.sql).
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
