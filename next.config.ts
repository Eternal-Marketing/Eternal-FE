import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      // 칼럼 콘텐츠 등에서 참조하는 구 경로 → 실제 존재하는 이미지로
      { source: "/images/column/column-background.svg", destination: "/images/column-background2.png", permanent: false },
    ];
  },
  async headers() {
    return [
      {
        source: "/introcue_company-pdf/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  images: {
    qualities: [75, 90, 95, 100],
    // avif를 먼저 두면 지원 브라우저(Chrome/Android)에서 WebP보다 40~50% 작은 파일을 받음
    // iOS Safari 16+도 avif 지원 → 모바일 이미지 로드 체감 개선
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
