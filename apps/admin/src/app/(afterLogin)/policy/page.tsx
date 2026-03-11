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

  const { data, isLoading } = useGetPolicy(currentPage - 1);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <div className="p-10 text-center">로딩 중...</div>;
  }

  if (!data || data.policies.length === 0) {
    return <div className="p-10 text-center">표시할 정책이 없습니다.</div>;
  }

  const policyRows = formatPolicy({ policies: data.policies });

  return (
    <div className="mt-6 flex h-screen flex-col">
      <div className="flex-1 overflow-hidden">
        <Table
          headers={['정책', '권한', '기본값', '상태', '관리']}
          rows={policyRows}
          className="rounded-md"
        />
      </div>

      <Pagination currentPage={currentPage} totalPages={5} onPageChange={handlePageChange} />
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
