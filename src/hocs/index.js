import React from 'react';
import { Redirect } from 'react-router-dom';

import { TokenStorage } from "services";

export const withAuth = (Component, onlyPublic = false) => {
    return onlyPublic ?
        (props) => TokenStorage.isAuthenticated() ?
            <Redirect to={{ pathname: '/' }} /> :
            <Component {...props} />
        :
        (props) => TokenStorage.isAuthenticated() ?
            <Component {...props} /> :
            <Redirect to={{ pathname: '/auth/login' }} />
}