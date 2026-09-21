/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Permite portadas alojadas en cualquier dominio (AniList, MAL, Discord CDN, etc.)
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  // Permite que el widget /embed/[slug] se pueda incrustar en iFrames de WordPress u otros sitios.
  async headers() {
    return [
      {
        source: "/embed/:path*",
        headers: [
          { key: "X-Frame-Options", value: "ALLOWALL" },
          { key: "Content-Security-Policy", value: "frame-ancestors *;" },
        ],
      },
    ];
  },
};

export default nextConfig;
