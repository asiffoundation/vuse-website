import type { NextConfig } from "next";

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname : "*.supabase.co";

const nextConfig: NextConfig = {
  images: {
    // Ảnh admin tải lên Supabase Storage (bucket `media`).
    remotePatterns: [
      { protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" },
      // Ảnh minh hoạ tạm từ Unsplash (giấy phép Unsplash, dùng miễn phí) — xem src/lib/media.ts
      { protocol: "https", hostname: "unsplash.com", pathname: "/photos/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
