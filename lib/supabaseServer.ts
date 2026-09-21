import { createClient } from "@supabase/supabase-js";

// ¡Sólo usar dentro del servidor! (Server Components, Server Actions, Route Handlers)
// La Service Role Key tiene acceso total y se salta RLS: nunca debe llegar al navegador.
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false },
  }
);
