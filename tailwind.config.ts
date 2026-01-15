import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#184BBA",
        bg: "#FFFFFF",

        main: "#111111",
        inverse: "#FFFFFF",

        sub1: "#505050",
        sub2: "#767676",
        sub3: "#999999",
      },
      screens: {
        // 1440px 기준 반응형 구조
        // 모바일: 기본 (0px~)
        // 태블릿: 640px~
        // 데스크톱: 1024px~
        // 디자인 기준: 1440px~
        desktop: "1440px", // 디자인 기준 너비
        // Tailwind 기본 breakpoint 유지
        // sm: 640px
        // md: 768px
        // lg: 1024px
        // xl: 1280px
        // 2xl: 1536px
      },
    },
  },
};

export default config;
