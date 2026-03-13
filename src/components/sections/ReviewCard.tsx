'use client';

interface ReviewCardProps {
  body: string[];
  brand: string;
  role: string;
  stars: number;
  cardKey: string;
  isActive: boolean;
  onToggle: (cardKey: string) => void;
  widthClassName: string;
  heightClassName: string;
}

export default function ReviewCard({
  body,
  brand,
  role,
  stars,
  cardKey,
  isActive,
  onToggle,
  widthClassName,
  heightClassName,
}: ReviewCardProps) {
  return (
    <button
      type="button"
      data-active={isActive}
      className={`group flex items-center justify-center flex-shrink-0 mx-1.5 sm:mx-2 relative ${widthClassName} ${heightClassName} transition-all duration-300 ease-out [@media(hover:hover)]:hover:scale-[1.05] [@media(hover:hover)]:hover:-translate-y-3 [@media(hover:hover)]:hover:z-10 max-sm:data-[active=true]:scale-[1.05] max-sm:data-[active=true]:-translate-y-3 max-sm:data-[active=true]:z-10`}
      onClick={() => onToggle(cardKey)}
      aria-pressed={isActive}
      aria-label={`${brand} ${role} 리뷰 카드`}
    >
      <span className="absolute inset-[10%] rounded-[34px] bg-primary/28 blur-3xl opacity-45 transition-opacity duration-300 group-hover:opacity-80" aria-hidden />
      <span className="absolute inset-0 rounded-[36px] bg-[linear-gradient(145deg,rgba(255,255,255,0.22)_0%,rgba(24,75,186,0.12)_100%)] ring-1 ring-white/18 backdrop-blur-[18px] shadow-[0_30px_90px_rgba(9,20,48,0.34)]" aria-hidden />

      <span className="relative block w-full h-full rounded-[32px] overflow-hidden border border-white/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.26)_0%,rgba(255,255,255,0.1)_100%)] backdrop-blur-[22px]">
        <span className="absolute inset-x-6 top-4 h-px bg-gradient-to-r from-transparent via-white/55 to-transparent" aria-hidden />
        <span className="absolute left-0 right-0 top-0 h-24 bg-[linear-gradient(180deg,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%)]" aria-hidden />
        <span className="absolute left-6 top-6 h-12 w-1.5 rounded-full bg-[linear-gradient(180deg,rgba(24,75,186,1)_0%,rgba(24,75,186,0.25)_100%)] shadow-[0_8px_20px_rgba(24,75,186,0.25)]" aria-hidden />
        <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/16 blur-2xl" aria-hidden />
        <span className="absolute -left-8 bottom-10 h-24 w-24 rounded-full bg-white/16 blur-2xl" aria-hidden />
        <span className="absolute left-11 top-7 text-[54px] leading-none font-serif text-primary/10" aria-hidden>
          "
        </span>
        <span className="absolute top-4 right-5 rounded-full border border-primary/12 bg-white/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-primary shadow-[0_10px_24px_rgba(24,75,186,0.12)] backdrop-blur-md" aria-hidden>
          Review
        </span>

        <span className="relative flex h-full flex-col rounded-[30px] border border-white/65 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(242,246,255,0.9)_100%)] px-4 py-3 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.98),0_12px_30px_rgba(24,75,186,0.08)] sm:px-6 sm:py-5 lg:px-6 lg:py-5">
          <span className="flex items-center justify-between gap-2 flex-shrink-0">
            <span className="flex items-center gap-1.5 text-primary" aria-label={`별점 ${stars}점`}>
              {Array.from({ length: stars }).map((_, index) => (
                <span key={index} className="text-[18px] leading-none drop-shadow-[0_4px_12px_rgba(24,75,186,0.16)] sm:text-[20px] lg:text-[22px]">
                  ★
                </span>
              ))}
            </span>
            <span className="rounded-full bg-primary/[0.08] px-2 py-0.5 text-[10px] font-semibold tracking-[0.12em] text-primary uppercase sm:px-2.5 sm:py-1 sm:text-[11px]">
              Verified
            </span>
          </span>

          <span className="mt-2 sm:mt-3 flex-1 overflow-hidden flex flex-col justify-center min-h-0">
            {body.map((paragraph, index) => (
              <p
                key={index}
                className={`m-0 font-sans text-[14px] font-medium leading-[1.4] tracking-[-0.04em] text-[#3f4652] break-keep sm:text-[15px] sm:leading-[1.45] lg:text-[16px] ${
                  index === 0 ? '' : 'mt-1 sm:mt-1.5'
                }`}
              >
                {paragraph}
              </p>
            ))}
          </span>

          <span className="mt-2 sm:mt-3 flex items-center gap-2 border-t border-primary/10 pt-2 sm:pt-3 flex-shrink-0 font-sans text-[15px] font-semibold tracking-[-0.03em] sm:text-[16px] lg:text-[17px]">
            <span className="text-[#1f2430]">{brand}</span>
            <span className="text-primary/30">|</span>
            <span className="inline-flex items-center rounded-full bg-[linear-gradient(180deg,rgba(24,75,186,0.14)_0%,rgba(24,75,186,0.08)_100%)] px-3 py-1 text-primary shadow-[0_8px_18px_rgba(24,75,186,0.12)] ring-1 ring-primary/10">
              {role}
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
