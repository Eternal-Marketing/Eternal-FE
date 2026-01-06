const imgGroup12 = "https://www.figma.com/api/mcp/asset/d1948dce-536b-4ac9-b8f6-2e2575aa954e";
const imgGroup36 = "https://www.figma.com/api/mcp/asset/41517d8b-d8be-4051-9778-143b40c2b65f";
const imgRectangle15 = "https://www.figma.com/api/mcp/asset/aeaadf8a-7358-4af2-a045-2a7eda25d8d1";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#fdfeff] overflow-hidden relative py-20 z-30" data-node-id="176:48">
      <div className="container mx-auto max-w-[1440px] px-4">
        {/* 메인 제목 */}
        <div className="text-center mb-16">
          <h2 className="text-h1 text-main mb-4" data-node-id="176:49">
            정답은 이미 <span className="bg-clip-text bg-gradient-to-r from-[#000d2a] to-black via-[#3273ff] via-[33.654%]" style={{ WebkitTextFillColor: "transparent" }}>데이터</span> 속에 존재합니다.
          </h2>
          <p className="text-h1 text-main">문제는 그것을 보지 않는 선택입니다.</p>
        </div>

        {/* 서브텍스트 */}
        <div className="text-center mb-20">
          <p className="text-h4 text-main mb-2" data-node-id="176:50">
            수많은 대행사의 결과물 및 서비스 구조를 담은 <span className="text-[#134bc4]">AI</span>와
          </p>
          <p className="text-h4 text-main">
            다년간의 실무 경험을 축적한 <span className="text-[#134bc4]">전문 마케터</span>가 함께 판단합니다.
          </p>
        </div>

        {/* AI 마케팅 인텔리전스 및 데이터 결과 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20 items-center">
          {/* 왼쪽: AI 마케팅 인텔리전스 */}
          <div className="text-center" data-node-id="176:51">
            <h3 className="text-h3 text-sub1 mb-8" data-node-id="176:52">
              AI 마케팅 인텔리전스
            </h3>
            <div className="w-[374px] h-[340px] mx-auto relative" data-name="laptop" data-node-id="176:53">
              <img alt="Laptop" className="w-full h-full object-contain" src="/images/laptop.svg" />
            </div>
          </div>

          {/* 오른쪽: 데이터 결과 */}
          <div className="text-right" data-node-id="176:74">
            <p className="text-h2 text-primary mb-2">
              <span className="text-[64px] font-[800]">1200000건+</span>
              <span className="text-h2">이상의</span>
            </p>
            <p className="text-h2 text-main">데이터 결과 기반</p>
            <div className="flex justify-end mt-8">
              <div className="w-[68px] h-[68px]" data-node-id="176:77">
                <img alt="Infinity" className="w-full h-full" src={imgGroup36} />
              </div>
            </div>
          </div>
        </div>

        {/* 통계 데이터 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="text-right" data-node-id="176:72">
            <p className="text-h2 text-main mb-2">프로젝트 평균 매출 성장률</p>
            <p className="mb-4">
              <span className="text-[64px] font-[800] text-primary">188%</span>
              <span className="text-h2 text-main"> 이상</span>
            </p>
          </div>
          <div className="text-right" data-node-id="176:73">
            <p className="text-h2 text-main mb-2">장기 파트너십 유지율</p>
            <p>
              <span className="text-[64px] font-[800] text-primary">98%</span>
              <span className="text-h2 text-main"> 이상</span>
            </p>
          </div>
        </div>

        {/* 실무 경험 보유자 */}
        <div className="flex justify-end mb-12">
          <div className="w-[465px] h-[394px] relative" data-name="graph" data-node-id="176:82">
            <img alt="Graph" className="w-full h-full object-contain" src="/images/graph.svg" />
          </div>
        </div>
        <p className="text-h3 text-sub1 text-center mb-20" data-node-id="176:81">
          다년간의 실무 경험 보유자
        </p>

        {/* 팀 구조 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* 왼쪽: 팀 다이어그램 */}
          <div className="relative" data-node-id="176:54">
            <div className="w-[464px] h-[444px] mx-auto relative mb-8" data-node-id="176:56">
              <img alt="Team Structure" className="w-full h-full object-contain" src={imgGroup12} />
              
              {/* 역할 태그들 */}
              <div className="absolute top-[37px] left-[71px] bg-white h-[41px] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center px-4" data-node-id="176:69">
                <p className="text-body-sm text-main">PM</p>
              </div>
              <div className="absolute top-[110px] left-[35px] bg-white h-[41px] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center px-4" data-node-id="176:65">
                <p className="text-body-sm text-main">비즈니스 모델 분석가</p>
              </div>
              <div className="absolute top-[163px] left-[189px] bg-white h-[41px] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center px-4" data-node-id="176:67">
                <p className="text-body-sm text-main">전문 마케터</p>
              </div>
              <div className="absolute top-[234px] left-[315px] bg-white h-[41px] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center px-4" data-node-id="176:63">
                <p className="text-body-sm text-main">데이터 분석가</p>
              </div>
              <div className="absolute top-[161px] left-[71px] bg-white h-[41px] rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] flex items-center px-4" data-node-id="176:61">
                <p className="text-body-sm text-main">AI 마케팅 인텔리전스</p>
              </div>
            </div>
            
            <p className="text-h3 text-sub1 text-center" data-node-id="176:71">
              업종별 전문 인력으로 전담 팀 구성
            </p>
          </div>

          {/* 오른쪽: 전문 인력 설명 */}
          <div className="text-left" data-node-id="176:75">
            <p className="text-h2 text-main mb-4">
              분야별 <span className="text-[64px] font-[800] text-primary">전문 인력</span>을 보유하고,
            </p>
            <p className="text-h2 text-main" data-node-id="176:76">
              전담 팀 체계로 프로젝트 운영
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

