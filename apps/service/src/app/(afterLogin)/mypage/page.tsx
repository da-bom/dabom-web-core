import { Icon, MainBox } from "@shared";

import ProgressBar from "@service/components/ProgressBar";

const data = {
  name: "김철수",
  usedGB: 100,
  limitGB: 100,
};

const MyPage = () => {
  const usagePercent = Math.min(
    Math.round((data.usedGB / data.limitGB) * 100),
    100,
  );

  const getCharacterIcon = (percent: number) => {
    if (percent >= 81) return "four";
    if (percent >= 51) return "three";
    if (percent >= 31) return "two";
    if (percent >= 1) return "one";
    return "zero";
  };

  const characterIconName = getCharacterIcon(usagePercent);

  return (
    <div className="mx-5 mt-14 flex flex-col gap-4">
      <MainBox className="flex w-full flex-col items-center gap-6 rounded-xl p-7">
        <Icon name={characterIconName} />
        <span className="text-h1-m">{data.name}</span>
        <div className="flex w-full flex-col gap-2">
          <div className="text-body2-m flex justify-between">
            <span>내 데이터 사용량</span>
            <span>
              {data.usedGB}GB/{data.limitGB}GB
            </span>
          </div>
          <ProgressBar value={data.usedGB} />
        </div>
      </MainBox>
      <MainBox className="flex h-14 items-center justify-between rounded-xl px-4">
        <span>이용 약관</span>
        <Icon name="Chevron" className="rotate-180 text-gray-800" />
      </MainBox>
      <footer className="text-body2-m ml-2 flex flex-col items-start gap-1 text-gray-800 underline">
        <button>로그아웃</button>
        <button>회원탈퇴</button>
      </footer>
    </div>
  );
};

export default MyPage;
