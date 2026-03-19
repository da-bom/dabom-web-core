'use client';

import { useEffect, useMemo, useRef } from 'react';

import { Box, Skeleton } from '@mui/material';

import { useNotificationList } from 'src/api/notification/useNotificationList';
import { useNotificationSSE } from 'src/api/notification/useNotificationSSE';
import NotiBox from 'src/components/notification/NotiBox';

const NOTICE_MESSAGE = '30일이 지난 메세지는 자동 삭제됩니다.';

const NotificationSkeleton = () => (
  <div className="flex w-full flex-col items-start gap-4 p-5">
    <div className="mb-2 flex w-full items-center justify-between">
      <Skeleton variant="text" width="80px" height={24} />
      <Skeleton variant="text" width="100px" height={24} />
    </div>

    <ul className="flex w-full flex-col gap-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <Box
          key={i}
          className="flex h-[88px] w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4"
        >
          <Skeleton variant="text" width="40%" height={24} />
          <Skeleton variant="text" width="90%" height={20} />
        </Box>
      ))}
    </ul>
  </div>
);

export default function NotificationPage() {
  useNotificationSSE(true);

  const {
    notifications,
    unreadCount,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    readAll,
    readOne,
    deleteOne,
  } = useNotificationList();

  const sortedNotifications = useMemo(
    () => [...notifications].sort((a, b) => b.id - a.id),
    [notifications],
  );

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && notifications.length === 0) {
    return (
      <section className="bg-background-base flex h-full min-h-screen w-full flex-col">
        <NotificationSkeleton />
      </section>
    );
  }

  return (
    <section className="bg-background-base flex w-full flex-col">
      <div className="flex flex-col items-start gap-4 p-5">
        <div className="flex w-full items-center justify-between">
          <span className="text-body2-m text-brand-black">새 알림 ({unreadCount})</span>
          <button
            type="button"
            className="text-body2-m text-primary cursor-pointer border-none bg-transparent p-0"
            onClick={() => readAll()}
          >
            모두 읽음으로 표시
          </button>
        </div>

        <ul className="flex w-full flex-col gap-4">
          {sortedNotifications.map((noti, index) => (
            <li
              key={noti.id}
              className="w-full transition-all duration-300"
              style={{
                zIndex: notifications.length - index,
              }}
            >
              <NotiBox
                id={noti.id}
                title={noti.title}
                message={noti.message}
                isRead={noti.isRead}
                onRead={(id) => readOne(id)}
                onDelete={(id) => deleteOne(id)}
              />
            </li>
          ))}
        </ul>

        <div ref={observerTarget} className="flex w-full flex-col gap-4 py-4">
          {isFetchingNextPage && (
            <>
              <Box className="flex h-[88px] w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4 opacity-50">
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="text" width="90%" height={20} />
              </Box>
              <Box className="flex h-[88px] w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-white p-4 opacity-30">
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="text" width="90%" height={20} />
              </Box>
            </>
          )}
        </div>

        {!hasNextPage && notifications.length > 0 && (
          <div className="mt-8 mb-12 flex w-full flex-col items-center gap-1">
            <p className="text-body2-m text-gray-600">{NOTICE_MESSAGE}</p>
          </div>
        )}
      </div>
    </section>
  );
}
