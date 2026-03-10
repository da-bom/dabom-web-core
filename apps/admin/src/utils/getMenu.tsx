import { MENU } from 'src/constants/MENU';

export const getMenu = (pathname: string) => {
  if (pathname === '/') {
    const homeMenu = MENU.find((item) => (item.path as string) === '/');
    if (!homeMenu) return null;
    return {
      parentLabel: homeMenu.label,
      currentLabel: homeMenu.label,
      description: 'description' in homeMenu ? (homeMenu.description as string) : '',
    };
  }

  for (const item of MENU) {
    if ('subItems' in item && item.subItems) {
      const matchedSub = item.subItems.find((sub) => {
        const subPath = sub.path as string;
        return subPath !== '/' && pathname.startsWith(subPath);
      });

      if (matchedSub) {
        return {
          parentLabel: item.label,
          currentLabel: matchedSub.label,
          description: 'description' in matchedSub ? (matchedSub.description as string) : '',
        };
      }
    }

    const itemPath = item.path as string;
    if (itemPath !== '/' && pathname.startsWith(itemPath)) {
      return {
        parentLabel: item.label,
        currentLabel: item.label,
        description: 'description' in item ? (item.description as string) : '',
      };
    }
  }

  return null;
};
