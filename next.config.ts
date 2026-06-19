import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/hipotecas", destination: "/", permanent: true },
      { source: "/hipotecas/:path*", destination: "/", permanent: true },
      { source: "/infonavit", destination: "/", permanent: true },
      { source: "/infonavit/:path*", destination: "/", permanent: true },
      { source: "/agendar", destination: "/", permanent: true },
      { source: "/agendar/:path*", destination: "/", permanent: true },
      { source: "/matcher", destination: "/", permanent: true },
      { source: "/matcher/:path*", destination: "/", permanent: true },
      { source: "/api/agendar", destination: "/", permanent: true },
      { source: "/api/matcher", destination: "/", permanent: true },
      { source: "/api/crm-event", destination: "/", permanent: true },
      { source: "/api/checklist-pdf", destination: "/", permanent: true },
      { source: "/api/guide-download", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
