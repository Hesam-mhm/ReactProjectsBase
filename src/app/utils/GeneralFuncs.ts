// _____________________________________________________________________________________________________
interface RouteItem {
  path: string;
  title: string;
  roles?: string[];
}

export function flattenRoutes(obj: any): RouteItem[] {
  const result: RouteItem[] = [];

  function recurse(current: any) {
    for (const key in current) {
      if (current[key].path && current[key].title) {
        result.push(current[key]);
      } else {
        recurse(current[key]);
      }
    }
  }

  recurse(obj);
  return result;
}

// _____________________________________________________________________________________________________
export const generateDocumentNumber = (list: any, fieldName: string) => {
  if (!list || list.length === 0) {
    return '1000';
  }

  const currentMax = +list[0]?.[fieldName];
  return (currentMax + 1).toString();
};
