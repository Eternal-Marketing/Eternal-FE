'use client';

import { useState } from 'react';
import Link from 'next/link';

const CATEGORIES = [
  "바이럴 마케팅",
  "퍼포먼스 마케팅",
  "SNS 마케팅",
  "영상 콘텐츠 마케팅",
];

// 더미 아티클 데이터
const FEATURED_ARTICLE = {
  title: "제목",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "Dec 03, 2025",
  image: "/images/column/column-background.svg",
};

const ARTICLES = Array(6).fill(null).map((_, i) => ({
  id: i + 1,
  title: "제목",
  description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  date: "Dec 03, 2025",
}));

export default function ColumnPage() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* Hero (Figma 804:486) */}
      <section className="relative w-full h-[386px] overflow-hidden" data-node-id="804:486">
        <img 
          src="/images/column/column-background.svg" 
          alt="" 
          className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Hero text */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <h1 
            className="m-0 font-sans text-[32px] font-bold leading-normal text-white"
            data-node-id="804:497"
          >
            이터널 마케팅 칼럼
          </h1>
          <p 
            className="m-0 mt-4 font-sans text-[18px] font-medium leading-normal text-white"
            data-node-id="804:498"
          >
            막막했던 마케팅, 이터널의 기준과 데이터로 모두 공개합니다
          </p>
        </div>
      </section>

      {/* Content Section (Figma 804:499) */}
      <section className="w-full bg-[#f6f6f6]" data-node-id="804:499">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-[60px]">
          {/* Category Tabs (Figma 804:500~) */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            {CATEGORIES.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(idx)}
                className={`px-[15px] py-[6px] rounded-[5px] font-sans text-[18px] transition-all border-0 cursor-pointer ${
                  activeCategory === idx
                    ? 'bg-[#f6f6f6] border border-sub3/50 font-medium text-main shadow-sm'
                    : 'bg-transparent font-light text-main hover:bg-white/50'
                }`}
                data-node-id={`804:${500 + idx}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Featured Article (Figma 804:542, 804:539~541) */}
          <Link href="/column/featured" className="flex flex-col lg:flex-row gap-8 mb-16 no-underline group">
            {/* Featured Image */}
            <div 
              className="w-full lg:w-[686px] h-[300px] lg:h-[387px] bg-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] overflow-hidden flex-shrink-0"
              data-node-id="804:542"
            >
              <img 
                src={FEATURED_ARTICLE.image}
                alt=""
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            
            {/* Featured Content */}
            <div className="flex flex-col justify-center">
              <h2 
                className="m-0 font-sans text-[32px] font-bold leading-normal text-main mb-6 group-hover:text-primary transition-colors"
                data-node-id="804:539"
              >
                {FEATURED_ARTICLE.title}
              </h2>
              <p 
                className="m-0 font-sans text-[20px] font-light leading-relaxed text-main mb-8 max-w-[439px]"
                data-node-id="804:541"
              >
                {FEATURED_ARTICLE.description}
              </p>
              <p 
                className="m-0 font-sans text-[14px] font-thin text-main"
                data-node-id="804:540"
              >
                {FEATURED_ARTICLE.date}
              </p>
            </div>
          </Link>

          {/* Article Grid (Figma 804:507~) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ARTICLES.map((article, idx) => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                nodeId={`804:${508 + idx * 5}`}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleCard({ 
  article, 
  nodeId 
}: { 
  article: { id: number; title: string; description: string; date: string }; 
  nodeId: string;
}) {
  return (
    <Link 
      href={`/column/${article.id}`}
      className="flex flex-col cursor-pointer group no-underline"
      data-node-id={nodeId}
    >
      {/* Thumbnail */}
      <div className="w-full h-[233px] bg-[#d9d9d9] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] mb-2 overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 group-hover:scale-105 transition-transform duration-300" />
      </div>
      
      {/* Content */}
      <h3 className="m-0 mt-2 font-sans text-[18px] font-medium leading-normal text-main">
        {article.title}
      </h3>
      <p className="m-0 mt-1 font-sans text-[14px] font-light leading-relaxed text-main line-clamp-2">
        {article.description}
      </p>
      <p className="m-0 mt-2 font-sans text-[10px] font-thin text-main">
        {article.date}
      </p>
    </Link>
  );
}
