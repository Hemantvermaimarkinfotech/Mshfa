import { useQuery, useMutation } from "@apollo/client";

import { NotificationAPI } from 'api';

export const useNotifications = (variables, options) => {
    const { data, error, loading } = useQuery(NotificationAPI.getNotifications(), { variables, ...options });

    let notifications;

    if (data?.notificationList) {
        notifications = data?.notificationList.edges.map(edge => edge.node);
    }

    return { notifications, notificationsError: error, notificationsLoading: loading };
}

export const useNotificationsAPI = () => {


    const cacheFunc = {
        update(cache) {
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'notificationList' });
        }
    };

    const [mark] = useMutation(NotificationAPI.markNotificationAsRead(), cacheFunc);

    const markAsRead = (data) => {
        return mark({ variables: { input: data } })
            .then((response) => response.data?.notificationMarkRead)
    }

    return { markAsRead };

}
