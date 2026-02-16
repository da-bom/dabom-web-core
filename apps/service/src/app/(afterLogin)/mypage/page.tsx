import { Icon, MainBox } from "@shared";

import ProgressBar from "@service/components/ProgressBar";

const data = {
  name: "김철수",
  usedGB: 20,
  limitGB: 100,
};

const MyPage = () => {
  return (
    <div className="mx-5 mt-14 flex flex-col gap-4">
      <MainBox className="flex w-full flex-col items-center gap-6 rounded-xl p-7">
        <Icon name="Bomi" />
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
      <footer className="text-body2-m ml-2 flex flex-col gap-1 text-gray-800 underline">
        <button>로그아웃</button>
        <button>회원탈퇴</button>
      </footer>
    </div>
  );
};

export default MyPage;
