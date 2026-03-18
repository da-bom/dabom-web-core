'use client';

import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteNotification,
  getNotificationList,
  readAllNotifications,
  readNotification,
} from './index';
import { NotificationFilter } from './schema';

const NOTIFICATION_QUERY_KEY = ['notifications'];

export const useNotificationList = (filter: Omit<NotificationFilter, 'cursor'> = {}) => {
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, refetch } =
    useInfiniteQuery({
      queryKey: [...NOTIFICATION_QUERY_KEY, filter],
      queryFn: ({ pageParam }) =>
        getNotificationList({
          ...filter,
          cursor: pageParam as string | undefined,
        }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => (lastPage?.hasNext ? lastPage.nextCursor : undefined),
    });

  // 알림 목록
  const notifications = data?.pages.flatMap((page) => page?.content ?? []) ?? [];
  const unreadCount = data?.pages[0]?.unreadCount ?? 0;

  // 전체 알림 읽음 처리
  const readAllMutation = useMutation({
    mutationFn: readAllNotifications,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY });
    },
  });

  // 개별 알림 읽음 처리
  const readMutation = useMutation({
    mutationFn: (id: number) => readNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY });
    },
  });

  // 알림 삭제
  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteNotification(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATION_QUERY_KEY });
    },
  });

  return {
    notifications,
    unreadCount,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    fetchNextPage,
    refetch,
    readAll: readAllMutation.mutate,
    readOne: readMutation.mutate,
    deleteOne: deleteMutation.mutate,
  };
};
