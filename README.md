# ETERNAL MARKETING

마케팅 인텔리전스 AI를 소개하는 랜딩·서비스 웹사이트 프로젝트입니다.

---

## 📋 프로젝트 소개

ETERNAL MARKETING은 AI 기반 마케팅 솔루션을 제공하는 회사의 공식 웹사이트입니다.  
홈, ABOUT, SERVICE, COLUMN, AI 진단, 개인정보처리방침·이용약관 등 다양한 페이지로 회사 소개, 서비스, 고객 사례, AI 진단 신청을 제공합니다.

---

## 🛠️ 사용 기술

| 구분 | 기술 |
|------|------|
| **Framework** | Next.js 16.1.1 (App Router) |
| **UI** | React 19.2.3 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **폰트** | Freesentation (woff2/ttf, 500~900 weight) |

- **의존성**: `next`, `react`, `react-dom`  
- **개발 도구**: `@tailwindcss/postcss`, `eslint`, `eslint-config-next`, `tailwindcss`, `typescript`

---

## 📁 페이지 구성

모든 마케팅 페이지는 공통 **Header**, **Footer**, **FloatingCTA**, **PageTransition** 레이아웃을 사용합니다.

| 경로 | 설명 |
|------|------|
| **`/`** | **홈** — 히어로 → 회사소개 → 플랫폼 → 리뷰/상장 → 프로세스(무한대) → AI 진단 CTA |
| **`/about`** | **ABOUT** — 히어로, Our Story & Philosophy, 파란 스트립, 이터널이 기준이 되는 이유, 인텔리전스, Our Team, CTA |
| **`/service`** | **SERVICE** — 히어로, 인트로, CTA 배너, 네이버 마케팅(4종), 퍼포먼스(RWD/SEO), 운영 원칙, 인텔리전스, 케이스 스터디(D2C 등), 하단 CTA |
| **`/column`** | **COLUMN** — 칼럼 목록·카테고리·상세(`/column/[slug]`, `/column/category/[categorySlug]`) |
| **`/ai-diagnosis`** | **AI 진단 1단계** — 문진표 기반 1단계 폼 |
| **`/ai-diagnosis/step-2`** | **AI 진단 2단계** — 2단계 폼 |
| **`/privacy`** | **개인정보처리방침** |
| **`/terms`** | **이용약관** |

### 홈(`/`) 섹션 구성

1. **HeroSection** — 메인 비주얼, 타이틀, 스크롤 유도
2. **AboutSection** — 회사 소개, AI 마케팅 인텔리전스, 데이터·성과
3. **PlatformsSection** — 플랫폼 로고, 무한 스크롤
4. **ReviewSection** — “판단은 이미 증명되어 있었고…” 문구, 리뷰 카드(8개), “이미 기준이 된 이터널의 판단”, 상장 이미지(3개)
5. **InfiniteSection** — 프로세스 플로우(STEP 01~04), 무한대 루프
6. **DiagnosisSection** — “정답은 이미 여기 있습니다”, AI 진단 받기 버튼, 실시간 진단 진행 건수

### 공통 레이아웃 컴포넌트

- **Header** — 로고, 네비(ABOUT/COLUMN/SERVICE), AI 진단 받기 CTA, 모바일·태블릿 시 햄버거 + 드로어
- **Footer** — 로고, 회사 정보(대표/사업자/이메일/주소/도메인), AI·데이터 활용 고지, 네비 링크, 저작권
- **FloatingCTA** — 우측 하단 AI 진단 받기 플로팅 버튼
- **PageTransition** — 페이지 전환 애니메이션

---

## 🚀 사용 방법

### 요구사항

- Node.js 18 이상  
- npm / yarn / pnpm / bun

### 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 에 접속합니다.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

### 린트

```bash
npm run lint
```

---

## 📱 반응형 구성

Tailwind 기본 브레이크포인트와 커스텀 `desktop`을 사용하며, **1440px**을 기준으로 디자인합니다.

