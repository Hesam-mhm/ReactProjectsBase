import { FC, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { RouteMapper } from '../../../../../app/routing/RouteMapper/RouteMapper';
import { ArrowLeftIcon } from '../../../../../app/Iconify/ArrowLeftIcon';
import { flattenRoutes } from '../../../../../app/utils/GeneralFuncs';

interface BreadcrumbItem {
  path: string;
  title: string;
}

const COLORS = {
  GREY: {
    400: '#B5B5C3',
    700: '#5E6278',
  },
};

const findRouteByPath = (path: string, routes: typeof RouteMapper): BreadcrumbItem[] => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  let currentPath = '';

  const flatRoutes = flattenRoutes(routes);

  for (const segment of segments) {
    currentPath += `/${segment}`;
    const route = flatRoutes.find((r) => {
      const pattern = r.path.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(currentPath);
    });

    if (route) {
      breadcrumbs.push({
        path: currentPath,
        title: route.title,
      });
    }
  }

  return breadcrumbs;
};

export const Breadcrumb: FC = () => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    return findRouteByPath(location.pathname, RouteMapper);
  }, [location.pathname]);

  if (breadcrumbs.length === 0) return null;

  return (
    <div className="d-flex align-items-center">
      {breadcrumbs.map((item, index) => (
        <div key={item.path} className="d-flex align-items-center">
          {<ArrowLeftIcon style={{ width: 15, height: 15, marginLeft: '8px', color: COLORS.GREY[400] }} />}
          {index === breadcrumbs.length - 1 ? (
            <span
              style={{
                cursor: 'pointer',
                color: COLORS.GREY[700],
              }}
            >
              {item.title}
            </span>
          ) : (
            <Link
              to={item.path}
              style={{
                cursor: 'pointer',
                color: COLORS.GREY[400],
                textDecoration: 'none',
                marginLeft: '8px',
              }}
            >
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};
