import { ACCESS_TOKEN_KEY } from '../constants/auth';

const getFinalUrl = (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_NOTIFICATION_API_BASE_URL || '';
  return `${baseUrl.replace(/\/$/, '')}${url}`;
};

const processLines = (
  lines: string[],
  currentEvent: string,
  onMessage: (eventName: string, data: string) => void,
): string => {
  let eventName = currentEvent;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    if (trimmedLine.startsWith('event:')) {
      eventName = trimmedLine.substring(6).trim();
      console.log('[SSE 이벤트 수신]:', eventName);
      continue;
    }

    if (trimmedLine.startsWith('data:')) {
      const rawData = trimmedLine.substring(5).trim();
      console.log('[SSE 데이터]:', rawData);
      if (rawData) {
        onMessage(eventName, rawData);
        eventName = 'message';
      }
    }
  }

  return eventName;
};

const processSSEStream = async (
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onMessage: (eventName: string, data: string) => void,
) => {
  const decoder = new TextDecoder('utf-8');
  let buffer = '';
  let currentEvent = 'message';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      console.log('[SSE 엔진] 서버가 연결을 종료했습니다.');
      break;
    }

    const decodedValue = decoder.decode(value, { stream: true });
    buffer += decodedValue;
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    currentEvent = processLines(lines, currentEvent, onMessage);
  }
};

export const sseClient = {
  connect: async (
    url: string,
    onMessage: (eventName: string, data: string) => void,
    signal: AbortSignal,
  ) => {
    const token =
      globalThis.window === undefined
        ? null
        : globalThis.window.localStorage.getItem(ACCESS_TOKEN_KEY);

    const finalUrl = getFinalUrl(url);

    console.log('[SSE 엔진] 연결 시도 중... 최종 URL:', finalUrl);

    try {
      const response = await fetch(finalUrl, {
        method: 'GET',
        headers: {
          Accept: 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Accept-Version': '1.0',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        signal,
      });

      console.log('[SSE 엔진] 응답 수신. Status:', response.status);

      if (!response.ok || !response.body) {
        const errorBody = await response.text().catch(() => 'no body');
        console.error('[SSE 엔진] 연결 실패 디테일:', errorBody);
        throw new Error(`SSE 연결 실패: HTTP ${response.status}`);
      }

      await processSSEStream(response.body.getReader(), onMessage);
    } catch (error: unknown) {
      if (error instanceof Error && error.name !== 'AbortError') {
        console.error('[SSE 엔진 에러]:', error.message);
        throw error;
      }
    }
  },
};
