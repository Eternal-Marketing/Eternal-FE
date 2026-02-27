/**
 * Health API (GET /health)
 */
import { get } from './client';

export interface HealthStatus {
  status: 'ok' | string;
  timestamp: string;
  uptime: number;
  environment: string;
  database: 'connected' | string;
}

export async function getHealth(): Promise<HealthStatus> {
  return get<HealthStatus>('/health');
}
