'use client';

import { Suspense, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Table } from '@shared';

import { useGetPolicy } from 'src/api/policy/useGetPolicy';
import Error from 'src/components/common/Error';
import Loading from 'src/components/common/Loading';
import Pagination from 'src/components/common/Pagination';
import { formatPolicy } from 'src/utils/formatPolicy';

const PolicyContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? Number(pageParam) - 1 : 0;
  });

  const { data, isPending } = useGetPolicy(page);

  if (isPending) return <Loading />;

  const handlePageChange = (newPage: number) => {
    setPage(newPage - 1);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!data || !data.policies || data.policies.length === 0) {
    return <Error title="정책이 존재하지 않습니다." />;
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
      <Pagination
        currentPage={page + 1}
        totalPages={data.totalPages || 1}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default function PolicyPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PolicyContent />
    </Suspense>
  );
}
