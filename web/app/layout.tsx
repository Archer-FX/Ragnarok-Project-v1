import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MiFansub Core",
  description: "Panel de gestión de proyectos para grupos de fansub",
  icons: { icon: "data:," },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="dark">
      <body className="bg-base-950 text-slate-100 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
