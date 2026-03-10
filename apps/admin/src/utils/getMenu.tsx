import { MENU } from 'src/constants/MENU';

export const getMenu = (pathname: string) => {
  for (const item of MENU) {
    if ('subItems' in item && item.subItems) {
      const matchedSub = item.subItems.find((sub) => sub.path === pathname);
      if (matchedSub) {
        return {
          parentLabel: item.label,
          currentLabel: matchedSub.label,
          description: 'description' in matchedSub ? matchedSub.description : '',
        };
      }
    }

    if (item.path === pathname) {
      return {
        parentLabel: item.label,
        currentLabel: item.label,
        description: 'description' in item ? item.description : '',
      };
    }
  }

  return null;
};
