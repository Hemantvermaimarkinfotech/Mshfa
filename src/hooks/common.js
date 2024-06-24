import { useReactiveVar } from '@apollo/client';
import {useCallback, useRef} from "react";
import state from 'apollo/state';


export const useDialog = () => {
    const { Component, props, options } = useReactiveVar(state.modalVar);
    const close = () => state.modalVar({ Component: null, props: null, options: null });
    const open = (Component, props, options) => state.modalVar({ Component, props, options });
    return { open, close, options, Component, props };
}

export const useNotificationsBar = () => {
    return {
        isOpen: useReactiveVar(state.isNotificationsOpenVar),
        open: () => state.isNotificationsOpenVar(true),
        close: () => state.isNotificationsOpenVar(false)
    };
};

export const useThrottle = (callback, delay) => {

    const isThrottled = useRef(null);

    const throttledCallback = useCallback((...args) => {
        if (isThrottled.current) {
            return
        }
        callback(...args);
        isThrottled.current = true
        setTimeout(() => isThrottled.current = false, delay)
    },[callback, delay])

    return throttledCallback

}
