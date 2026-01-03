# Eternal Frontend

Next.js + Tailwind CSS 기반 Eternal 서비스 프론트엔드 애플리케이션입니다.  
본 레포지토리는 Eternal 서비스의 사용자 화면(UI) 및 클라이언트 로직을 담당합니다.

---

## 🚀 Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS

> 상태 관리, 데이터 패칭 전략, 배포 환경 등 세부 기술 스택은  
> 프론트엔드 초기 세팅 단계에서 협의 후 확정됩니다.

---

## 📁 Project Structure (Planned)

```bash
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
