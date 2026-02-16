export interface NotificationItem {
  id: number;
  title: string;
  description: string;
  isRead: boolean;
  createdAt: string;
}

const RAW_NOTIFICATIONS: NotificationItem[] = Array.from({ length: 50 }).map(
  (_, index) => ({
    id: index + 1,
    title: index % 3 === 0 ? "데이터 50% 썼음~" : "데이터 80% 썼음!",
    description: "아껴쓰걸아.",
    isRead: index > 4,
    createdAt: new Date(Date.now() - index * 1000 * 60 * 60).toISOString(),
  }),
);

export const fetchNotifications = async (page: number, limit: number = 10) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const start = (page - 1) * limit;
  const end = start + limit;

  const data = RAW_NOTIFICATIONS.slice(start, end);

  return {
    data,
    hasMore: end < RAW_NOTIFICATIONS.length,
    total: RAW_NOTIFICATIONS.length,
  };
};
