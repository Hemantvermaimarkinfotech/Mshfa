import { adminPaths, adminRoutes } from "./admin.routes";
import { doctorPaths, doctorRoutes } from "./doctor.routes";
import { pharmacistPaths, pharmacistRoutes } from "./pharmacist.routes";
import { authPaths, authRoutes } from "./auth.routes";

import App from "components/app";
import Auth from "components/auth";
import { NotFoundPage, LegalPage, SupportPage } from "components/pages";
import { HealthCheck } from "components/common";

const commonPaths = {
  legal: "/legal",
  publicLegal: "/auth/legal",
  notFound: "*",
};

const NotFoundRoute = {
  path: "*",
  component: NotFoundPage,
  meta: {
    title: "Page not found",
  },
};

const PublicLegalRoute = {
  path: "/auth/legal",
  component: LegalPage,
  meta: null,
};

const PublicSupportRoute = {
  path: "/support",
  component: SupportPage,
  meta: null,
};

const LegalRoute = {
  path: "/legal",
  component: LegalPage,
  meta: null,
};

const HealthCheckRoute = {
  path: "/frontend-health",
  component: HealthCheck,
  meta: null,
};

const GlobalAuthRouter = {
  routes: [
    {
      path: "/auth",
      component: Auth,
      routes: {
        auth: authRoutes,
        common: [PublicLegalRoute, NotFoundRoute], // NotFoundRoute must be last in the list
      },
    },
    {
      ...PublicSupportRoute,
      ...HealthCheckRoute,
    },
  ],
  paths: { ...authPaths, ...commonPaths },
};

const GlobalAppRouter = {
  routes: [
    {
      path: "/",
      component: App,
      routes: {
        admin: adminRoutes,
        doctor: doctorRoutes,
        pharmacist: pharmacistRoutes,
        common: [LegalRoute, PublicSupportRoute, NotFoundRoute], // NotFoundRoute must be last in the list
      },
    },
  ],
  paths: { ...adminPaths, ...doctorPaths, ...pharmacistPaths },
};

export { GlobalAppRouter, GlobalAuthRouter };
