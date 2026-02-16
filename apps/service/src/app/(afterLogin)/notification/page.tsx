"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import { NotiBox } from "@service/components/NotiBox";

import {
  NotificationItem,
  fetchNotifications,
} from "../../../../../../packages/shared/src/data/notification";

const NOTICE_MESSAGE = "30일이 지난 메세지는 자동 삭제됩니다.";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const observerTarget = useRef<HTMLDivElement>(null);

  const loadData = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const response = await fetchNotifications(page);

      setNotifications((prev) => {
        const existingIds = new Set(prev.map((item) => item.id));
        const newItems = response.data.filter(
          (item) => !existingIds.has(item.id),
        );
        return [...prev, ...newItems];
      });

      setHasMore(response.hasMore);

      if (response.hasMore) {
        setPage((prev) => prev + 1);
      }
      // TODO: API 연결 후 추가 구현 예정
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadData();
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
  }, [loadData, hasMore]);

  return (
    <section className="bg-background-base flex min-h-full w-full flex-col">
      <div className="mt-14 w-full px-4 pb-10">
        <ul className="flex flex-col gap-4">
          {notifications.map((noti) => (
            <li key={noti.id}>
              <NotiBox
                title={noti.title}
                description={noti.description}
                isRead={noti.isRead}
              />
            </li>
          ))}
        </ul>

        {hasMore && (
          <div
            ref={observerTarget}
            className="flex h-10 w-full items-center justify-center py-4"
          >
            {isLoading && (
              <div className="border-t-primary border-base h-6 w-6 animate-spin rounded-full border-2" />
            )}
          </div>
        )}

        {!hasMore && (
          // 알람 리스트의 개수가 많아 화면을 가득 채울 때 바텀의 도달점?을 일단 임의로 정했습니다. mt-8, mb-12
          <p className="text-body2-m text-subtle mt-8 mb-12 text-center">
            {NOTICE_MESSAGE}
          </p>
        )}
      </div>
    </section>
  );
}
