/**
 * 미디어 API (POST /api/media/upload, GET /api/media, GET/DELETE /api/media/:id)
 */
import { apiConfig } from './config';
import { ApiClientError } from './types';
import { getAccessToken, getRefreshToken, setTokens } from '@/lib/auth/token';
import { refreshAccessToken } from './auth.api';

const MEDIA_BASE = '/api/media';

/** 업로드 성공 시 미디어 객체 */
export interface Media {
  id: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  url: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

/** 업로드 응답 (201) */
interface UploadResponse {
  status?: string;
  data?: { media: Media };
}

/**
 * 이미지 파일 업로드 (어드민 전용, 최대 5MB)
 * POST /api/media/upload, multipart/form-data field: file
 * 401 시 토큰 갱신 후 1회 재시도
 */
export async function uploadMedia(file: File): Promise<Media> {
  const doUpload = async (token: string): Promise<Response> => {
    const formData = new FormData();
    formData.append('file', file);
    const url = apiConfig.baseURL
      ? `${apiConfig.baseURL.replace(/\/$/, '')}${MEDIA_BASE}/upload`
      : `${MEDIA_BASE}/upload`;
    return fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
      credentials: 'include',
    });
  };

  let token = typeof window !== 'undefined' ? getAccessToken() : null;
  if (!token) throw new ApiClientError('로그인이 필요합니다.', 401);

  let res = await doUpload(token);
  if (res.status === 401) {
    const refreshToken = typeof window !== 'undefined' ? getRefreshToken() : null;
    if (refreshToken) {
      try {
        const data = await refreshAccessToken(refreshToken);
        setTokens(data.accessToken, refreshToken);
        token = data.accessToken;
        res = await doUpload(token);
      } catch {
        // refresh 실패 시 기존 401 응답으로 에러 처리
      }
    }
  }

  const json = (await res.json().catch(() => ({}))) as UploadResponse & { message?: string };
  if (!res.ok) {
    throw new ApiClientError(json?.message ?? `업로드 실패 (${res.status})`, res.status);
  }

  const media = json?.data?.media;
  if (!media?.url) throw new ApiClientError('업로드 응답에 미디어 정보가 없습니다.');
  return media;
}
