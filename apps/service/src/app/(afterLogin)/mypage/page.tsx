'use client';

import Link from 'next/link';

import { ChevronIcon } from '@icons';
import { MainBox } from '@shared';

import { useCustomerMe } from 'src/api/auth/useCustomerMe';
import MyInfo from 'src/components/mypage/MyInfo';

const MyPage = () => {
  const { data: user } = useCustomerMe();
  const isOwner = user?.role === 'OWNER';

  return (
    <div className="m-5 flex flex-col gap-4">
      <MainBox className="flex w-full flex-col gap-7 rounded-2xl px-5 py-4">
        <MyInfo />
      </MainBox>

      {isOwner && (
        <Link href="/mypage/rewards">
          <MainBox className="flex cursor-pointer items-center justify-between rounded-2xl p-4">
            <span className="text-body1-m">내가 받은 보상 보기</span>
            <ChevronIcon className="text-gray-800" sx={{ width: 16 }} />
          </MainBox>
        </Link>
      )}
      {/* TODO: 약관 페이지 구현 후 수정 */}
      <Link href="#">
        <MainBox className="flex cursor-pointer items-center justify-between rounded-2xl p-4">
          <span className="text-body1-m">이용 약관</span>
          <ChevronIcon className="text-gray-800" sx={{ width: 16 }} />
        </MainBox>
      </Link>
      <button className="text-body2-m ml-2 flex text-gray-800 underline">로그아웃</button>
    </div>
  );
};

export default MyPage;
