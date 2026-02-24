export const sseClient = {
  connect: async <T>(
    url: string,
    onMessage: (data: T) => void,
    signal: AbortSignal,
  ) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const isProxyPath = url.startsWith("/families");
    const finalUrl = isProxyPath ? url : `${baseUrl}${url}`;

    console.log("[SSE 엔진] 연결 시도 중... 최종 URL:", finalUrl);

    try {
      const response = await fetch(finalUrl, {
        method: "GET",
        headers: {
          Accept: "text/event-stream",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        signal,
      });

      if (!response.ok || !response.body) {
        throw new Error(`SSE 연결 실패: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");

        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const dataStr = line.substring(5).trim();
            if (!dataStr) continue;

            try {
              const parsedData: T = JSON.parse(dataStr);
              onMessage(parsedData);
            } catch (err) {
              console.error("SSE 데이터 파싱 에러:", err);
            }
          }
        }
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.log("SSE 연결이 정상적으로 종료되었습니다.");
        } else {
          console.error("SSE 통신 에러:", error.message);
        }
      } else {
        console.error("알 수 없는 SSE 통신 에러:", error);
      }
    }
  },
};
