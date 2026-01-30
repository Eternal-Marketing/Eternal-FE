import type { Metadata } from "next";
import Link from "next/link";
import FooterSection from "@/components/sections/FooterSection";

export const metadata: Metadata = {
  title: "이용약관 | Eternal Marketing",
};

export default function TermsPage() {
  const toc = [
    { label: "제 1조 (목적)", href: "#article-1" },
    { label: "제 2조 (서비스 내용)", href: "#article-2" },
    { label: "제 3조 (서비스 이용 성격)", href: "#article-3" },
    { label: "제 4조 (이용자의 책임)", href: "#article-4" },
    { label: "제 5조 (지적 재산권)", href: "#article-5" },
    { label: "제 6조 (책임의 제한)", href: "#article-6" },
    { label: "제 7조 (약관의 변경)", href: "#article-7" },
    { label: "제 8조 (준거법 및 관할)", href: "#article-8" },
  ] as const;

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal">
      {/* 상단 헤더 (Figma 401:756) */}
      <header className="w-full border-b border-black">
        <div className="h-[74px] w-full max-w-[1163px] mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-start no-underline">
            <img src="/images/logo.svg" alt="ETERNAL MARKETING" className="w-[69px] h-[40px] mt-[6px]" />
            <div className="ml-[9px] mt-[10px]">
              <p className="text-logo mb-0 text-primary">ETERNAL </p>
              <p className="text-logo text-primary">MARKETING</p>
            </div>
          </Link>

          <nav className="flex items-center">
            <Link href="/#about" className="text-body-sm text-main nav-link-hover px-3 py-1 rounded no-underline">
              ABOUT
            </Link>
            <Link
              href="/#portfolio"
              className="text-body-sm text-main nav-link-hover ml-[41px] px-3 py-1 rounded no-underline"
            >
              PORTFOLIO
            </Link>
            <Link
              href="/#service"
              className="text-body-sm text-main nav-link-hover ml-[41px] px-3 py-1 rounded no-underline"
            >
              SERVICE
            </Link>
            <Link
              href="/#diagnosis"
              className="btn-primary bg-primary text-inverse text-body-sm h-[36px] w-[105px] rounded-[15px] flex items-center justify-center ml-[54px]"
            >
              AI 진단 받기
            </Link>
          </nav>
        </div>
      </header>

      {/* 본문 (Figma 401:716) */}
      <section className="w-full max-w-[1163px] mx-auto pb-[120px]">
        <div className="pt-[17px]">
          <p className="text-caption text-sub1 mt-0 mb-[72px]">
            <Link href="/" className="text-sub1 no-underline hover:text-primary transition-colors">
              홈
            </Link>{" "}
            {">"} 개인정보 처리 방침
          </p>

          {/* 탭 */}
          <div className="flex items-center gap-[38px] mb-[26px]">
            <Link href="/privacy" className="m-0 text-h3 text-sub2 no-underline">
              개인정보 처리 방침
            </Link>
            <p className="m-0 text-h3 text-main underline">이용 약관</p>
          </div>

          {/* 목차 박스 */}
          <div className="border border-sub1 w-full h-auto py-[22px] mb-[49px]">
            <div className="px-[38px] grid grid-cols-3 gap-x-[60px] gap-y-[18px]">
              {toc.map((item) => (
                <p key={item.href} className="m-0 text-body text-sub1">
                  <a href={item.href} className="text-sub1 no-underline hover:text-primary transition-colors">
                    {item.label}
                  </a>
                </p>
              ))}
            </div>
          </div>

          {/* 소개 문구 */}
          <p className="text-body text-sub1 m-0 max-w-[699px]">
            본 약관은 이터널마케팅(이하 &ldquo;회사&rdquo;)이 제공하는 마케팅 컨설팅 및 AI 진단 관련 서비스 이용에 관한
            기본적인 사항을 규정합니다.
          </p>

          <hr className="border-0 border-t border-sub3 mt-[50px] mb-[66px]" />

          {/* 제 1조 */}
          <section id="article-1" className="scroll-mt-[110px]">
            <h2 className="text-h3 text-main m-0">제 1조 (목적)</h2>
            <div className="mt-[15px] ml-[37px] text-body text-sub1 max-w-[645px]">
              <p className="m-0">
                본 약관은 회사가 제공하는 서비스 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임 사항을 정함을
                목적으로 합니다.
              </p>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 제 2조 */}
          <section id="article-2" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h3 text-main m-0">제 2조 (서비스 내용)</h2>
            <div className="mt-[15px] ml-[1px] text-body text-sub1 max-w-[221px]">
              <p className="m-0">회사는 다음과 같은 서비스를 제공합니다.</p>
              <p className="m-0">&nbsp;</p>
              <ul className="list-disc m-0 pl-6">
                <li>마케팅 컨설팅 및 전략 설계</li>
                <li>AI 기반 마케팅 진단 및 분석</li>
                <li>마케팅 관련 정보 제공</li>
              </ul>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 제 3조 */}
          <section id="article-3" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h3 text-main m-0">제 3조 (서비스 이용 성격)</h2>
            <div className="mt-[15px] ml-[1px] text-body text-sub1 max-w-[327px]">
              <p className="m-0">회사가 제공하는 모든 서비스는</p>
              <p className="m-0">정보 제공 및 컨설팅을 목적으로 하며,</p>
              <p className="m-0">특정 매출, 노출 순위, 방문자 수 등 성과를 보장하지 않습니다.</p>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 제 4조 */}
          <section id="article-4" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h3 text-main m-0">제 4조 (이용자의 책임)</h2>
            <p className="mt-[15px] ml-[2px] text-body text-sub1 max-w-[536px]">
              이용자는 회사가 제공한 정보 및 자료를 참고하여 자신의 판단과 책임 하에 서비스를 이용해야 합니다.
            </p>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 제 5조 */}
          <section id="article-5" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h3 text-main m-0">제 5조 (지적재산권)</h2>
            <p className="mt-[15px] ml-[3px] text-body text-sub1 max-w-[628px]">
              본 사이트에 게시된 모든 콘텐츠의 저작권은 회사에 귀속되며, 사전 동의 없이 무단 복제, 배포, 상업적 이용을
              금합니다.
            </p>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 제 6조 */}
          <section id="article-6" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h3 text-main m-0">제 6조 (책임의 제한)</h2>
            <p className="mt-[15px] ml-[3px] text-body text-sub1 max-w-[567px]">
              회사는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 제공 중단에 대해 책임을 지지 않습니다.
            </p>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 제 7조 */}
          <section id="article-7" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h3 text-main m-0">제 7조 (약관의 변경)</h2>
            <p className="mt-[15px] ml-[1px] text-body text-sub1 max-w-[416px]">
              본 약관은 필요 시 변경될 수 있으며, 변경 사항은 본 페이지를 통해 공지합니다.
            </p>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 제 8조 */}
          <section id="article-8" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h3 text-main m-0">제 8조 (준거법 및 관할)</h2>
            <p className="mt-[15px] ml-[2px] text-body text-sub1 max-w-[552px]">
              본 약관과 관련된 분쟁에 대해서는 대한민국 법을 적용하며, 관할 법원은 회사의 본점 소재지를 따릅니다.
            </p>
            <hr className="border-0 border-t border-sub3 w-[773px] mt-[36px]" />
          </section>

          {/* 하단 문구 */}
          <p className="text-h4 text-main mt-[80px] ml-[-6px] max-w-[608px]">
            본 사이트는 이터널마케팅의 마케팅 컨설팅 및 AI 진단 서비스 안내를 목적으로 운영됩니다.
          </p>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}

