import { supabaseAdmin } from "@/lib/supabaseServer";

export default async function StaffPage() {
  const { data: staff } = await supabaseAdmin
    .from("staff")
    .select("*")
    .order("episodios_completados", { ascending: false });

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-wide mb-6">EQUIPO STAFF</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(staff ?? []).map((s) => (
          <div key={s.discord_id} className="glass-panel shadow-glass p-4 flex gap-3 items-center">
            <div className="w-12 h-12 rounded-full bg-base-800 overflow-hidden shrink-0">
              {s.avatar_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={s.avatar_url} alt="" className="w-full h-full object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold truncate">@{s.username}</p>
              <p className="text-xs text-slate-400">{s.rango}</p>
              <div className="flex gap-1 flex-wrap mt-1">
                {(s.especialidades ?? []).map((e: string) => (
                  <span key={e} className="text-[10px] px-1.5 py-0.5 rounded bg-neon-cyan/10 text-neon-cyan">
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-lg font-bold text-neon-green">{s.episodios_completados}</p>
              <p className="text-[10px] text-slate-500">episodios</p>
              {s.estado_afk && (
                <p className="text-[10px] text-neon-amber mt-1">🌴 AFK</p>
              )}
            </div>
          </div>
        ))}

        {(!staff || staff.length === 0) && (
          <p className="text-slate-400 text-sm col-span-full">
            Todavía no hay staff registrado. Se agregan automáticamente al iniciar sesión en el panel,
            o podés cargarlos manualmente desde Supabase.
          </p>
        )}
      </div>
    </div>
  );
}
