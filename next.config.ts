import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Cloudinary images are resized by Cloudinary itself (see src/components/Img.tsx).
    remotePatterns: [{ protocol: "https", hostname: "res.cloudinary.com" }],
  },
  // The content editor (Sveltia CMS) is a static page in public/admin.
  async redirects() {
    return [{ source: "/admin", destination: "/admin/index.html", permanent: false }];
  },
};

export default nextConfig;
