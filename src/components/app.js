import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import {
  createTheme as CreateMUITheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import { IntlProvider } from "react-intl";
import { SnackbarProvider } from "notistack";
import cx from "classnames";

import { renderRoutesByRole, resolveHomepageByRole } from "utils/roles";
import { withAuth } from "hocs";
import { useUser } from "hooks/user";
import { useAuth } from "hooks/auth";
import { useDialog } from "hooks/common";
import { useConfig } from "hooks/config";
import {
  GlobalError,
  GlobalLoader,
  Header,
  Footer,
  Dialog,
  Notification,
} from "components/layout";
import { ConfirmationDialog, NotificationWidget } from "components/common";
import AR from "lang/ar.json";
import EN from "lang/en.json";

import state from "apollo/state";

const createTheme = (lang) => {
  const direction = lang === "en" ? "ltr" : "rtl";
  document.body.dir = direction;
  return CreateMUITheme({
    direction,
  });
};

const App = ({ route }) => {
  useConfig();
  const { user, userLoading, userError,permissions } = useUser();
  const { logout } = useAuth();
  const { close, options, Component, props, open } = useDialog();
  const { lang } = useReactiveVar(state.userLang);

  const handleConfirmLogout = () => {
    close();
    logout();
  };

  const handleLogoutClick = () => {
    open(
      ConfirmationDialog,
      {
        text: "Are you sure you want to logout from the app?",
        onConfirm: handleConfirmLogout,
        onCancel: close,
      },
      { title: "Confirm logout" }
    );
  };

  const theme = createTheme(lang);

  if (userLoading) {
    return <GlobalLoader />;
  }

  if (userError) {
    return <GlobalError />;
  }

  const appContentClassNames = cx("app__content", {
    "has-footer": ["doctor", "pharmacist"].indexOf(user.role) !== -1,
  });

  return (
    <IntlProvider locale={lang} messages={lang === "en" ? EN : AR}>
      <ThemeProvider theme={theme}>
        <div className="app">
          {Component && (
            <Dialog onClose={close} {...options}>
              <Component {...props} />
            </Dialog>
          )}
          <SnackbarProvider
            maxSnack={2}
            autoHideDuration={8000}
            hideIconVariant={true}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            content={(key, message) => (
              <Notification id={key} message={message} />
            )}
          >
            <NotificationWidget />
          </SnackbarProvider>
          <Header
            status={
              user.role === "doctor" &&
              user.workModel.key === "2" &&
              user?.workStatus
            }
            avatar={user.avatar}
            role={user.role}
            name={`${user.firstName} ${user.lastName}`}
            onLogout={handleLogoutClick}
          />
          <div className={appContentClassNames}>
            <Switch>
              <Route exact path={"/"}>
                <Redirect to={resolveHomepageByRole(user.role)} />
              </Route>
              {renderRoutesByRole(route.routes, user.role, permissions)}            </Switch>
          </div>
          {user.role == "admin" || user.role == "super admin" ? null : (
            <Footer />
          )}
        </div>
      </ThemeProvider>
    </IntlProvider>
  );
};

export default withAuth(App);
