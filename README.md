Eternal Frontend

Next.js + Tailwind CSS 기반 Eternal 서비스 프론트엔드 애플리케이션

🚀 Tech Stack

Framework: Next.js

Styling: Tailwind CSS

세부 설정(App Router, 상태 관리, 배포 환경 등)은
프론트엔드 초기 세팅 과정에서 협의 후 확정됩니다.

📁 Project Structure (Planned)
FE/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Global layout
│   │   ├── page.tsx      # Root page (/)
│   │   └── api/          # API Routes (optional)
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities & API helpers
│   ├── styles/           # Global styles
│   └── types/            # Type definitions
├── public/               # Static assets
├── next.config.js        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
└── package.json


실제 구조는 개발 진행 상황에 따라 변경될 수 있습니다.

🛠️ Setup (Planned)
Prerequisites

Node.js >= 18.x

npm (or yarn / pnpm)

Installation
npm install
npm run dev


Development server: http://localhost:3000

📜 Available Scripts (Expected)
Development

npm run dev – Start development server

npm run build – Build for production

npm run start – Start production server

Code Quality

ESLint / Prettier 설정 예정

🏗️ Responsibility (Frontend Scope)

사용자 화면(UI) 구현

클라이언트 상태 관리

백엔드 API 연동

프론트엔드 빌드 및 배포 설정

📌 Current Status

 프론트엔드 초기 환경 세팅

 프로젝트 구조 확정

 공통 레이아웃 설계

 API 연동 구조 정의

📝 Notes

본 레포지토리는 프론트엔드 전용입니다.

백엔드 API는 별도 레포(Eternal Backend API)에서 관리됩니다.

기술 스택 및 구조는 초기 세팅 단계에서 일부 변경될 수 있습니다.

👥 Contributing (Draft)

기능 단위 브랜치 사용

커밋 전 코드 스타일 확인

변경 사항은 PR을 통해 공유

About

Eternal 서비스 프론트엔드 레포지토리
