'use client';

import { ChatBubbleLeftRightIcon, PlayIcon, ChartPieIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface OurTeamChartProps {
  visible: boolean;
}

const LINE_W = 2.5;
const LINE_COLOR = '#184BBA';
const SHADOW_CARD = '0 4px 24px rgba(24,75,186,0.10), 0 1.5px 6px rgba(0,0,0,0.04)';
const SHADOW_PILL = '0 4px 14px rgba(24,75,186,0.30), 0 1.5px 4px rgba(24,75,186,0.12)';
const SHADOW_TEAM = '0 8px 32px rgba(24,75,186,0.16), 0 2px 8px rgba(24,75,186,0.08)';

const aNode = (d: number, v: boolean): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.95)',
  transition: `opacity 0.4s ease-out ${d}ms, transform 0.4s ease-out ${d}ms`,
});

const aLine = (d: number, v: boolean, origin: string): React.CSSProperties => ({
  transformOrigin: origin,
  transform: v ? (origin === 'top' ? 'scaleY(1)' : 'scaleX(1)') : (origin === 'top' ? 'scaleY(0)' : 'scaleX(0)'),
  transition: `transform 0.55s cubic-bezier(0.25,0.1,0.25,1) ${d}ms`,
});

const aDot = (d: number, v: boolean): React.CSSProperties => ({
  opacity: v ? 1 : 0,
  transform: v ? 'scale(1)' : 'scale(0)',
  transition: `opacity 0.2s ease-out ${d}ms, transform 0.2s ease-out ${d}ms`,
});

interface TeamDef { label: string; delay: number }

function ConnectorDot({ delay, v, size = 8 }: { delay: number; v: boolean; size?: number }) {
  return (
    <div
      className="flex-shrink-0 rounded-full"
      style={{ width: size, height: size, background: LINE_COLOR, ...aDot(delay, v) }}
    />
  );
}

function DeptCard({ icon, label, delay, v }: { icon: React.ReactNode; label: string; delay: number; v: boolean }) {
  return (
    <div style={aNode(delay, v)} className="inline-flex">
      <div className="flex items-center bg-white rounded-[24px] lg:rounded-[28px] pr-5 lg:pr-7 h-[58px] lg:h-[68px]" style={{ boxShadow: SHADOW_CARD }}>
        <div className="w-[50px] h-[50px] lg:w-[58px] lg:h-[58px] rounded-full bg-primary flex items-center justify-center flex-shrink-0 ml-[5px]">
          <div className="w-[22px] h-[22px] lg:w-[26px] lg:h-[26px] text-white">{icon}</div>
        </div>
        <span className="ml-3 lg:ml-4 text-[13px] lg:text-[15px] font-bold text-main whitespace-nowrap tracking-[-0.01em]">{label}</span>
      </div>
    </div>
  );
}

