'use client';

import { useEffect, useRef } from 'react';

import { useNotificationList } from 'src/api/notification/useNotificationList';
import NotiBox from 'src/components/notification/NotiBox';

const NOTICE_MESSAGE = '30일이 지난 메세지는 자동 삭제됩니다.';

export default function NotificationPage() {
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

  return (
    <section className="bg-background-base flex min-h-screen w-full flex-col">
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
          {notifications.map((noti) => (
            <li key={noti.notificationId} className="w-full">
              <NotiBox
                notificationId={noti.notificationId}
                title={noti.title}
                message={noti.message}
                isRead={noti.isRead}
                onRead={(id) => readOne(id)}
                onDelete={(id) => deleteOne(id)}
              />
            </li>
          ))}
        </ul>

        {hasNextPage && (
          <div ref={observerTarget} className="flex w-full items-center justify-center py-4">
            {(isLoading || isFetchingNextPage) && (
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-600 [animation-delay:-0.3s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-600 [animation-delay:-0.15s]" />
                <div className="h-2 w-2 animate-bounce rounded-full bg-gray-600" />
              </div>
            )}
          </div>
        )}

        {!hasNextPage && notifications.length > 0 && (
          <div className="mt-8 mb-12 flex w-full flex-col items-center gap-1">
            <p className="text-body2-m text-gray-600">{NOTICE_MESSAGE}</p>
          </div>
        )}
      </div>
    </section>
  );
}
