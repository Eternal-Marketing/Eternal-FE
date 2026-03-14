'use client';

import { useState, useEffect } from 'react';

/**
 * 모바일(640px 미만) 여부 반환.
 * 초기값 true → 모바일 사용자에게 맞는 에셋만 먼저 로드 (불필요한 데스크톱 에셋 로드 방지)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)');
    setIsMobile(!mq.matches);
    const handler = () => setIsMobile(!mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

/** lg(1024px) 미만 여부 - 모바일+태블릿 */
export function useIsBelowLg() {
  const [isBelowLg, setIsBelowLg] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    setIsBelowLg(!mq.matches);
    const handler = () => setIsBelowLg(!mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isBelowLg;
}
