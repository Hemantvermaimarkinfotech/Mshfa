import { gql } from '@apollo/client';

class NotificationsAPI {
    getNotifications() {
        return gql`
            query notificationList($read: Boolean, $ordering: String) {
                notificationList(read: $read, ordering: $ordering) {
                    edges {
                        node {
                            read
                            id
                            action {
                                key
                                val
                            }
                            msg
                            type
                            createdAt
                            appointment {
                                id
                                patient {
                                    firstName
                                    lastName
                                    id
                                    uhi
                                    avatar
                                }
                                status {
                                    key
                                    val
                                }
                                start
                            }
                        }
                    }
                }
            }`
    }

    markNotificationAsRead() {
        return gql`
            mutation notificationMarkRead($input: NotificationMarkReadInput!) {
                notificationMarkRead(input: $input) {
                    success
                    errors
                }
            }`
    }

}

export default new NotificationsAPI();