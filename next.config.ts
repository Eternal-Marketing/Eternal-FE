import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // 로컬 /public 이미지는 기본 지원. 외부 도메인 쓸 때만 추가
    // remotePatterns: [{ hostname: 'example.com', pathname: '/images/**' }],
  },
};

export default nextConfig;
