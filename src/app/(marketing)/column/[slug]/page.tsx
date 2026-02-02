import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "칼럼 | Eternal Marketing",
};

// 더미 데이터 - 나중에 API/CMS로 대체
const ARTICLE_DATA = {
  category: "바이럴 마케팅",
  title: "제목",
  subtitle: "소제목 입니다. Lorem Ipsum is simply",
  date: "Dec 03, 2025",
  image: "/images/column/column-background.svg",
  sections: [
    {
      title: "섹션 1",
      content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ],
};

const RELATED_ARTICLES = [
  {
    id: 1,
    title: "제목",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Dec 03, 2025",
  },
  {
    id: 2,
    title: "제목",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Dec 03, 2025",
  },
  {
    id: 3,
    title: "제목",
    description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    date: "Dec 03, 2025",
  },
];

export default function ColumnDetailPage({ params }: { params: { slug: string } }) {
  const article = ARTICLE_DATA;

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* Breadcrumb (Figma 804:836) */}
      <div className="w-full pt-[74px]">
        <div className="w-full max-w-[1163px] mx-auto px-4 py-4">
          <p className="font-sans text-[14px] font-thin text-main" data-node-id="804:836">
            <Link href="/" className="text-main no-underline hover:text-primary transition-colors">홈</Link>
            <span className="mx-3 text-sub3">|</span>
            <Link href="/column" className="text-main no-underline hover:text-primary transition-colors">칼럼</Link>
            <span className="mx-3 text-sub3">|</span>
            <span className="font-normal">{article.category}</span>
          </p>
        </div>
      </div>

      {/* Article Content (Figma 804:791) */}
      <article className="w-full max-w-[603px] mx-auto px-4 pb-[80px]" data-node-id="804:791">
        {/* Category Badge (Figma 804:792) */}
        <div 
          className="inline-flex items-center justify-center px-[6px] py-[2px] bg-[#f6f6f6] rounded-[3px] mb-6"
          data-node-id="804:792"
        >
          <span className="font-sans text-[12px] font-light text-sub1" data-node-id="804:793">
            {article.category}
          </span>
        </div>

        {/* Title (Figma 804:794) */}
        <h1 
          className="m-0 font-sans text-[32px] font-semibold leading-normal text-main mb-4"
          data-node-id="804:794"
        >
          {article.title}
        </h1>

        {/* Subtitle (Figma 804:796) */}
        <p 
          className="m-0 font-sans text-[14px] font-normal leading-relaxed text-sub1 mb-2"
          data-node-id="804:796"
        >
          {article.subtitle}
        </p>

        {/* Date & Social (Figma 804:800~802) */}
        <div className="flex items-center gap-3 mb-6">
          <span className="font-sans text-[10px] font-thin text-main" data-node-id="804:800">
            {article.date}
          </span>
          <div className="flex items-center gap-2">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/images/footer/Instagram.svg" alt="" className="w-[13px] h-[13px]" />
            </a>
            <a href="https://www.kakaocorp.com" target="_blank" rel="noreferrer" aria-label="Kakao">
              <img src="/images/footer/kakao.svg" alt="" className="w-[10px] h-[9px]" />
            </a>
          </div>
        </div>

        {/* Featured Image (Figma 804:803) */}
        <div 
          className="w-full h-[280px] md:h-[314px] mb-10 overflow-hidden"
          data-node-id="804:803"
        >
          <img 
            src={article.image} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sections (Figma 804:795, 804:798) */}
        {article.sections.map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 
              className="m-0 font-sans text-[22px] font-semibold leading-normal text-main mb-4"
              data-node-id="804:795"
            >
              {section.title}
            </h2>
            <p 
              className="m-0 font-sans text-[14px] font-normal leading-relaxed text-main"
              data-node-id="804:798"
            >
              {section.content}
            </p>
          </div>
        ))}

        {/* Share Article (Figma 804:799, 804:804~805) */}
        <div className="mt-12 mb-16">
          <p 
            className="m-0 font-sans text-[18px] font-medium leading-normal text-main mb-4"
            data-node-id="804:799"
          >
            Share article
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <img src="/images/footer/Instagram.svg" alt="" className="w-[24px] h-[24px]" data-node-id="804:805" />
            </a>
            <a href="https://www.kakaocorp.com" target="_blank" rel="noreferrer" aria-label="Kakao">
              <img src="/images/footer/kakao.svg" alt="" className="w-[18px] h-[18px]" data-node-id="804:804" />
            </a>
          </div>
        </div>

        {/* More Columns Section (Figma 804:806~) */}
        <section className="mt-10" data-node-id="804:806">
          <div className="flex items-center justify-between mb-4">
            <h3 className="m-0 font-sans text-[22px] font-semibold leading-normal text-main">
              더 많은 칼럼
            </h3>
            <Link 
              href="/column" 
              className="font-sans text-[12px] font-light text-main no-underline hover:text-primary transition-colors"
              data-node-id="804:808"
            >
              See more posts &gt;
            </Link>
          </div>

          {/* Divider (Figma 804:807) */}
          <div className="w-full h-[1px] bg-sub3/50 mb-6" data-node-id="804:807" />

          {/* Related Articles (Figma 804:809~) */}
          <div className="flex flex-col gap-[18px]" data-node-id="804:809">
            {RELATED_ARTICLES.map((item, idx) => (
              <Link 
                key={item.id} 
                href={`/column/${item.id}`}
                className="no-underline"
              >
                <div className="flex items-start justify-between gap-4 pb-4 border-b last:border-b-0" style={{ borderColor: 'rgba(153, 153, 153, 0.3)' }}>
                  {/* Content */}
                  <div className="flex flex-col gap-2 flex-1">
                    <h4 className="m-0 font-sans text-[18px] font-medium leading-normal text-main">
                      {item.title}
                    </h4>
                    <p className="m-0 font-sans text-[14px] font-light leading-relaxed text-main line-clamp-2">
                      {item.description}
                    </p>
                    <p className="m-0 font-sans text-[10px] font-thin text-main mt-2">
                      {item.date}
                    </p>
                  </div>
                  {/* Thumbnail */}
                  <div className="w-[180px] md:w-[204px] h-[90px] md:h-[102px] bg-[#d9d9d9] rounded-[3px] flex-shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
