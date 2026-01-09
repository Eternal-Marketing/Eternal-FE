# ETERNAL MARKETING

마케팅 인텔리전스 AI를 소개하는 랜딩 페이지 프로젝트입니다.

## 📋 프로젝트 소개

ETERNAL MARKETING은 AI 기반 마케팅 솔루션을 제공하는 회사의 공식 웹사이트입니다. 
다양한 섹션을 통해 회사 소개, 서비스 프로세스, 고객 리뷰 등을 효과적으로 전달합니다.

## 🛠️ 기술 스택

- **Framework**: Next.js 16.1.1
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **3D Animation**: Spline

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx            # 메인 페이지
│   ├── layout.tsx          # 루트 레이아웃
│   └── globals.css         # 전역 스타일 및 애니메이션
├── components/
│   └── sections/           # 섹션 컴포넌트들
│       ├── HeroSection.tsx         # 메인 히어로 섹션
│       ├── AboutSection.tsx         # 회사 소개 섹션
│       ├── PlatformsSection.tsx    # 플랫폼 섹션
│       ├── ReviewSection.tsx       # 리뷰 및 상장 섹션
│       ├── InfiniteSection.tsx     # 프로세스 플로우 섹션
│       ├── DiagnosisSection.tsx     # AI 진단 섹션
│       └── FooterSection.tsx        # 푸터 섹션
└── styles/
    └── typography.css      # 타이포그래피 스타일
```

## 🚀 시작하기

### 필수 요구사항

- Node.js 18 이상
- npm, yarn, pnpm 또는 bun

### 설치

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 개발 서버 실행

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm start
```

## 📦 주요 섹션

### HeroSection
- 3D 배경 애니메이션 (Spline)
- 헤더 네비게이션
- 메인 타이틀 및 서브 타이틀
- 스크롤 유도 화살표

### AboutSection
- 회사 소개 및 AI 마케팅 인텔리전스 설명
- 데이터 결과 통계 (1200000건+)
- 매출 성장률 및 파트너십 유지율
- 전문 인력 및 팀 구조

### PlatformsSection
- 다양한 마케팅 플랫폼 로고 (Naver, Google, TikTok, YouTube, Instagram)
- 무한 스크롤 애니메이션

### ReviewSection
- 고객 리뷰 카드 (8개)
- 수상 상장 이미지 (3개)
- 리뷰 카드 스크롤 애니메이션

### InfiniteSection
- 프로세스 플로우 시각화
- 4단계 프로세스 (STEP 01-04)
- 중앙 무한대 루프 아이콘

### DiagnosisSection
- AI 진단 받기 CTA 버튼
- 실시간 진단 진행 현황
- 버튼 글로우 애니메이션

### FooterSection
- 회사 정보 및 연락처
- AI·데이터 활용 고지
- 네비게이션 링크
- 저작권 정보

## ✨ 주요 기능

- **스크롤 애니메이션**: Intersection Observer를 활용한 요소별 애니메이션
- **숫자 카운팅**: 0부터 목표 숫자까지 카운팅 애니메이션
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 대응
- **커스텀 폰트**: Freesentation 폰트 사용
- **3D 애니메이션**: Spline을 활용한 배경 3D 효과

## 🎨 스타일 가이드

### 폰트
- **Freesentation**: 커스텀 폰트 (Regular 400, Medium 500, Bold 700)

### 주요 색상
- **Primary Blue**: #184BBA
- **Text Color**: #000, #505050, #999
- **Background**: #F5F5F5, #F6F6F6

### 애니메이션
- FadeIn: 페이드인 효과
- SlideIn: 슬라이드인 효과 (left/right/up/down)
- ScaleIn: 스케일인 효과
- CountUpNumber: 숫자 카운팅 애니메이션

## 📝 개발 가이드

### 컴포넌트 구조
각 섹션은 독립적인 컴포넌트로 구성되어 있으며, `src/components/sections/` 디렉토리에 위치합니다.

### 애니메이션 사용
애니메이션은 각 섹션 내부에 정의된 컴포넌트를 사용합니다:
- `FadeIn`: 페이드인 애니메이션
- `SlideIn`: 슬라이드인 애니메이션
- `ScaleIn`: 스케일인 애니메이션
- `CountUpNumber`: 숫자 카운팅 애니메이션

### 스타일링
- Tailwind CSS 클래스를 주로 사용
- 인라인 스타일은 Figma 디자인과 정확히 일치해야 할 때 사용
- 반응형은 Tailwind의 breakpoint 사용 (md, lg, desktop)

## 🚢 배포

### Vercel 배포
가장 쉬운 방법은 [Vercel Platform](https://vercel.com/new)을 사용하는 것입니다.

```bash
npm run build
```

빌드 후 Vercel에 배포하면 자동으로 최적화된 프로덕션 버전이 배포됩니다.

## 📄 라이선스

이 프로젝트는 비공개 프로젝트입니다.