function SubTeamTree({ teams, trunkDelay, v }: { teams: TeamDef[]; trunkDelay: number; v: boolean }) {
  return (
    <div className="relative ml-[30px] lg:ml-[34px]">
      <div
        className="absolute left-0 top-0"
        style={{
          width: LINE_W,
          background: LINE_COLOR,
          height: `calc(100% - ${teams.length === 1 ? 26 : 28}px)`,
          ...aLine(trunkDelay, v, 'top'),
        }}
      />
      <div className="flex flex-col gap-[6px] lg:gap-[8px]">
        {teams.map((team, i) => (
          <div key={i} className="flex items-center h-[48px] lg:h-[54px]">
            <div
              className="flex-shrink-0"
              style={{ width: 32, height: LINE_W, background: LINE_COLOR, ...aLine(team.delay - 60, v, 'left') }}
            />
            <ConnectorDot delay={team.delay - 25} v={v} size={9} />
            <div style={aNode(team.delay, v)} className="ml-[5px]">
              <div
                className="rounded-full px-5 lg:px-6 py-[8px] lg:py-[10px]"
                style={{ background: 'linear-gradient(135deg, #1e54c9 0%, #1443a8 100%)', boxShadow: SHADOW_PILL }}
              >
                <span className="text-white text-[11px] lg:text-[13px] font-semibold whitespace-nowrap tracking-[-0.01em]">{team.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DeptColumn({ icon, label, teams, deptDelay, trunkDelay, v }: {
  icon: React.ReactNode; label: string; teams: TeamDef[];
  deptDelay: number; trunkDelay: number; v: boolean;
}) {
  return (
    <div className="flex flex-col">
      <DeptCard icon={icon} label={label} delay={deptDelay} v={v} />
      <div className="ml-[30px] lg:ml-[34px]">
        <div style={{ width: LINE_W, height: 28, background: LINE_COLOR, ...aLine(trunkDelay - 50, v, 'top') }} />
      </div>
      <SubTeamTree teams={teams} trunkDelay={trunkDelay} v={v} />
    </div>
  );
}

function MobileDeptBranch({ icon, label, teams, deptDelay, trunkDelay, v, isLast }: {
  icon: React.ReactNode; label: string; teams: TeamDef[];
  deptDelay: number; trunkDelay: number; v: boolean;
  isLast?: boolean;
}) {
  return (
    <div className="flex -ml-[35px] pl-[35px]">
      <div className="flex flex-shrink-0 items-start pt-3" style={{ width: 20 }}>
        <div className="flex items-center">
          <div style={{ width: 16, height: LINE_W, background: LINE_COLOR, ...aLine(trunkDelay - 80, v, 'left') }} />
          <ConnectorDot delay={trunkDelay - 40} v={v} size={6} />
        </div>
      </div>
      <div className="flex-1 min-w-0 flex flex-col">
        {/* 부서 카드: 원형 아이콘 + 연한 회색 라벨 */}
        <div style={aNode(deptDelay, v)} className="flex items-center">
          <div className="flex items-center gap-2 rounded-full bg-[#e8e8e8] pl-1.5 pr-3 py-1.5">
            <div className="w-9 h-9 rounded-full bg-white border-2 border-primary flex items-center justify-center flex-shrink-0">
              <div className="w-5 h-5 text-primary">{icon}</div>
            </div>
            <span className="text-[11px] font-bold text-main">{label}</span>
          </div>
        </div>
        {/* 하위팀 (파란 pill) */}
        <div className="relative ml-5 mt-2">
          <div
            className="absolute left-0 top-0"
            style={{
              width: LINE_W, background: LINE_COLOR,
              height: `calc(100% - ${teams.length === 1 ? 14 : 16}px)`,
              ...aLine(trunkDelay, v, 'top'),
            }}
          />
          <div className="flex flex-col gap-1.5">
            {teams.map((team, i) => (
              <div key={i} className="flex items-center h-8">
                <div className="flex-shrink-0" style={{ width: 16, height: LINE_W, background: LINE_COLOR, ...aLine(team.delay - 60, v, 'left') }} />
                <ConnectorDot delay={team.delay - 25} v={v} size={6} />
                <div style={aNode(team.delay, v)} className="ml-1.5">
                  <div className="rounded-full px-3 py-1.5" style={{ background: 'linear-gradient(135deg, #1e54c9 0%, #1443a8 100%)', boxShadow: SHADOW_PILL }}>
                    <span className="text-white text-[10px] font-semibold whitespace-nowrap">{team.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileSubTree({ teams, trunkDelay, v }: { teams: TeamDef[]; trunkDelay: number; v: boolean }) {
  return (
    <div className="relative ml-[26px]">
      <div
        className="absolute left-0 top-0"
        style={{
          width: LINE_W, background: LINE_COLOR,
          height: `calc(100% - ${teams.length === 1 ? 20 : 22}px)`,
          ...aLine(trunkDelay, v, 'top'),
        }}
      />
      <div className="flex flex-col gap-[4px]">
        {teams.map((team, i) => (
          <div key={i} className="flex items-center h-[44px]">
            <div className="flex-shrink-0" style={{ width: 26, height: LINE_W, background: LINE_COLOR, ...aLine(team.delay - 60, v, 'left') }} />
            <ConnectorDot delay={team.delay - 25} v={v} size={7} />
            <div style={aNode(team.delay, v)} className="ml-[4px]">
              <div className="rounded-full px-4 py-[7px]" style={{ background: 'linear-gradient(135deg, #1e54c9 0%, #1443a8 100%)', boxShadow: SHADOW_PILL }}>
                <span className="text-white text-[11px] font-semibold whitespace-nowrap">{team.label}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OurTeamChart({ visible: v }: OurTeamChartProps) {
  /*
   * 타이밍 설계: 노드 딱 → 선 쭉~ → 다음 노드 딱 → 선 쭉~ → ...
   * 노드 등장 0.4s · 선 그리기 0.55s · 점 0.2s
   * 각 단계 사이 여유 간격
   */
  return (
    <div className="w-full max-w-[1180px] mx-auto">
      {/* ═══════ 데스크탑 ═══════ */}
      <div className="hidden sm:block">

        {/* ① TEAM 노드 딱 등장 */}
        <div className="flex justify-center" style={aNode(0, v)}>
          <div
            className="w-[120px] h-[120px] lg:w-[148px] lg:h-[148px] rounded-full border-[5px] lg:border-[6px] border-primary bg-white flex flex-col items-center justify-center"
            style={{ boxShadow: SHADOW_TEAM }}
          >
            <UserGroupIcon className="w-[36px] h-[36px] lg:w-[46px] lg:h-[46px] text-primary" />
            <span className="text-[14px] lg:text-[17px] font-extrabold text-main mt-0.5 tracking-[-0.02em]">TEAM</span>
          </div>
        </div>

        {/* ② 수직선 쭉~ */}
        <div className="flex justify-center">
          <div style={{ width: LINE_W, height: 60, background: LINE_COLOR, ...aLine(350, v, 'top') }} />
        </div>

        {/* ③ 가로 분기선 쭉~ */}
        <div className="mx-[6%] lg:mx-[4%]">
          <div style={{ height: LINE_W, background: LINE_COLOR, ...aLine(800, v, 'center') }} />
        </div>

        {/* ④ 4갈래 드롭라인 쭉~ */}
        <div className="grid grid-cols-4 gap-3 lg:gap-5 mx-[6%] lg:mx-[4%]">
          {[1250, 1300, 1350, 1400].map((d, i) => (
            <div key={i} className="h-[48px] lg:h-[56px]">
              <div className="ml-[30px] lg:ml-[34px]" style={{ width: LINE_W, height: '100%', background: LINE_COLOR, ...aLine(d, v, 'top') }} />
            </div>
          ))}
        </div>

        {/* ⑤~⑧ 각 본부/조직 순차 등장 */}
        <div className="grid grid-cols-4 gap-3 lg:gap-5 mx-[6%] lg:mx-[4%]">
          <DeptColumn
            icon={<ChatBubbleLeftRightIcon />}
            label="마케팅 인텔리전스 전략 본부"
            deptDelay={1650}
            trunkDelay={2050}
            teams={[
              { label: '데이터 · AI 분석팀', delay: 2350 },
              { label: '채널 전략 설계팀', delay: 2650 },
            ]}
            v={v}
          />
          <DeptColumn
            icon={<SparklesIcon />}
            label="크리에이티브 전략 스튜디오"
            deptDelay={2950}
            trunkDelay={3350}
            teams={[
              { label: '광고 · 브랜드 전략 컨설팅팀', delay: 3650 },
              { label: '웹 솔루션 개발팀', delay: 3950 },
              { label: '브랜드 UX/UI 디자인팀', delay: 4250 },
              { label: 'USP 콘텐츠 크리에이티브팀', delay: 4550 },
            ]}
            v={v}
          />
          <DeptColumn
            icon={<PlayIcon />}
            label="실행 전문 조직"
            deptDelay={4850}
            trunkDelay={5250}
            teams={[
              { label: '검색 · 콘텐츠 최적화팀', delay: 5550 },
              { label: '스마트 플레이스 · 로컬 마케팅팀', delay: 5850 },
              { label: '커뮤니티 바이럴 전략팀', delay: 6150 },
              { label: '퍼포먼스 · 전환 최적화팀', delay: 6450 },
            ]}
            v={v}
          />
          <DeptColumn
            icon={<ChartPieIcon />}
            label="운영 · 관리 조직"
            deptDelay={6750}
            trunkDelay={7150}
            teams={[
              { label: '클라이언트 운영 · 성과 관리팀', delay: 7450 },
              { label: '고객 경험 관리팀', delay: 7750 },
            ]}
            v={v}
          />
        </div>
      </div>

      {/* ═══════ 모바일 (이미지 구조: TEAM → 수직 트렁크 연속 → 가로 분기 → 3개 본부) ═══════ */}
      <div className="sm:hidden px-4 pb-12 relative">
        {/* 연속 수직 트렁크 (TEAM 아래 ~ 맨 아래까지) */}
        <div
          className="absolute left-[51px] top-[72px] bottom-0 w-[2.5px]"
          style={{ background: LINE_COLOR, ...aLine(350, v, 'top') }}
        />

        {/* ① TEAM (상단 좌측) */}
        <div className="flex items-start">
          <div style={aNode(0, v)}>
            <div
              className="w-[72px] h-[72px] rounded-full border-[4px] border-primary bg-white flex flex-col items-center justify-center"
              style={{ boxShadow: SHADOW_TEAM }}
            >
              <UserGroupIcon className="w-[22px] h-[22px] text-primary" />
              <span className="text-[10px] font-extrabold text-main mt-0.5">TEAM</span>
            </div>
          </div>
        </div>

        {/* ② 수직선 (TEAM → 본부들) */}
        <div className="flex justify-start pl-[35px] -mt-[1px]">
          <div style={{ width: LINE_W, height: 24, background: LINE_COLOR, ...aLine(350, v, 'top') }} />
        </div>

        {/* ③ 4개 본부: 트렁크에 가로 연결 → 부서카드(아이콘+라벨) → 하위팀 */}
        <div className="flex flex-col gap-4 pl-[35px] -mt-[1px]">
          <MobileDeptBranch
            icon={<ChatBubbleLeftRightIcon />}
            label="마케팅 인텔리전스 전략 본부"
            teams={[
              { label: '데이터 · AI 분석팀', delay: 1150 },
              { label: '채널 전략 설계팀', delay: 1450 },
            ]}
            deptDelay={750}
            trunkDelay={950}
            v={v}
          />
          <MobileDeptBranch
            icon={<SparklesIcon />}
            label="크리에이티브 전략 스튜디오"
            teams={[
              { label: '광고 · 브랜드 전략 컨설팅팀', delay: 2250 },
              { label: '웹 솔루션 개발팀', delay: 2550 },
              { label: '브랜드 UX/UI 디자인팀', delay: 2850 },
              { label: 'USP 콘텐츠 크리에이티브팀', delay: 3150 },
            ]}
            deptDelay={1850}
            trunkDelay={2050}
            v={v}
          />
          <MobileDeptBranch
            icon={<PlayIcon />}
            label="실행 전문 조직"
            teams={[
              { label: '검색 · 콘텐츠 최적화팀', delay: 3950 },
              { label: '스마트 플레이스 · 로컬 마케팅팀', delay: 4250 },
              { label: '커뮤니티 바이럴 전략팀', delay: 4550 },
              { label: '퍼포먼스 · 전환 최적화팀', delay: 4850 },
            ]}
            deptDelay={3550}
            trunkDelay={3750}
            v={v}
          />
          <MobileDeptBranch
            icon={<ChartPieIcon />}
            label="운영 · 관리 조직"
            teams={[
              { label: '클라이언트 운영 · 성과 관리팀', delay: 5650 },
              { label: '고객 경험 관리팀', delay: 5950 },
            ]}
            deptDelay={5250}
            trunkDelay={5450}
            v={v}
            isLast
          />
        </div>
      </div>
    </div>
  );
}
