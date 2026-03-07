'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Table } from '@shared';
import { useGetPolicy } from 'src/api/policy/useGetPolicy';
import Pagination from 'src/components/common/Pagination';
import { formatPolicy } from 'src/utils/formatPolicy';

const PolicyPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 0;

  const { data, isLoading } = useGetPolicy(currentPage);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) return <div>로딩</div>;
  if (!data) return <div>표시할 정책 데이터가 없습니다.</div>;

  const policyRows = formatPolicy({ policies: data });

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

export default PolicyPage;
