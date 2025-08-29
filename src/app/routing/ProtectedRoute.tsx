import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { RouteMapper } from './RouteMapper/RouteMapper';
import { flattenRoutes } from '../utils/GeneralFuncs';
import { useAuth } from '../modules/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const location = useLocation();
  const { currentFrappeRoles } = useAuth();
  const allRoutes = flattenRoutes(RouteMapper);

  const route = allRoutes.find((r) => {
    const pattern = r.path.replace(/:[^/]+/g, '[^/]+');
    const regex = new RegExp(`^${pattern}$`);
    return regex.test(location.pathname);
  });

  if (!route) return <Navigate to="/404" />;

  if (!route.roles || route.roles.length === 0) return <>{children}</>;

  const allowed = route.roles.some((role) => currentFrappeRoles.includes(role));

  return allowed ? <>{children}</> : <Navigate to="/403" replace />;
};
