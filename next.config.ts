import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { qualities: [75, 100] },
  async redirects() {
    return [
      { source: "/starfallbuild1/:path*", destination: "https://rongfeng1203.itch.io/starfall", permanent: false },
      { source: "/duck-breaker-3d/:path*", destination: "https://rongfeng1203.itch.io/wacky-physics-duckbbreaker", permanent: false },
      { source: "/duck-breaker/:path*", destination: "https://rongfeng1203.itch.io/wacky-physics-duckbbreaker", permanent: false },
    ];
  },
};

export default nextConfig;
