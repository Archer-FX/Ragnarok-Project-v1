import { supabaseAdmin } from "@/lib/supabaseServer";

async function guardarAjustes(formData: FormData) {
  "use server";
  const dominios = String(formData.get("dominios") || "")
    .split(",")
    .map((d) => d.trim())
    .filter(Boolean);

  await supabaseAdmin
    .from("ajustes")
    .upsert({ clave: "dominios_iframe_permitidos", valor: dominios });
}

export default async function AjustesPage() {
  const { data: ajuste } = await supabaseAdmin
    .from("ajustes")
    .select("valor")
    .eq("clave", "dominios_iframe_permitidos")
    .maybeSingle();

  const dominios: string[] = ajuste?.valor ?? ["*"];

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold tracking-wide mb-6">AJUSTES</h1>

      <form action={guardarAjustes} className="glass-panel shadow-glass p-6 space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Dominios permitidos para el widget iFrame
          </label>
          <input
            name="dominios"
            defaultValue={dominios.join(", ")}
            placeholder="miweb.com, misegundodominio.com"
            className="w-full bg-transparent border border-white/15 rounded-lg px-3 py-2 outline-none focus:border-neon-cyan"
          />
          <p className="text-xs text-slate-500 mt-1">
            Usá &quot;*&quot; para permitir cualquier dominio. Separá varios con comas.
          </p>
        </div>

        <button className="rounded-lg bg-neon-cyan/20 border border-neon-cyan text-neon-cyan px-4 py-2 text-sm">
          Guardar
        </button>
      </form>

      <div className="glass-panel shadow-glass p-6 mt-6 text-sm text-slate-400 space-y-2">
        <p className="font-semibold text-slate-200">Llaves y bot de Discord</p>
        <p>
          Los tokens del bot de Discord (DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID/SECRET) se
          configuran como variables de entorno del proyecto (Vercel/Netlify) y del bot
          (Railway/Koyeb), no desde esta pantalla, por seguridad. Ver la guía de instalación.
        </p>
      </div>
    </div>
  );
}
