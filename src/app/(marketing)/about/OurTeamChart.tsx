'use client';

import { ChatBubbleLeftRightIcon, PlayIcon, ChartPieIcon, UserGroupIcon } from '@heroicons/react/24/solid';

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
    <div className="w-full max-w-[1040px] mx-auto">
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

        {/* ④ 3갈래 드롭라인 쭉~ */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6 mx-[6%] lg:mx-[4%]">
          {[1250, 1300, 1350].map((d, i) => (
            <div key={i} className="h-[48px] lg:h-[56px]">
              <div className="ml-[30px] lg:ml-[34px]" style={{ width: LINE_W, height: '100%', background: LINE_COLOR, ...aLine(d, v, 'top') }} />
            </div>
          ))}
        </div>

        {/* ⑤ 좌측 부서 → 선 → 하위팀 순차 */}
        {/* ⑥ 중앙 부서 → 선 → 하위팀 순차 */}
        {/* ⑦ 우측 부서 → 선 → 하위팀 순차 */}
        <div className="grid grid-cols-3 gap-4 lg:gap-6 mx-[6%] lg:mx-[4%]">
          <DeptColumn
            icon={<ChatBubbleLeftRightIcon />}
            label="마케팅 인텔리전스 전략 본부"
            deptDelay={1650}
            trunkDelay={2050}
            teams={[
              { label: '데이터·AI 분석팀', delay: 2350 },
              { label: '채널 전략 설계팀', delay: 2650 },
            ]}
            v={v}
          />
          <DeptColumn
            icon={<PlayIcon />}
            label="실행 전문 조직"
            deptDelay={2950}
            trunkDelay={3350}
            teams={[
              { label: '검색·콘텐츠 최적화팀', delay: 3650 },
              { label: '스마트 플레이스·로컬 마케팅팀', delay: 3950 },
              { label: '커뮤니티·바이럴 전략팀', delay: 4250 },
              { label: '퍼포먼스·전환 최적화팀', delay: 4550 },
            ]}
            v={v}
          />
          <DeptColumn
            icon={<ChartPieIcon />}
            label="운영·관리 조직"
            deptDelay={4850}
            trunkDelay={5250}
            teams={[
              { label: '클라이언트 운영·성과 관리팀', delay: 5550 },
            ]}
            v={v}
          />
        </div>
      </div>

      {/* ═══════ 모바일 ═══════ */}
      <div className="sm:hidden px-4">

        {/* ① TEAM */}
        <div className="flex justify-center" style={aNode(0, v)}>
          <div
            className="w-[96px] h-[96px] rounded-full border-[4px] border-primary bg-white flex flex-col items-center justify-center"
            style={{ boxShadow: SHADOW_TEAM }}
          >
            <UserGroupIcon className="w-[28px] h-[28px] text-primary" />
            <span className="text-[12px] font-extrabold text-main mt-0.5">TEAM</span>
          </div>
        </div>

        {/* 선 쭉~ */}
        <div className="flex justify-center">
          <div style={{ width: LINE_W, height: 32, background: LINE_COLOR, ...aLine(350, v, 'top') }} />
        </div>

        {/* 본부 1 딱 → 선 쭉~ → 하위팀 */}
        <DeptCard icon={<ChatBubbleLeftRightIcon />} label="마케팅 인텔리전스 전략 본부" delay={750} v={v} />
        <div className="ml-[26px]">
          <div style={{ width: LINE_W, height: 18, background: LINE_COLOR, ...aLine(1050, v, 'top') }} />
        </div>
        <MobileSubTree
          trunkDelay={1250}
          teams={[
            { label: '데이터·AI 분석팀', delay: 1450 },
            { label: '채널 전략 설계팀', delay: 1750 },
          ]}
          v={v}
        />

        {/* 선 쭉~ */}
        <div className="flex justify-center">
          <div style={{ width: LINE_W, height: 26, background: LINE_COLOR, ...aLine(2050, v, 'top') }} />
        </div>

        {/* 본부 2 딱 → 선 쭉~ → 하위팀 */}
        <DeptCard icon={<PlayIcon />} label="실행 전문 조직" delay={2450} v={v} />
        <div className="ml-[26px]">
          <div style={{ width: LINE_W, height: 18, background: LINE_COLOR, ...aLine(2750, v, 'top') }} />
        </div>
        <MobileSubTree
          trunkDelay={2950}
          teams={[
            { label: '검색·콘텐츠 최적화팀', delay: 3150 },
            { label: '스마트 플레이스·로컬 마케팅팀', delay: 3450 },
            { label: '커뮤니티·바이럴 전략팀', delay: 3750 },
            { label: '퍼포먼스·전환 최적화팀', delay: 4050 },
          ]}
          v={v}
        />

        {/* 선 쭉~ */}
        <div className="flex justify-center">
          <div style={{ width: LINE_W, height: 26, background: LINE_COLOR, ...aLine(4350, v, 'top') }} />
        </div>

        {/* 본부 3 딱 → 선 쭉~ → 하위팀 */}
        <DeptCard icon={<ChartPieIcon />} label="운영·관리 조직" delay={4750} v={v} />
        <div className="ml-[26px]">
          <div style={{ width: LINE_W, height: 18, background: LINE_COLOR, ...aLine(5050, v, 'top') }} />
        </div>
        <MobileSubTree
          trunkDelay={5250}
          teams={[
            { label: '클라이언트 운영·성과 관리팀', delay: 5450 },
          ]}
          v={v}
        />
      </div>
    </div>
  );
}
