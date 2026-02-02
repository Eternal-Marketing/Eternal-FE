import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
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
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shine': 'shine 2.5s ease-in-out infinite',
        'ping-slow': 'ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(99, 102, 241, 0.4), 0 0 10px rgba(99, 102, 241, 0.2)',
          },
          '50%': {
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.6), 0 0 25px rgba(99, 102, 241, 0.3)',
          },
        },
        'shine': {
          '0%': {
            transform: 'translateX(-100%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        'ping-slow': {
          '0%': {
            transform: 'scale(1)',
            opacity: '0.8',
          },
          '75%, 100%': {
            transform: 'scale(1.5)',
            opacity: '0',
          },
        },
      },
    },
  },
};

export default config;
