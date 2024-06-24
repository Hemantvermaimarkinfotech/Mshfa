import './index.scss';

import React from 'react';

import { Notification, GlobalLoader } from "components/layout";
import { useNotifications, useNotificationsAPI } from "hooks/notifications";

import noNotifications from 'assets/images/no-notifications.svg';

const NotificationsBar = () => {

    const { notifications, notificationsLoading } = useNotifications({ read: false, ordering: '-created_at' }, { fetchPolicy: 'network-only' });
    const { markAsRead } = useNotificationsAPI();

    const renderEmptyList = () => {
        return (
            <div className={'notifications-bar__empty'}>
                <img src={noNotifications} alt="" className={'notifications-bar__empty-icon'} />
                <h4  className={'notifications-bar__empty-message'}>No Unread Notifications</h4>
            </div>
        )
    }

    const renderCounter = (length) => {
        return <p className={'notifications-bar__counter'}>{length}</p>
    }

    const handleCloseNotification = (item) => {
        markAsRead({ notificationId: item.id })
    }

    return (
        <div className={'notifications-bar'}>
            <div className={'notifications-bar__header'}>
                <div className="notifications-bar__title">Notification</div>
                {notifications?.length ? renderCounter(notifications.length) : null}
            </div>
            {
                notificationsLoading ?
                    <GlobalLoader /> :
                    notifications?.length ?
                        notifications.map(item => <Notification key={item.id} message={item} onClose={handleCloseNotification} />) :
                        renderEmptyList()
            }
        </div>
    )
}

export default NotificationsBar;
