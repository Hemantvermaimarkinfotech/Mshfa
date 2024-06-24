import { renderRoutes } from "react-router-config";

import { GlobalAppRouter, GlobalAuthRouter } from "routes";

export const renderRoutesByRole = (routes, role, permissions) => {
  const isAdmin = role === "super admin" ? "admin" : role;
  const rolesRoutes = role ? routes[isAdmin] : [];

  // 1. Only if admin user
  if (role === "admin") {
    const allowedRoutes = rolesRoutes.filter((route) => {
      // 2. return all routes if admin user even though no permission added 
      if (route.role === "admin") {
        return true;
      }

      return permissions.some((permission) => {
        if (Array.isArray(route.permission)) {
          // 3. Check if any permission codename matches the current route's permission
          return route.permission.some(
            (routePermission) =>
              routePermission.codename === permission.codename
          );
        }
        return (
          // 4. Won't render ads component if didnt have specific permission to view ads
          route.permission === permission.codename ||
          route.permission === "admin" ||
          route.role === "admin" ||
          route.hasOwnProperty("role")
        );
      });
    });
    return renderRoutes([...allowedRoutes, ...routes.common]);
  }

  return renderRoutes([...rolesRoutes, ...routes.common]);
};
export const resolveHomepageByRole = (role) => {

  const { paths } = GlobalAppRouter;
  const { paths: authPaths } = GlobalAuthRouter;
  return role === "admin" || role === "super admin"
    ? paths.doctors
    : role === "doctor"
    ? paths.PharmacistOrderDetailsPage
    : role === "pharmacist"
    ? paths.activeOrders
    : authPaths.login;
};