| 브레이크포인트 | 최소 너비 | 용도 |
|----------------|-----------|------|
| **(기본)** | 0px | 모바일 |
| **sm** | 640px | 작은 태블릿 |
| **md** | 768px | 태블릿 |
| **lg** | 1024px | 노트북·작은 데스크톱 |
| **xl** | 1280px | 데스크톱 |
| **desktop** | 1440px | 디자인 기준 너비 |
| **2xl** | 1536px | 큰 화면 |

- **모바일**: 1열, 햄버거 메뉴, 드로어 네비, 플로팅 CTA, 카드·폼 세로 배치
- **태블릿**: 2~3열 그리드, CTA·카드 크기·간격 조정
- **데스크톱(lg~)**: 가로 네비, 플로팅 헤더, 최대 너비 컨테이너(예: `max-w-[1163px]`, `max-w-[1440px]`)

---

## 🎨 Theme & CSS 컬러톤

### 디자인 토큰 (`src/app/globals.css` — `@theme inline`)

| 토큰 | 값 | 용도 |
|------|-----|------|
| **--color-primary** | `#184BBA` | 메인 블루(CTA, 강조, 링크) |
| **--color-bg** | `#FFFFFF` | 기본 배경 |
| **--color-main** | `#111111` | 본문 텍스트 |
| **--color-inverse** | `#FFFFFF` | 어두운 배경 위 텍스트 |
| **--color-sub1** | `#505050` | 부가 텍스트 |
| **--color-sub2** | `#767676` | 보조 텍스트 |
| **--color-sub3** | `#999999` | 캡션·구분자 |

### 폰트

- **--font-sans**: `"Freesentation", Arial, Helvetica, sans-serif`  
- Freesentation: 500(Medium), 600(SemiBold), 700(Bold), 800(ExtraBold), 900(Black)

### 타이포그래피 (`src/styles/typography.css`)

| 클래스 | 크기 | 굵기 |
|--------|------|------|
| `.text-headline` | 64px | 800 |
| `.text-h1` | 48px | 700 |
| `.text-h2` | 36px | 700 |
| `.text-h3` | 24px | 600 |
| `.text-h4` | 20px | 500 |
| `.text-body` | 16px | 500 |
| `.text-body-sm` | 14px | 500 |
| `.text-caption` | 12px | 500 |
| `.text-logo` | 16px | 900 |

---

## 📂 프로젝트 구조

```
src/
├── app/
│   ├── globals.css           # 전역 스타일, @theme, 폰트, 애니메이션
│   ├── layout.tsx             # 루트 레이아웃
│   └── (marketing)/
│       ├── layout.tsx         # Header, Footer, FloatingCTA, PageTransition
│       ├── page.tsx           # 홈
│       ├── about/page.tsx
│       ├── service/page.tsx   # + Service*Section 컴포넌트들
│       ├── column/page.tsx, [slug], category/[categorySlug]
│       ├── ai-diagnosis/page.tsx, step-2/page.tsx
│       ├── privacy/page.tsx
│       └── terms/page.tsx
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── FloatingCTA.tsx
│   │   └── PageTransition.tsx
│   └── sections/
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── PlatformsSection.tsx
│       ├── ReviewSection.tsx
│       ├── InfiniteSection.tsx
│       ├── DiagnosisSection.tsx
│       └── CTASection.tsx
└── styles/
    └── typography.css
```

---

## ✨ 주요 기능

- **스크롤 애니메이션**: Intersection Observer 기반 FadeIn, SlideIn, ScaleIn
- **숫자 카운팅**: DiagnosisSection·CTASection 실시간 진단 건수 카운트업
- **반응형**: 모바일·태블릿·데스크톱별 레이아웃·타이포·간격 조정
- **헤더**: 스크롤 시 플로팅 막대 형태, 모바일·태블릿 드로어 메뉴
- **폼**: AI 진단 1·2단계 문진표
- **커스텀 폰트**: Freesentation (woff2/ttf)
- **Tailwind 애니메이션**: `animate-shine`, `animate-pulse-glow`, `animate-ping-slow` 등

---

## 🚢 배포

Vercel 등에 배포할 때:

```bash
npm run build
```

빌드 후 프로젝트를 연결하면 Next.js가 자동으로 최적화된 프로덕션 빌드를 제공합니다.

---

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.
