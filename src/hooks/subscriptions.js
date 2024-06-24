import { useQuery, useMutation } from "@apollo/client";
import { SubscriptionsApi } from "api";

export const useSubscriptions = (variables = {}) => {
  const { data, loading, error, refetch } = useQuery(
    SubscriptionsApi.getAllSubscriptions(),
    {
      variables,
    }
  );
  let subscriptions;

  if (data?.subscriptionList) {
    subscriptions = data.subscriptionList.edges.map((edge) => edge.node);
  }

  return {
    subscriptions,
    subscriptionsLoading: loading,
    subscriptionsError: error,
    refetchSubscriptions: refetch,
  };
};

export const useSubscription = (id) => {
  const { data, loading, error, refetch } = useQuery(
    SubscriptionsApi.getSubscriptionById(),
    {
      variables: { id },
      errorPolicy: "all",
    }
  );

  let subscription;

  if (data?.subscription) {
    subscription = data.subscription;
  }

  return {
    subscription,
    subscriptionLoading: loading,
    subscriptionError: error,
    refetch,
  };
};

export const useSubscriptionsApi = () => {
  const cacheFunc = {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "allSubscriptions" });
    },
  };
};
