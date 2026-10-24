import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 100] },
  async redirects() {
    return [
      { source: "/theatre/photos", destination: "/theatre/lx", permanent: true },
      { source: "/portfolio-assets/theatre/photos/:path*", destination: "/portfolio-assets/theatre/lx/:path*", permanent: true },
      { source: "/starfallbuild1/:path*", destination: "https://rongfeng1203.itch.io/starfall", permanent: false },
      { source: "/duck-breaker-3d/:path*", destination: "https://rongfeng1203.itch.io/wacky-physics-duckbbreaker", permanent: false },
      { source: "/duck-breaker/:path*", destination: "https://rongfeng1203.itch.io/wacky-physics-duckbbreaker", permanent: false },
    ];
  },
};

export default nextConfig;
