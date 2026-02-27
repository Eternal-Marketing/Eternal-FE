'use client';

import { useEffect } from 'react';
import { getHealth } from '@/lib/api/health.api';

/**
 * 앱 마운트 시 서버 상태를 콘솔에 출력
 */
export default function HealthLogger() {
  useEffect(() => {
    getHealth()
      .then((health) => {
        const icon = health.status === 'ok' ? '✅' : '⚠️';
        const dbIcon = health.database === 'connected' ? '🟢' : '🔴';
        console.groupCollapsed(`${icon} 서버 상태 [${health.environment}]`);
        console.log('status   :', health.status);
        console.log('database :', `${dbIcon} ${health.database}`);
        console.log('uptime   :', `${Math.floor(health.uptime)}s`);
        console.log('timestamp:', health.timestamp);
        console.groupEnd();
      })
      .catch(() => {
        console.warn('⛔ 서버 상태 확인 실패 (GET /health)');
      });
  }, []);

  return null;
}
