'use client';

import { Suspense } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Table } from '@shared';

import { useGetPolicy } from 'src/api/policy/useGetPolicy';
import Pagination from 'src/components/common/Pagination';
import { formatPolicy } from 'src/utils/formatPolicy';

const PolicyContent = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const { data } = useGetPolicy(currentPage - 1);
  const policyRows = formatPolicy({ policies: data?.policies ?? [] });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!data) return <div>표시할 정책 데이터가 없습니다.</div>;

  return (
    <div className="mt-6 flex h-screen flex-col">
      <div className="flex-1 overflow-hidden">
        <Table
          headers={['정책', '권한', '기본값', '상태', '관리']}
          rows={policyRows}
          className="rounded-md"
        />
      </div>
      <Pagination
        currentPage={currentPage}
        // TODO: 백엔드 수정 후 반영
        // totalPages={data.totalPages}
        totalPages={5}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default function PolicyPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">페이지 로드 중...</div>}>
      <PolicyContent />
    </Suspense>
  );
}
