export { default } from "next-auth/middleware";

// Protege todo el panel administrativo. Quedan siempre públicos:
// - /login (pantalla de acceso)
// - /embed/* (widget iFrame para WordPress)
// - /api/auth/* (rutas internas de NextAuth)
export const config = {
  matcher: [
    "/((?!login|embed|api/auth|_next/static|_next/image|favicon.ico).*)",
  ],
};
