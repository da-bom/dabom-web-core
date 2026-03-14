const accessKey = process.env.NEXT_PUBLIC_STORAGE_ACCESS_KEY;
const refreshKey = process.env.NEXT_PUBLIC_STORAGE_REFRESH_KEY;

if (!accessKey || !refreshKey) {
  throw new Error(
    `환경 변수 설정이 누락되었습니다. 
     ACCESS_KEY: ${accessKey ? 'OK' : 'MISSING'}, 
     REFRESH_KEY: ${refreshKey ? 'OK' : 'MISSING'}
     .env 파일을 확인해주세요.`,
  );
}

export const ACCESS_TOKEN_KEY = accessKey;
export const REFRESH_TOKEN_KEY = refreshKey;
