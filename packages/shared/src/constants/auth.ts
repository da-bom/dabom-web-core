const storageKey = process.env.NEXT_PUBLIC_STORAGE_ACCESS_KEY;

if (!storageKey) {
  throw new Error('환경 변수 ACCESS_TOKEN_KEY가 설정되지 않았습니다. .env 파일을 확인해주세요.');
}

export const ACCESS_TOKEN_KEY = storageKey;
