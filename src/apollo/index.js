import {
  ApolloClient,
  InMemoryCache,
  from,
  fromPromise,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { SubscriptionClient } from "subscriptions-transport-ws";

import { AuthAPI } from "api";
import { TokenStorage } from "services";
import state from "./state";

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (graphQLErrors) {
    const messages = graphQLErrors.map(({ message }) => message);
    console.log("error > ", messages);
    if (
      messages.includes("Signature has expired") ||
      messages.includes("Error decoding signature") ||
      messages.includes("Token has expired") ||
      messages.includes("You do not have permission to perform this action")
    ) {
      return getNewTokenByRefreshToken(TokenStorage.getRefreshToken())
        .filter((value) => Boolean(value))
        .flatMap((newToken) => {
          const oldHeaders = operation.getContext().headers;
          operation.setContext({
            headers: {
              ...oldHeaders,
              authorization: `JWT ${newToken}`,
            },
          });
          console.log('hiiiiiiiiiiiiiiiiiiiiiii')
          return forward(operation);
        });
    }
  }
});

const authLink = setContext((_, { headers }) => {


  return {
    headers: {
      ...headers,
      authorization: TokenStorage.isAuthenticated()
        ? TokenStorage.getAuthenticationHeader()
        : "",
    },
  };
});

const uploadLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_API_ROOT
      : window.REACT_APP_API_ROOT,
  credentials: "include",
});

const wsClient = new SubscriptionClient(
  `${
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_WEBSOCKET_ROOT
      : window.REACT_APP_WEBSOCKET_ROOT
  }`,
  {
    reconnect: true,
    // lazy: true,
    minTimeout: 10000,
    connectionParams: () => ({ token: TokenStorage.getToken() }),
    connectionCallback: (error) => {
      console.log("connectionCallback connection error:", error);
    },
    onError: (error) => {
      console.error("WebSocket subscription error:", error);
    },
  },
  null,
  ["graphql-ws"]
);

const wsLink = new WebSocketLink(wsClient);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  from([errorLink, authLink, uploadLink])
);

const getNewTokenByRefreshToken = (refreshToken) => {
  return fromPromise(
    client
      .mutate({
        mutation: AuthAPI.refreshToken(),
        variables: { refreshToken },
      })
      .then((response) => {
        if (response?.data) {
          console.log('Login successful:', response.data);

          const { token, refreshToken } = response.data.refreshToken;
          if (token && refreshToken) {
            TokenStorage.storeToken(token);
            TokenStorage.storeRefreshToken(refreshToken);
            console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrr')
            return token;
          } else {
            TokenStorage.clear();
            window.location = window.location.origin;
          }
        }
      })
      .catch((error) => {
        if (
          error.message === "Invalid refresh token" ||
          error.message === "Refresh token is expired"
        ) {
          TokenStorage.clear();
          window.location = window.location.origin;
        }
      })
  );
};

export const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isNotificationsOpenVar: {
            read() {
              return state.isNotificationsOpenVar();
            },
          },
          modal: {
            read() {
              return state.modalVar();
            },
          },
          userLang: {
            read() {
              return state.userLang();
            },
          },
        },
      },
    },
    addTypename: true,
  }),
  connectToDevTools: process.env.NODE_ENV === "development",
  link: splitLink,
});
