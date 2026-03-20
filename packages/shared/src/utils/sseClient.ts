import { ACCESS_TOKEN_KEY } from '../constants/auth';

type SSEHandler = (eventName: string, data: string) => void;

const MAX_RETRY_COUNT = 3;

const getFinalUrl = (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_NOTIFICATION_API_BASE_URL || '';
  return `${baseUrl.replace(/\/$/, '')}${url}`;
};

let abortController: AbortController | null = null;
const handlers = new Set<SSEHandler>();
let isConnecting = false;
let retryCount = 0;

const processSSEStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onMessage: (eventName: string, data: string) => void,
) => {
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let currentEvent = 'message';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    const decodedValue = decoder.decode(value, { stream: true });
    buffer += decodedValue;
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;
      if (trimmedLine.startsWith('event:')) {
        currentEvent = trimmedLine.substring(6).trim();
        continue;
      }
      if (trimmedLine.startsWith('data:')) {
        const rawData = trimmedLine.substring(5).trim();
        if (rawData) {
          onMessage(currentEvent, rawData);
          currentEvent = 'message';
        }
      }
    }
  }
};

const connectInternal = async () => {
  if (isConnecting || handlers.size === 0) return;

  isConnecting = true;
  abortController = new AbortController();

  const token = typeof window !== 'undefined' ? localStorage.getItem(ACCESS_TOKEN_KEY) : null;
  const finalUrl = getFinalUrl('/events/stream');

  try {
    const response = await fetch(finalUrl, {
      headers: {
        Accept: 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      signal: abortController.signal,
    });

    if (!response.ok || !response.body) throw new Error('SSE connection failed');

    retryCount = 0;

    await processSSEStream(response.body.getReader(), (event, data) => {
      handlers.forEach((handler) => handler(event, data));
    });
  } catch (error: unknown) {
    if (error instanceof Error && error.name !== 'AbortError') {
      retryCount++;

      if (retryCount >= MAX_RETRY_COUNT) {
        console.error(`[SSE] ${MAX_RETRY_COUNT}회 연속 연결 실패, 페이지를 새로고침합니다.`);
        if (typeof window !== 'undefined') {
          window.location.reload();
        }
        return;
      }

      const delay = Math.pow(2, retryCount - 1) * 1000;
      console.error(
        `[SSE] 연결 오류 (시도 ${retryCount}/${MAX_RETRY_COUNT}), ${delay / 1000}초 후 재시도...`,
        error.message,
      );
      setTimeout(connectInternal, delay);
    }
  } finally {
    isConnecting = false;
  }
};
export const sseClient = {
  subscribe: (handler: SSEHandler) => {
    handlers.add(handler);
    if (handlers.size === 1) connectInternal();

    return () => {
      handlers.delete(handler);
      if (handlers.size === 0) {
        abortController?.abort();
        abortController = null;
        retryCount = 0;
      }
    };
  },
};
