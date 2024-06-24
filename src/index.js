import "styles/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { ApolloProvider } from "@apollo/client";
import { SnackbarProvider } from "notistack";
import { client } from "apollo";
import { GlobalAuthRouter, GlobalAppRouter } from "routes";
import { datadogRum } from "@datadog/browser-rum";

const snackbarPosition = {
  vertical: "top",
  horizontal: "right",
};

datadogRum.init({
  applicationId: process.env.REACT_APP_DATADOG_APPLICATION_ID,
  clientToken: process.env.REACT_APP_DATADOG_CLIENT_TOKEN,
  site: "datadoghq.com",
  service: process.env.REACT_APP_DATADOG_SERVICE,
  // Specify a version number to identify the deployed version of your application in Datadog
  version: "1.0.0",
  sampleRate: 100,
  sessionReplaySampleRate: 20,
  trackInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
  trackSessionAcrossSubdomains: true,
  useCrossSiteSessionCookie: true,
});

datadogRum.startSessionReplayRecording();

ReactDOM.render(
  <React.Fragment>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={5000}
          hideIconVariant={true}
          anchorOrigin={snackbarPosition}
        >
          {renderRoutes([
            ...GlobalAuthRouter.routes,
            ...GlobalAppRouter.routes,
          ])}
        </SnackbarProvider>
      </BrowserRouter>
    </ApolloProvider>
  </React.Fragment>,
  document.getElementById("root")
);
