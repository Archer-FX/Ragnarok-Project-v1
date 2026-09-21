import type { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { supabaseAdmin } from "@/lib/supabaseServer";

export const authOptions: NextAuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    // Se ejecuta cada vez que alguien intenta iniciar sesión.
    // Sólo dejamos pasar si el discord_id está en la tabla admins_permitidos.
    async signIn({ user, account, profile }) {
      const discordId = (profile as any)?.id as string | undefined;
      if (!discordId) return false;

      const { data, error } = await supabaseAdmin
        .from("admins_permitidos")
        .select("discord_id")
        .eq("discord_id", discordId)
        .maybeSingle();

      if (error) {
        console.error("Error verificando admins_permitidos:", error);
        return false;
      }

      // Si no está en la lista blanca, se rechaza el login.
      if (!data) return false;

      // Nos aseguramos de que exista (o se actualice) su fila en "staff",
      // así el panel siempre tiene su avatar/username sincronizado con Discord.
      await supabaseAdmin.from("staff").upsert({
        discord_id: discordId,
        username: (profile as any)?.username ?? user.name ?? "Staff",
        avatar_url: user.image ?? null,
        es_admin: true,
      });

      return true;
    },
    async jwt({ token, profile }) {
      if (profile) {
        token.discordId = (profile as any).id;
      }
      return token;
    },
    async session({ session, token }) {
      (session.user as any).discordId = token.discordId;
      return session;
    },
  },
};
