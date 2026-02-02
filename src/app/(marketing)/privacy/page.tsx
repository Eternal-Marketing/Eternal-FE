import type { Metadata } from "next";
import Link from "next/link";

/**
 * 개인정보처리방침 페이지
 * - 브레드크럼, 개인정보/이용약관 탭, 목차(TOC), 1~9절 본문
 */
export const metadata: Metadata = {
  title: "개인정보처리방침 | Eternal Marketing",
};

export default function PrivacyPage() {
  const toc = [
    { label: "개인정보의 수집 항목 및 방법", href: "#section-1" },
    { label: "개인정보의 이용 목적", href: "#section-2" },
    { label: "개인정보의 보유 및 이용 기간", href: "#section-3" },
    { label: "개인정보의 제 3자 제공", href: "#section-4" },
    { label: "개인정보의 처리 위탁", href: "#section-5" },
    { label: "개인정보의 파기 절차 및 방법", href: "#section-6" },
    { label: "개인정보 보호를 위한 조치", href: "#section-7" },
    { label: "개인정보 보호 책임자", href: "#section-8" },
    { label: "개인정보 처리 방침의 변경", href: "#section-9" },
  ] as const;

  return (
    <main className="min-h-screen bg-bg text-main break-keep whitespace-normal pt-[74px]">
      <div className="w-full border-t border-sub3/50"></div>
      <div className="w-full max-w-[1163px] mx-auto py-4">
        <p className="text-caption text-sub1 m-0">
          <Link href="/" className="text-sub1 no-underline hover:text-primary transition-colors">
            홈
          </Link>{" "}
          {">"} 개인정보 처리 방침
        </p>
      </div>
      <div className="w-full border-b border-sub3/50 mb-10"></div>

      <section className="w-full max-w-[1163px] mx-auto pb-[120px]">
        <div className="pl-[20px]">
          <div className="flex items-center gap-[38px] mb-[26px]">
            <p className="m-0 text-h4 text-main underline">개인정보 처리 방침</p>
            <Link href="/terms" className="m-0 text-h4 text-sub2 no-underline">
              이용 약관
            </Link>
          </div>

          <div className="border border-sub1 w-full h-auto py-[18px] mb-[49px]">
            <ol className="m-0 px-[38px] grid grid-cols-3 gap-x-[60px] gap-y-[14px] list-decimal">
              {toc.map((item) => (
                <li key={item.href} className="text-body-sm text-sub1">
                  <a href={item.href} className="text-sub1 no-underline hover:text-primary transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ol>
          </div>

          <p className="text-body-sm text-sub1 m-0 w-full max-w-none">
            이터널마케팅(이하 &ldquo;회사&rdquo;)은 개인정보보호법 등 관련 법령을 준수하며, 이용자의 개인정보를 중요하게
            보호합니다.
            <br />
            본 개인정보처리방침은 회사가 제공하는 마케팅 컨설팅, AI 진단, 상담 서비스 이용과 관련하여 수집되는
            개인정보의 처리 기준을 안내합니다
          </p>

          <hr className="border-0 border-t border-sub3 mt-[32px] mb-[66px] w-[1163px] ml-[13px]" />

          <section id="section-1" className="scroll-mt-[110px]">
            <h2 className="text-h4 text-main m-0">1. 개인정보의 수집 항목 및 방법</h2>
            <div className="mt-[15px] ml-[37px] text-body-sm text-sub1 w-[calc(100%-37px)] max-w-none">
              <p className="m-0">회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집할 수 있습니다.</p>
              <p className="m-0">&nbsp;</p>
              <p className="m-0">수집 항목 :</p>
              <ul className="list-disc m-0 pl-6">
                <li>회사명 또는 상호명</li>
                <li>담당자명</li>
                <li>연락처(전화번호, 이메일)</li>
                <li>상담 및 문의 내용</li>
              </ul>
              <p className="m-0 mt-4">
                ※ 서비스 이용 과정에서 IP 주소, 접속 로그 등 최소한의 정보가 자동으로 생성·수집될 수 있습니다.
              </p>
              <p className="m-0">&nbsp;</p>
              <p className="m-0">수집 방법 :</p>
              <ul className="list-disc m-0 pl-6">
                <li>홈페이지 문의 및 AI 진단 신청 폼</li>
                <li>이메일, 전화, 카카오톡 상담</li>
              </ul>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[32px]" />
          </section>

          <section id="section-2" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0">2. 개인정보의 이용 목적</h2>
            <div className="mt-[15px] ml-[37px] text-body-sm text-sub1 w-[calc(100%-37px)] max-w-none">
              <p className="m-0">회사는 수집한 개인정보를 다음 목적에 한하여 이용합니다.</p>
              <p className="m-0">&nbsp;</p>
              <ul className="list-disc m-0 pl-6">
                <li>상담 요청에 대한 응대 및 안내</li>
                <li>마케팅 컨설팅 및 AI 진단 서비스 제공</li>
                <li>서비스 개선을 위한 내부 분석</li>
                <li>문의 이력 관리</li>
              </ul>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 3 */}
          <section id="section-3" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0">3. 개인정보의 보유 및 이용 기간</h2>
            <div className="mt-[15px] ml-[37px] text-body-sm text-sub1 w-[calc(100%-37px)] max-w-none">
              <p className="m-0">회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.</p>
              <p className="m-0">
                다만, 관련 법령에 따라 보관이 필요한 경우에는 해당 법령에서 정한 기간 동안 보관할 수 있습니다.
              </p>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 4 */}
          <section id="section-4" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0">4. 개인정보의 제3자 제공</h2>
            <div className="mt-[15px] ml-[37px] text-body-sm text-sub1 w-[calc(100%-37px)] max-w-none">
              <p className="m-0">회사는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.</p>
              <p className="m-0">다만, 법령에 따라 요구되는 경우에는 관련 법령에 따라 제공될 수 있습니다.</p>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 5 */}
          <section id="section-5" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0">5. 개인정보의 처리 위탁</h2>
            <div className="mt-[15px] ml-[37px] text-body-sm text-sub1 w-[calc(100%-37px)] max-w-none">
              <p className="m-0">회사는 서비스 제공을 위해 개인정보 처리 업무를 외부에 위탁하지 않습니다.</p>
              <p className="m-0">향후 위탁이 필요한 경우, 사전에 그 사실을 고지하겠습니다.</p>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 6 */}
          <section id="section-6" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0 ml-[-6px]">6. 개인정보의 파기 절차 및 방법</h2>
            <div className="mt-[15px] ml-[31px] text-body-sm text-sub1 w-[calc(100%-31px)] max-w-none">
              <p className="m-0">
                회사는 개인정보 보유 기간이 경과하거나 처리 목적이 달성된 경우, 지체 없이 해당 개인정보를 파기합니다.
              </p>
              <p className="m-0">&nbsp;</p>
              <ul className="list-disc m-0 pl-6">
                <li>전자적 파일 형태: 복구 불가능한 방법으로 삭제</li>
                <li>종이 문서 형태: 분쇄 또는 소각</li>
              </ul>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 7 */}
          <section id="section-7" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0 ml-[-6px]">7. 개인정보 보호를 위한 조치</h2>
            <p className="mt-[15px] ml-[31px] text-body-sm text-sub1 w-[calc(100%-31px)] max-w-none">
              회사는 개인정보의 안전한 관리를 위해 관리적·기술적 보호 조치를 시행하고 있습니다.
            </p>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 8 */}
          <section id="section-8" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0 ml-[-6px]">8. 개인정보 보호 책임자</h2>
            <div className="mt-[15px] ml-[31px] text-body-sm text-sub1 w-[calc(100%-31px)] max-w-none">
              <p className="m-0">개인정보 보호와 관련한 문의는</p>
              <p className="m-0">아래 연락처로 문의해주시기 바랍니다.</p>
              <p className="m-0">&nbsp;</p>
              <ul className="list-disc m-0 pl-6">
                <li>책임자: 정세훈, 이훈</li>
                <li>이메일: info@eternalmarketing.co.kr</li>
              </ul>
            </div>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 9 */}
          <section id="section-9" className="scroll-mt-[110px] mt-[33px]">
            <h2 className="text-h4 text-main m-0 ml-[-6px]">9. 개인정보 처리 방침의 변경</h2>
            <p className="mt-[15px] ml-[31px] text-body-sm text-sub1 w-[calc(100%-31px)] max-w-none">
              본 개인정보처리방침은 관련 법령 또는 내부 정책에 따라 변경될 수 있으며, 변경 시 본 페이지를 통해 공지합니다.
            </p>
            <hr className="border-0 border-t border-sub3 w-[773px] ml-[13px] mt-[36px]" />
          </section>

          {/* 하단 문구 */}
          <p className="text-body text-main mt-[80px] ml-[-6px] w-[calc(100%+6px)] max-w-none">
            본 사이트는 이터널마케팅의 마케팅 컨설팅 및 AI 진단 서비스 안내를 목적으로 운영됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
